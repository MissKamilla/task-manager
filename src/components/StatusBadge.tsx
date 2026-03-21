import '@/styles/StatusBadge.css';
import type { Status } from '@/types/entities';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const badgeClassName = `status-badge status-badge--${status}`;
  return <span className={badgeClassName}>{status}</span>;
}
