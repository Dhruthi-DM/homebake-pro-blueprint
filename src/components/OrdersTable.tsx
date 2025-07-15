import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Download, Printer, Eye } from "lucide-react";

interface Order {
  id: string;
  name: string;
  product: string;
  date: string;
  status: "pending" | "preparing" | "done";
  notes: string;
  phone: string;
  flavor: string;
  eggType: string;
}

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load orders from localStorage or API
    const savedOrders = localStorage.getItem("homebake-orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Demo data
      const demoOrders: Order[] = [
        {
          id: "ORD-001",
          name: "Sarah Johnson",
          product: "Chocolate Cake",
          date: "2024-01-20",
          status: "pending",
          notes: "No nuts please",
          phone: "+1234567890",
          flavor: "Chocolate",
          eggType: "Eggless"
        },
        {
          id: "ORD-002",
          name: "Mike Chen",
          product: "Brownies",
          date: "2024-01-21",
          status: "preparing",
          notes: "Extra fudgy",
          phone: "+1234567891",
          flavor: "Chocolate",
          eggType: "With Egg"
        },
        {
          id: "ORD-003",
          name: "Emma Davis",
          product: "Cupcakes",
          date: "2024-01-22",
          status: "done",
          notes: "Vanilla frosting",
          phone: "+1234567892",
          flavor: "Vanilla",
          eggType: "Eggless"
        }
      ];
      setOrders(demoOrders);
      localStorage.setItem("homebake-orders", JSON.stringify(demoOrders));
    }
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: "pending" | "preparing" | "done") => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("homebake-orders", JSON.stringify(updatedOrders));
    
    toast({
      title: "Order updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Order ID", "Name", "Product", "Date", "Status", "Notes", "Phone", "Flavor", "Type"],
      ...orders.map(order => [
        order.id,
        order.name,
        order.product,
        order.date,
        order.status,
        order.notes,
        order.phone,
        order.flavor,
        order.eggType
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `homebake-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: "Orders exported to CSV file",
    });
  };

  const printOrder = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Order ${order.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .order-details { margin: 20px 0; }
              .order-details div { margin: 10px 0; }
              .status { font-weight: bold; text-transform: uppercase; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>HomeBake Order Invoice</h1>
              <h2>Order ${order.id}</h2>
            </div>
            <div class="order-details">
              <div><strong>Customer:</strong> ${order.name}</div>
              <div><strong>Phone:</strong> ${order.phone}</div>
              <div><strong>Product:</strong> ${order.product}</div>
              <div><strong>Flavor:</strong> ${order.flavor}</div>
              <div><strong>Type:</strong> ${order.eggType}</div>
              <div><strong>Date:</strong> ${order.date}</div>
              <div><strong>Status:</strong> <span class="status">${order.status}</span></div>
              <div><strong>Notes:</strong> ${order.notes}</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "preparing": return "bg-blue-100 text-blue-800";
      case "done": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <Button onClick={exportToCSV} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-warm-50/50 transition-colors">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.name}</div>
                    <div className="text-sm text-warm-600">{order.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.product}</div>
                    <div className="text-sm text-warm-600">{order.flavor} • {order.eggType}</div>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value) => updateOrderStatus(order.id, value as any)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => printOrder(order)}
                    >
                      <Printer className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersTable;