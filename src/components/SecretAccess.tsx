import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SecretAccess = () => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const navigate = useNavigate();

  // Secret key sequence: Ctrl+Shift+B+A+K+E+R
  const secretSequence = ['Control', 'Shift', 'KeyB', 'KeyA', 'KeyK', 'KeyE', 'KeyR'];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.code;
      
      // Check if it's part of our secret sequence
      if (secretSequence.includes(key)) {
        setKeySequence(prev => {
          const newSequence = [...prev, key];
          
          // Check if we have the correct sequence
          const sequenceMatch = secretSequence.every((seqKey, index) => 
            newSequence[index] === seqKey
          );
          
          if (newSequence.length === secretSequence.length && sequenceMatch) {
            // Navigate to baker login
            navigate("/baker-login");
            return [];
          }
          
          // Keep only last 7 keys
          return newSequence.slice(-7);
        });
      } else {
        // Reset sequence if wrong key
        setKeySequence([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default SecretAccess;
