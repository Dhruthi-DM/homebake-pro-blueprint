import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SecretAccess = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  // Secret key combination: Ctrl+Shift+H+B (pressed simultaneously)
  const requiredKeys = new Set(['Control', 'Shift', 'KeyH', 'KeyB']);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKeys(prev => new Set([...prev, event.code]));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(event.code);
        return newKeys;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Check if the required keys are pressed
  useEffect(() => {
    const allRequiredPressed = Array.from(requiredKeys).every(key => 
      pressedKeys.has(key)
    );
    
    if (allRequiredPressed && pressedKeys.size === requiredKeys.size) {
      // Navigate to baker login
      navigate("/baker-login");
      setPressedKeys(new Set()); // Reset
    }
  }, [pressedKeys, navigate]);

  return null; // This component doesn't render anything
};

export default SecretAccess;
