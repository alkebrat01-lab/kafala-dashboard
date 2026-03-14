import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  subtext?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export default function StatCard({
  label,
  value,
  icon,
  subtext,
  variant = 'default'
}: StatCardProps) {
  const variantClasses = {
    default: 'border-border',
    success: 'border-green-200 bg-green-50',
    warning: 'border-yellow-200 bg-yellow-50',
    danger: 'border-red-200 bg-red-50'
  };

  const valueClasses = {
    default: 'text-primary',
    success: 'text-green-700',
    warning: 'text-yellow-700',
    danger: 'text-red-700'
  };

  return (
    <div className={`stat-card ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="stat-label">{label}</p>
          <p className={`stat-value ${valueClasses[variant]} mt-2`}>
            {value.toLocaleString('ar-SA')}
          </p>
          {subtext && (
            <p className="text-xs text-muted-foreground mt-2">{subtext}</p>
          )}
        </div>
        {icon && (
          <div className="text-3xl opacity-20 ml-4">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
