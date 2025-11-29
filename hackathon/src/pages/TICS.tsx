import { TrendingUp, Activity, Bot } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const efficiencyData = [
  { time: '00:00', efficiency: 82 },
  { time: '04:00', efficiency: 85 },
  { time: '08:00', efficiency: 88 },
  { time: '12:00', efficiency: 87 },
  { time: '16:00', efficiency: 90 },
  { time: '20:00', efficiency: 86 },
];

const stationData = [
  { station: 'Station A', throughput: 920 },
  { station: 'Station B', throughput: 780 },
  { station: 'Station C', throughput: 850 },
  { station: 'Station D', throughput: 810 },
  { station: 'Station E', throughput: 890 },
];

export default function TICS() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">TICS Efficiency Tracker</h2>
        <p className="text-muted-foreground mt-1">
          Monitor factory efficiency and optimize production workflows
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Efficiency</p>
              <h3 className="text-3xl font-bold text-foreground mt-2">87.5%</h3>
              <p className="text-sm text-status-success mt-1">+3.2% from yesterday</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Stations</p>
              <h3 className="text-3xl font-bold text-foreground mt-2">5 / 5</h3>
              <p className="text-sm text-muted-foreground mt-1">All operational</p>
            </div>
            <div className="p-3 bg-status-success/10 rounded-lg">
              <Activity className="h-8 w-8 text-status-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Throughput</p>
              <h3 className="text-3xl font-bold text-foreground mt-2">4,250</h3>
              <p className="text-sm text-muted-foreground mt-1">Units today</p>
            </div>
            <div className="p-3 bg-chart-3/10 rounded-lg">
              <Activity className="h-8 w-8 text-chart-3" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Efficiency Over Time */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Efficiency Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Station Throughput */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Station Throughput</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="station" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Bar dataKey="throughput" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <Card className="p-6 bg-gradient-to-r from-chart-1/5 to-chart-2/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary rounded-lg">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">AI Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-card rounded-lg">
                <p className="text-sm font-medium text-foreground">🎯 Optimization Opportunity</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Station B throughput is 15% below average. Consider increasing buffer allocation or reviewing maintenance schedule.
                </p>
              </div>
              <div className="p-3 bg-card rounded-lg">
                <p className="text-sm font-medium text-foreground">📊 Efficiency Trend</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Peak efficiency observed between 16:00-20:00. Consider shifting critical operations to this timeframe.
                </p>
              </div>
              <div className="p-3 bg-card rounded-lg">
                <p className="text-sm font-medium text-foreground">⚡ Predictive Alert</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Station D showing early signs of slowdown. Preventive maintenance recommended within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
