import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { 
  IoClose, 
  IoSend, 
  IoMic, 
  IoStop, 
  IoAttach, 
  IoDocument, 
  IoLockClosed 
} from "react-icons/io5";
import "../styles/chatbot.css";

const BASE_URL=import.meta.env.VITE_BASE_URL;

const API_URL = `${BASE_URL}/api/chatbot`;
const SESSION_ID = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const WHATSAPP_NUMBER = "919940847940";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recognizedText, setRecognizedText] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const robotCanvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const robotRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationIdRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  const suggestions = [
    "Tell me about your services",
    "I need help with pricing",
    "How do I get started?",
    "Contact support"
  ];

  const botResponses = {
    services: "We offer a wide range of services including consulting, development, and support. What specific area interests you?",
    pricing: "Our pricing is flexible and tailored to your needs. Would you like to schedule a call to discuss your requirements?",
    started: "Getting started is easy! Just let me know what you're looking to achieve, and I'll guide you through the process.",
    support: "You can reach our support team at lnt@letnexttechnologies.com or call us at 9940847940. We're here 24/7!",
    default: "That's a great question! Let me connect you with someone who can help with that specific inquiry.",
    resume: "Thank you for sharing your resume! I'm sending it to our HR team via WhatsApp. They will review it and get back to you shortly.",
    voice: "I received your voice message. Processing it now..."
  };

  /* ---------------- SPEECH RECOGNITION SETUP ---------------- */
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + ' ';
          }
        }
        if (transcript) {
          setRecognizedText(prev => prev + transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  /* ---------------- LOAD CHAT HISTORY ---------------- */
  useEffect(() => {
    fetch(`${API_URL}/history/${SESSION_ID}`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          setMessages([
            {
              from: "bot",
              text: "Hey there! 👋 I'm here to help. What's on your mind?",
              timestamp: new Date(),
            },
          ]);
        } else {
          setMessages(
            data.map(m => ({
              from: m.from,
              text: m.text,
              timestamp: new Date(m.createdAt),
            }))
          );
          setShowSuggestions(false);
        }
      })
      .catch(err => {
        console.error("Failed to fetch history:", err);
        setMessages([
          {
            from: "bot",
            text: "Hey there! 👋 I'm here to help. What's on your mind?",
            timestamp: new Date(),
          },
        ]);
      });
  }, []);

  /* ---------------- SEND RESUME TO WHATSAPP ---------------- */
  const sendResumeToWhatsApp = useCallback((fileName) => {
    const message = `New Resume Submission from Chatbot:\n\nFile Name: ${fileName}\nTimestamp: ${new Date().toLocaleString()}\n\nPlease check the chatbot admin panel for the full resume file.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }, []);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async (messageText = input, isVoice = false, voiceBlob = null, transcribedText = "") => {
    const textToSend = transcribedText || messageText.trim();
    const hasFile = attachedFile !== null;

    if (!textToSend && !hasFile && !isVoice) return;

    const displayText = transcribedText || (isVoice ? "🎤 Voice message" : (textToSend || (hasFile ? `📎 ${attachedFile.name}` : "")));
    const userMsg = {
      from: "user",
      text: displayText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setRecognizedText("");

    const fileName = hasFile ? attachedFile.name : null;

    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowSuggestions(false);
    setIsTyping(true);

    try {
      if (hasFile && fileName) {
        sendResumeToWhatsApp(fileName);
      }

      const formData = new FormData();
      formData.append('text', textToSend);
      formData.append('isVoice', isVoice.toString());
      formData.append('sessionId', SESSION_ID);
      if (fileName) formData.append('fileName', fileName);
      if (voiceBlob) formData.append('voiceFile', voiceBlob, 'voice-message.wav');

      const res = await fetch(`${API_URL}/send`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      let botText = "";

      if (data.reply) {
        botText = data.reply;
      } else if (data.response) {
        botText = data.response;
      } else if (data.messages && Array.isArray(data.messages)) {
        const botMessage = data.messages.find(m => m.from === 'bot');
        if (botMessage) {
          botText = botMessage.text;
        }
      }

      if (!botText) {
        botText = getBotResponse(textToSend);
      }

      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: botText,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Error sending message:", err);

      const botResponse = hasFile ? botResponses.resume :
        isVoice ? botResponses.voice :
          getBotResponse(textToSend);

      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: botResponse,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  /* ---------------- GET BOT RESPONSE ---------------- */
  const getBotResponse = useCallback((userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("service") || lowerMessage.includes("what do you do")) {
      return botResponses.services;
    } else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
      return botResponses.pricing;
    } else if (lowerMessage.includes("start") || lowerMessage.includes("begin")) {
      return botResponses.started;
    } else if (lowerMessage.includes("support") || lowerMessage.includes("help") || lowerMessage.includes("contact")) {
      return botResponses.support;
    } else {
      return botResponses.default;
    }
  }, []);

  /* ---------------- VOICE RECORDING ---------------- */
  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.log('Recognition already started');
        }
      }

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = e => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const transcribed = recognizedText.trim();

        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {
            console.log('Recognition already stopped');
          }
        }

        cleanupRecording();

        if (audioChunksRef.current.length > 0) {
          sendMessage("", true, audioBlob, transcribed);
        }
      };

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const audioContext = audioContextRef.current;
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 256;

      microphone.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateAudioLevel = () => {
        if (!analyserRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average / 255);
        animationIdRef.current = requestAnimationFrame(updateAudioLevel);
      };

      updateAudioLevel();
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert("Microphone access denied. Please check permissions.");
      cleanupRecording();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      cleanupRecording();
      setIsRecording(false);
    }
  };

  const cleanupRecording = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    analyserRef.current = null;
    setAudioLevel(0);
  };

  useEffect(() => {
    return () => {
      cleanupRecording();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) { }
      }
    };
  }, []);

  /* ---------------- FILE HANDLER ---------------- */
  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        setAttachedFile(file);
      } else {
        alert('Please upload a PDF or DOC file');
      }
    }
  }, []);

  const removeAttachment = useCallback(() => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  /* ---------------- THREE.JS ROBOT ---------------- */
  useEffect(() => {
    if (!robotCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      canvas: robotCanvasRef.current,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(100, 100);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const robotGroup = new THREE.Group();
    robotRef.current = robotGroup;

    const bodyGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x00d9c5,
      shininess: 100,
      emissive: 0x00d9c5,
      emissiveIntensity: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robotGroup.add(body);

    const eyeGeometry = new THREE.CircleGeometry(0.15, 32);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 0.15, 0.8);
    robotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 0.15, 0.8);
    robotGroup.add(rightEye);

    const pupilGeometry = new THREE.CircleGeometry(0.07, 32);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x00d9c5, side: THREE.DoubleSide });

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.25, 0.15, 0.81);
    robotGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.25, 0.15, 0.81);
    robotGroup.add(rightPupil);

    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.2, -0.1, 0.8),
      new THREE.Vector3(0, -0.25, 0.8),
      new THREE.Vector3(0.2, -0.1, 0.8)
    );
    const smileGeometry = new THREE.TubeGeometry(smileCurve, 20, 0.03, 8, false);
    const smile = new THREE.Mesh(smileGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    robotGroup.add(smile);

    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8),
      new THREE.MeshPhongMaterial({ color: 0x00d9c5 })
    );
    antenna.position.y = 1.05;
    robotGroup.add(antenna);

    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x00ff00, emissiveIntensity: 0.5 })
    );
    ball.position.y = 1.35;
    robotGroup.add(ball);

    scene.add(robotGroup);

    let time = 0;
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;
      robotGroup.position.y = Math.sin(time * 2) * 0.1;
      robotGroup.rotation.y = Math.sin(time) * 0.1;
      ball.material.emissiveIntensity = 0.3 + Math.sin(time * 3) * 0.2;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }, []);

  const handleToggleChat = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <>
      <div className="chatbot-wrapper">
        <button 
          className={`chatbot-btn-3d ${open ? 'open' : ''}`} 
          onClick={handleToggleChat}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          <canvas ref={robotCanvasRef} className="robot-canvas" />
          {open && (
            <div className="close-overlay">
              <IoClose size={28} />
            </div>
          )}
        </button>
        {!open && <span className="notification-badge">1</span>}
      </div>

      <div className={`chatbot-box ${open ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="header-content">
            <div className="avatar">
              <canvas ref={(ref) => {
                if (ref && !ref.dataset.initialized) {
                  ref.dataset.initialized = 'true';
                  const miniScene = new THREE.Scene();
                  const miniCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
                  miniCamera.position.z = 3;
                  const miniRenderer = new THREE.WebGLRenderer({ canvas: ref, alpha: true, antialias: false });
                  miniRenderer.setSize(38, 38);
                  const miniBody = new THREE.Mesh(
                    new THREE.SphereGeometry(0.6, 32, 32),
                    new THREE.MeshPhongMaterial({ color: 0x00d9c5, emissive: 0x00d9c5, emissiveIntensity: 0.3 })
                  );
                  const miniLight = new THREE.AmbientLight(0xffffff, 1);
                  miniScene.add(miniLight, miniBody);
                  const miniAnimate = () => {
                    requestAnimationFrame(miniAnimate);
                    miniBody.rotation.y += 0.02;
                    miniRenderer.render(miniScene, miniCamera);
                  };
                  miniAnimate();
                }
              }} className="avatar-canvas" />
              <span className="status-indicator"></span>
            </div>
            <div className="header-text">
              <h3>LetNext Technologies AI</h3>
              <p className="status-text">Online • Ready to help</p>
            </div>
          </div>
          <button className="close-btn" onClick={handleToggleChat} aria-label="Close chat">
            <IoClose size={20} />
          </button>
        </div>

        <div className="chatbot-body">
          {messages.map((msg, i) => (
            <div key={i} className={`message-wrapper ${msg.from}`}>
              {msg.from === 'bot' && (
                <div className="message-avatar">
                  <div className="avatar-small">🤖</div>
                </div>
              )}
              <div className="message-content">
                <div className={`msg ${msg.from}`}>{msg.text}</div>
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-wrapper bot">
              <div className="message-avatar">
                <div className="avatar-small">🤖</div>
              </div>
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          {showSuggestions && messages.length === 1 && (
            <div className="suggestions">
              <p className="suggestions-title">Quick suggestions:</p>
              <div className="suggestions-grid">
                {suggestions.map((s, i) => (
                  <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-footer">
          {attachedFile && (
            <div className="attachment-preview">
              <div className="attachment-info">
                <IoDocument size={18} />
                <span className="attachment-name">{attachedFile.name}</span>
              </div>
              <button className="remove-attachment" onClick={removeAttachment} aria-label="Remove attachment">
                <IoClose size={16} />
              </button>
            </div>
          )}

          {isRecording && (
            <div className="recording-indicator">
              <div className="waveform">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="wave-bar"
                    style={{
                      height: `${20 + audioLevel * 60 * (1 + Math.sin(Date.now() / 100 + i) * 0.5)}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
              <div className="recording-text-container">
                <span className="recording-text">{recognizedText || "Listening... Speak now"}</span>
              </div>
            </div>
          )}

          <div className="input-container">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <button 
              className="attach-btn" 
              onClick={() => fileInputRef.current?.click()}
              aria-label="Attach file"
            >
              <IoAttach size={20} />
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button 
              className={`voice-btn ${isRecording ? 'recording' : ''}`} 
              onClick={toggleRecording}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? <IoStop size={20} /> : <IoMic size={20} />}
            </button>

            <button 
              className="send-btn" 
              onClick={() => sendMessage()} 
              disabled={!input.trim() && !attachedFile}
              aria-label="Send message"
            >
              <IoSend size={18} />
            </button>
          </div>
          <div className="footer-info">
            <span className="encryption-badge">
              <IoLockClosed size={12} />
              Encrypted
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;