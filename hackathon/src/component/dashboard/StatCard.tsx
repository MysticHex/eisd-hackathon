import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({ title, value, change, icon: Icon, trend = 'neutral' }: StatCardProps) {
  const trendColor = {
    up: 'text-status-success',
    down: 'text-status-error',
    neutral: 'text-muted-foreground',
  }[trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
            {change && (
              <p className={`text-sm mt-2 ${trendColor}`}>
                {change}
              </p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
