// import React, { useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
// import "../styles/whatspp.css";

// const Whatapp = () => {
//   const [isChatbotOpen, setIsChatbotOpen] = useState(false);

//   const toggleChatbot = () => {
//     setIsChatbotOpen(!isChatbotOpen);
//   };

//   const openWhatsApp = () => {
//     window.open("https://wa.me/919043327940", "_blank");
//   };

//   return (
//     <>
//       {/* Chatbot Button */}
//       <div className="chatbot-container" onClick={toggleChatbot}>
        
//       </div>

//       {/* Show WhatsApp button only when chatbot is NOT open */}
//       {!isChatbotOpen && (
//         <div className="whatapp-container" onClick={openWhatsApp}>
//           <FaWhatsapp className="whatapp-icon" />
//         </div>
//       )}
//     </>
//   );
// };

// export default Whatapp;