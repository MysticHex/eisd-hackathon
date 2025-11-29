import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType = 'pending' | 'processed' | 'verified' | 'matched' | 'mismatch' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-status-pending/10 text-status-pending border-status-pending/20',
  },
  processed: {
    label: 'Processed',
    className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  verified: {
    label: 'Verified',
    className: 'bg-status-success/10 text-status-success border-status-success/20',
  },
  matched: {
    label: 'Matched',
    className: 'bg-status-success/10 text-status-success border-status-success/20',
  },
  mismatch: {
    label: 'Mismatch',
    className: 'bg-status-error/10 text-status-error border-status-error/20',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-status-error/10 text-status-error border-status-error/20',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge
      variant="outline"
      className={cn('font-medium', config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
