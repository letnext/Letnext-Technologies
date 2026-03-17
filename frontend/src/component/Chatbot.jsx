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

// ─── Quick suggestion chips shown on first open ──────────────────────────────
const SUGGESTIONS = [
  { label: "🌐 Web Development", msg: "Tell me about web development services" },
  { label: "📱 App Development", msg: "Tell me about app development" },
  { label: "📣 Digital Marketing", msg: "What digital marketing services do you offer?" },
  { label: "💰 Pricing", msg: "What are your pricing plans?" },
  { label: "📞 Contact Us", msg: "How can I contact LetNext Technologies?" },
  { label: "🏢 About Company", msg: "Tell me about LetNext Technologies" },
  { label: "🔧 IoT Solutions", msg: "What IoT solutions do you provide?" },
  { label: "💼 Careers", msg: "Are there any job openings?" },
];

// ─── Comprehensive content-aware response map ────────────────────────────────
const RESPONSE_MAP = [
  {
    keys: ["web development", "web design", "website", "web app", "frontend", "backend", "full stack", "react", "node"],
    response: `🌐 **Web Development at LetNext Technologies**\n\nWe build high-performance, modern websites and web applications:\n\n• **Custom Website Design** — Stunning, responsive UI/UX tailored to your brand\n• **Full Stack Development** — React.js, Node.js, Express, MongoDB\n• **E-Commerce Solutions** — Feature-rich online stores with payment gateways\n• **CMS Development** — WordPress, headless CMS integrations\n• **Web App Development** — SaaS platforms, dashboards, admin panels\n• **SEO-Optimised Build** — Core Web Vitals optimised from the ground up\n\n📞 Ready to start? Contact us at **lnt@letnexttechnologies.com** or WhatsApp **+91 99408 47940**!`
  },
  {
    keys: ["app development", "mobile app", "android", "ios", "flutter", "react native", "mobile"],
    response: `📱 **Mobile App Development at LetNext Technologies**\n\nWe craft powerful mobile experiences for iOS & Android:\n\n• **Cross-Platform Apps** — Flutter & React Native for smooth performance\n• **Native Android & iOS** — High-performance native apps\n• **UI/UX Design** — Beautiful, intuitive interfaces\n• **API Integration** — Seamless backend & third-party integrations\n• **Play Store & App Store** — Complete deployment support\n• **Ongoing Maintenance** — Bug fixes, updates & scaling\n\n📲 Get a free quote — reach us at **lnt@letnexttechnologies.com**!`
  },
  {
    keys: ["digital marketing", "seo", "social media", "ads", "advertising", "meta ads", "google ads", "content marketing", "marketing"],
    response: `📣 **Digital Marketing Services at LetNext Technologies**\n\nWe help businesses grow online with data-driven marketing:\n\n• **SEO Services** — Rank higher on Google with our proven strategies\n• **Meta Ads (Facebook/Instagram)** — Targeted ad campaigns that convert\n• **Google Ads** — PPC campaigns to maximise your ROI\n• **Content Marketing** — Compelling content that drives organic traffic\n• **Social Media Management** — Consistent brand presence across platforms\n• **Lead Generation** — Qualified leads for your business\n• **Local SEO** — Dominate local search in Erode and beyond\n\n📍 Based in Erode, Tamil Nadu — serving businesses globally! Contact: **lnt@letnexttechnologies.com**`
  },
  {
    keys: ["iot", "internet of things", "embedded", "hardware", "automation", "smart"],
    response: `🔧 **IoT Solutions at LetNext Technologies**\n\nWe build smart connected systems for modern businesses:\n\n• **IoT Application Development** — End-to-end IoT platforms\n• **Embedded Systems** — Firmware and hardware integration\n• **Industrial Automation** — Smart factory and process automation\n• **Smart Device Management** — Remote monitoring & control\n• **Custom IoT Dashboards** — Real-time data visualisation\n• **Sensor Integration** — Temperature, motion, GPS & more\n\n🔌 Let's build your smart solution — **lnt@letnexttechnologies.com**`
  },
  {
    keys: ["price", "pricing", "cost", "fees", "budget", "how much", "charges", "rate", "package", "plan"],
    response: `💰 **Pricing at LetNext Technologies**\n\nOur pricing is flexible and project-based:\n\n• **Starter Websites** — From ₹5,000 (basic landing pages)\n• **Business Websites** — ₹15,000–₹50,000 (full-featured sites)\n• **E-Commerce Stores** — ₹25,000–₹1,00,000+\n• **Mobile Apps** — Custom quote based on features\n• **Digital Marketing** — Monthly retainer plans available\n• **IoT Projects** — Custom pricing based on scope\n\n💡 Every project is unique! Contact us for a **free consultation & custom quote**:\n📧 **lnt@letnexttechnologies.com** | 📞 **+91 99408 47940**`
  },
  {
    keys: ["contact", "phone", "email", "address", "reach", "call", "whatsapp", "location", "office", "erode"],
    response: `📞 **Contact LetNext Technologies**\n\n🏢 **LetNext Technologies**\n📍 Erode, Tamil Nadu, India\n\n📧 Email: **lnt@letnexttechnologies.com**\n📞 Phone: **+91 99408 47940**\n💬 WhatsApp: **+91 99408 47940**\n🌐 Website: **letnexttechnologies.com**\n\n⏰ **Working Hours:**\nMon – Sat: 9:00 AM – 6:00 PM IST\n\nOr click the **WhatsApp** button in the corner for instant chat! 🟢`
  },
  {
    keys: ["about", "company", "letnext", "who are you", "what is letnext", "tell me about"],
    response: `🏢 **About LetNext Technologies**\n\nLetNext Technologies is a leading IT company based in **Erode, Tamil Nadu**, delivering innovative digital solutions globally.\n\n🚀 **What We Do:**\n• Web & Mobile App Development\n• Digital Marketing & SEO\n• IoT & Embedded Solutions\n• UI/UX Design\n• IT Consulting\n\n🎯 **Our Mission:** To empower businesses with cutting-edge technology that drives real growth.\n\n📊 **Why Choose Us?**\n• Experienced & passionate team\n• Affordable, transparent pricing\n• On-time delivery guarantee\n• 24/7 post-launch support\n\n🌐 Visit us at **letnexttechnologies.com**`
  },
  {
    keys: ["career", "job", "hiring", "vacancy", "opening", "internship", "apply", "work with", "join"],
    response: `💼 **Careers at LetNext Technologies**\n\nWe're always looking for talented people to join our team!\n\n🔥 **Current Openings:**\n• Full Stack Developers (React + Node)\n• Mobile App Developers (Flutter)\n• Digital Marketing Executives\n• UI/UX Designers\n• IoT Engineers\n\n📝 **How to Apply:**\n1. Visit our **Careers** page on the website\n2. Sign in with your Employee ID (for existing staff)\n3. Or send your resume to: **lnt@letnexttechnologies.com**\n\n📎 You can also **upload your resume** directly in this chat using the attachment button below! 👇`
  },
  {
    keys: ["service", "what do you do", "what do you offer", "offerings", "solutions", "help with"],
    response: `⚙️ **Our Services at LetNext Technologies**\n\nWe offer end-to-end technology solutions:\n\n🌐 **Web Development** — Custom websites & web apps\n📱 **App Development** — iOS & Android mobile apps\n📣 **Digital Marketing** — SEO, Meta Ads, Google Ads\n🔧 **IoT Solutions** — Smart connected systems\n🎨 **UI/UX Design** — Beautiful, user-friendly interfaces\n💡 **IT Consulting** — Strategy & transformation\n\nTap any option above or type to learn more about any specific service! 👆`
  },
  {
    keys: ["support", "help", "issue", "problem", "bug", "fix", "not working"],
    response: `🛠️ **Support & Help**\n\nWe're here to help! Here's how to reach our team:\n\n📧 **Email:** lnt@letnexttechnologies.com\n📞 **Phone:** +91 99408 47940\n💬 **WhatsApp:** +91 99408 47940 (fastest response)\n\n⏰ Support hours: Mon–Sat, 9 AM – 6 PM IST\n\nFor urgent issues, WhatsApp is the quickest way to reach us. We typically respond within **30 minutes** during business hours!`
  },
  {
    keys: ["portfolio", "work", "projects", "clients", "examples", "case study"],
    response: `🎨 **Our Work & Portfolio**\n\nWe've delivered 100+ successful projects across industries:\n\n✅ E-Commerce platforms for retail businesses\n✅ Hospital & clinic management systems\n✅ Real estate listing websites\n✅ Restaurant ordering apps\n✅ Manufacturing IoT dashboards\n✅ Digital marketing campaigns with 5x ROI\n\n📂 Check out our full portfolio on **letnexttechnologies.com**\n\nWant us to build something amazing for you? Let's talk — **lnt@letnexttechnologies.com**! 🚀`
  },
  {
    keys: ["blog", "article", "news", "latest", "update"],
    response: `📰 **LetNext Blog & Updates**\n\nStay up to date with the latest in tech & digital marketing:\n\n• Web development trends & best practices\n• SEO tips to rank higher on Google\n• Digital marketing success stories\n• IoT industry insights\n• Company news & announcements\n\n📖 Visit our **Blogs** section on **letnexttechnologies.com** for the latest articles!\n\nWant to be notified of new posts? Drop us your email at **lnt@letnexttechnologies.com**! 📧`
  },
  {
    keys: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "greetings"],
    response: `👋 **Hello! Welcome to LetNext Technologies!**\n\nI'm your AI assistant, here to help you with:\n\n• Information about our services\n• Pricing & quotes\n• How to get started\n• Contact & support\n• Career opportunities\n• And much more!\n\nWhat can I help you with today? 😊 Feel free to use the quick options below or type your question!`
  },
  {
    keys: ["thank", "thanks", "thank you", "appreciate", "great", "awesome", "perfect"],
    response: `😊 You're welcome! We're always happy to help.\n\nIs there anything else I can assist you with today? Whether it's about our services, pricing, or getting started — I'm here for you! 🚀\n\nOr feel free to reach us directly at **lnt@letnexttechnologies.com** anytime!`
  },
  {
    keys: ["bye", "goodbye", "see you", "later", "ciao", "take care"],
    response: `👋 **Thanks for chatting with us!**\n\nIt was great talking with you. Remember, we're just a message away at:\n\n📧 **lnt@letnexttechnologies.com**\n📞 **+91 99408 47940**\n\nHave a wonderful day! Come back anytime. 😊✨`
  },
];

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

      const botResponse = hasFile ? "Thank you for sharing! I'm sending your file to our team. We'll review it and get back to you shortly." :
        isVoice ? "I received your voice message. Processing it now..." :
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
    
    // Find matching response from the smart maps
    const match = RESPONSE_MAP.find(item => 
      item.keys.some(key => lowerMessage.includes(key))
    );

    return match ? match.response : "I'm still learning! Could you rephrase that or try one of the suggestions? For direct assistance, please reach us at **lnt@letnexttechnologies.com** or call **+91 99408 47940**.";
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
                {SUGGESTIONS.map((item, i) => (
                  <button key={i} className="suggestion-chip" onClick={() => sendMessage(item.msg)}>{item.label}</button>
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