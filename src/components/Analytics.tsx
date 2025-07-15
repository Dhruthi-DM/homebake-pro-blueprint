import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Star, Calendar } from "lucide-react";

const Analytics = () => {
  // Mock data - in production, this would come from your backend
  const analytics = {
    thisMonth: {
      orders: 24,
      revenue: 1200,
      avgOrderValue: 50,
      growth: 12.5
    },
    lastMonth: {
      orders: 18,
      revenue: 900,
      avgOrderValue: 45,
      growth: -5.2
    },
    popularItems: [
      { name: "Chocolate Cake", orders: 8, revenue: 400 },
      { name: "Brownies", orders: 6, revenue: 180 },
      { name: "Cupcakes", orders: 5, revenue: 125 },
      { name: "Cookies", orders: 3, revenue: 90 },
      { name: "Birthday Cake", orders: 2, revenue: 200 }
    ],
    recentReviews: [
      { customer: "Sarah Johnson", rating: 5, comment: "Amazing chocolate cake! Will order again." },
      { customer: "Mike Chen", rating: 5, comment: "Best brownies in town!" },
      { customer: "Emma Davis", rating: 4, comment: "Great cupcakes, loved the frosting." }
    ]
  };

  const StatCard = ({ title, value, change, icon: Icon, prefix = "" }: {
    title: string;
    value: number;
    change: number;
    icon: any;
    prefix?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-warm-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-warm-800">{prefix}{value}</div>
        <div className="flex items-center text-xs text-warm-600">
          {change > 0 ? (
            <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
          )}
          <span className={change > 0 ? "text-green-600" : "text-red-600"}>
            {Math.abs(change)}%
          </span>
          <span className="ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={analytics.thisMonth.orders}
          change={analytics.thisMonth.growth}
          icon={ShoppingCart}
        />
        <StatCard
          title="Revenue"
          value={analytics.thisMonth.revenue}
          change={analytics.thisMonth.growth}
          icon={DollarSign}
          prefix="$"
        />
        <StatCard
          title="Avg Order Value"
          value={analytics.thisMonth.avgOrderValue}
          change={analytics.thisMonth.growth}
          icon={TrendingUp}
          prefix="$"
        />
        <StatCard
          title="Growth Rate"
          value={analytics.thisMonth.growth}
          change={analytics.thisMonth.growth}
          icon={Calendar}
          prefix=""
        />
      </div>

      {/* Popular Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Most Popular Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.popularItems.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-warm-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-warm-800">{item.name}</div>
                    <div className="text-sm text-warm-600">{item.orders} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-warm-800">${item.revenue}</div>
                  <div className="text-sm text-warm-600">revenue</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Recent Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.recentReviews.map((review, index) => (
              <div key={index} className="p-4 border border-warm-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-warm-800">{review.customer}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-warm-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-warm-800">This Month</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-warm-600">Orders:</span>
                  <span className="font-medium">{analytics.thisMonth.orders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-600">Revenue:</span>
                  <span className="font-medium">${analytics.thisMonth.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-600">Avg Order:</span>
                  <span className="font-medium">${analytics.thisMonth.avgOrderValue}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-warm-800">Last Month</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-warm-600">Orders:</span>
                  <span className="font-medium">{analytics.lastMonth.orders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-600">Revenue:</span>
                  <span className="font-medium">${analytics.lastMonth.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-600">Avg Order:</span>
                  <span className="font-medium">${analytics.lastMonth.avgOrderValue}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;