import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, BarChart3, Calendar, ClipboardList, Menu as MenuIcon } from "lucide-react";
import OrdersTable from "@/components/OrdersTable";
import CalendarView from "@/components/CalendarView";
import Analytics from "@/components/Analytics";
import MenuManager from "@/components/MenuManager";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    // Enhanced authentication check
    const isAuth = localStorage.getItem("bakerAuth");
    const authTime = localStorage.getItem("bakerAuthTime");
    
    if (!isAuth || !authTime) {
      navigate("/baker-login");
      return;
    }
    
    // Check if session has expired (4 hours)
    const timeDiff = Date.now() - parseInt(authTime);
    if (timeDiff > 4 * 60 * 60 * 1000) {
      localStorage.removeItem("bakerAuth");
      localStorage.removeItem("bakerAuthTime");
      navigate("/baker-login");
      return;
    }
    
    // Update auth timestamp on activity
    localStorage.setItem("bakerAuthTime", Date.now().toString());
  }, [navigate]);

  // Auto-logout after inactivity
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        localStorage.removeItem("bakerAuth");
        localStorage.removeItem("bakerAuthTime");
        navigate("/baker-login");
      }, 2 * 60 * 60 * 1000); // 2 hours inactivity
    };
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });
    
    resetTimer();
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
      clearTimeout(inactivityTimer);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("bakerAuth");
    localStorage.removeItem("bakerAuthTime");
    localStorage.removeItem("loginAttempts");
    localStorage.removeItem("lastAttemptTime");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-warm-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xl">🧁</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-warm-800">HomeBake Dashboard</h1>
                <p className="text-warm-600">Manage your orders and business</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-warm-600 border-warm-300 hover:bg-warm-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <MenuIcon className="w-4 h-4" />
              Menu
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Order Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <MenuManager />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Production Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarView />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Analytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;