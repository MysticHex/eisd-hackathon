import { FileText, TrendingUp, Package, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge-status';

export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Monitor all digital industry operations in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Documents Processed"
          value="1,284"
          change="+12% from last month"
          icon={FileText}
          trend="up"
        />
        <StatCard
          title="Average Efficiency"
          value="87.5%"
          change="+3.2% from last week"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Active Shipments"
          value="342"
          change="18 pending verification"
          icon={Package}
          trend="neutral"
        />
        <StatCard
          title="Anomalies Detected"
          value="7"
          change="Requires attention"
          icon={AlertCircle}
          trend="down"
        />
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Uploads */}
        <Card className="p-4 md:p-6 lg:col-span-2">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Recent Document Uploads</h3>
          <div className="space-y-3">
            {[
              { id: 'DOC-2401', name: 'Invoice_Q4_2024.pdf', status: 'verified' as const, time: '2 hours ago' },
              { id: 'DOC-2402', name: 'PO_12345.pdf', status: 'processed' as const, time: '3 hours ago' },
              { id: 'DOC-2403', name: 'Delivery_Note_789.pdf', status: 'pending' as const, time: '5 hours ago' },
            ].map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.id} • {doc.time}</p>
                  </div>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Plant Efficiency */}
        <Card className="p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Current Plant Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Overall Efficiency</span>
                <span className="font-semibold text-foreground">87.5%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-status-success" style={{ width: '87.5%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Station A</span>
                <span className="font-semibold text-foreground">92%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-status-success" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Station B</span>
                <span className="font-semibold text-foreground">78%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-status-warning" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Pending Anomalies */}
        <Card className="p-4 md:p-6 lg:col-span-2">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Pending Anomalies</h3>
          <div className="space-y-3">
            {[
              { id: 'AN-001', desc: 'Batch mismatch in shipment #3421', severity: 'mismatch' as const },
              { id: 'AN-002', desc: 'Supplier verification required for PO #8765', severity: 'pending' as const },
              { id: 'AN-003', desc: 'Quality check failed for batch #2234', severity: 'rejected' as const },
            ].map((anomaly) => (
              <div
                key={anomaly.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-status-error" />
                  <div>
                    <p className="font-medium text-foreground">{anomaly.desc}</p>
                    <p className="text-xs text-muted-foreground">{anomaly.id}</p>
                  </div>
                </div>
                <StatusBadge status={anomaly.severity} />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Upload Document
            </button>
            <button className="w-full p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
              View All Shipments
            </button>
            <button className="w-full p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
              Check Efficiency
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
