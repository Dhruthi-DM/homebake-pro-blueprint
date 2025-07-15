import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ChefHat, Lock, Shield, Eye, EyeOff } from "lucide-react";

const BakerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already authenticated
  useEffect(() => {
    const isAuth = localStorage.getItem("bakerAuth");
    const authTime = localStorage.getItem("bakerAuthTime");
    
    if (isAuth && authTime) {
      const timeDiff = Date.now() - parseInt(authTime);
      // Session expires after 4 hours
      if (timeDiff < 4 * 60 * 60 * 1000) {
        navigate("/dashboard");
      } else {
        localStorage.removeItem("bakerAuth");
        localStorage.removeItem("bakerAuthTime");
      }
    }
  }, [navigate]);

  // Handle attempt blocking
  useEffect(() => {
    const attempts = localStorage.getItem("loginAttempts");
    const lastAttempt = localStorage.getItem("lastAttemptTime");
    
    if (attempts && lastAttempt) {
      const attemptsCount = parseInt(attempts);
      const lastAttemptTime = parseInt(lastAttempt);
      const timeDiff = Date.now() - lastAttemptTime;
      
      if (attemptsCount >= 3 && timeDiff < 15 * 60 * 1000) { // 15 minutes block
        setIsBlocked(true);
        setTimeLeft(Math.ceil((15 * 60 * 1000 - timeDiff) / 1000));
        
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              setIsBlocked(false);
              localStorage.removeItem("loginAttempts");
              localStorage.removeItem("lastAttemptTime");
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }
  }, []);

  const recordFailedAttempt = () => {
    const attempts = localStorage.getItem("loginAttempts");
    const newAttempts = attempts ? parseInt(attempts) + 1 : 1;
    
    localStorage.setItem("loginAttempts", newAttempts.toString());
    localStorage.setItem("lastAttemptTime", Date.now().toString());
    setAttemptCount(newAttempts);
    
    if (newAttempts >= 3) {
      setIsBlocked(true);
      setTimeLeft(15 * 60); // 15 minutes
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      toast({
        title: "Account temporarily blocked",
        description: `Please wait ${Math.ceil(timeLeft / 60)} minutes before trying again.`,
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    // Enhanced security validation
    const validCredentials = 
      email === "baker@homebake.com" && 
      password === "SecureBaker2024!" &&
      accessCode === "HOMEBAKE2024";

    if (validCredentials) {
      // Clear any previous failed attempts
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("lastAttemptTime");
      
      // Set authentication with timestamp
      localStorage.setItem("bakerAuth", "true");
      localStorage.setItem("bakerAuthTime", Date.now().toString());
      
      toast({
        title: "Login successful!",
        description: "Welcome back to your dashboard.",
      });
      navigate("/dashboard");
    } else {
      recordFailedAttempt();
      
      toast({
        title: "Invalid credentials",
        description: `Please check all fields. ${3 - attemptCount} attempts remaining.`,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-warm-800">
            Secure Baker Access
          </CardTitle>
          <p className="text-warm-600">Authorized personnel only</p>
          {isBlocked && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">
                Account blocked for {formatTime(timeLeft)}
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter authorized email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isBlocked}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isBlocked}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-600 hover:text-warm-800"
                  disabled={isBlocked}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessCode">Access Code</Label>
              <Input
                id="accessCode"
                type="text"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                required
                disabled={isBlocked}
                className="w-full font-mono tracking-wider"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || isBlocked}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Secure Login
                </>
              )}
            </Button>
          </form>
          
          {attemptCount > 0 && !isBlocked && (
            <div className="mt-4 text-center text-sm text-orange-600">
              {attemptCount} failed attempt{attemptCount > 1 ? 's' : ''}. 
              {3 - attemptCount} remaining before temporary block.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BakerLogin;