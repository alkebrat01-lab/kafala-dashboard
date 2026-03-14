import { MarketerStats } from '@/lib/mockData';
import { TrendingUp, Target } from 'lucide-react';

interface MarketerCardProps {
  marketer: MarketerStats;
}

export default function MarketerCard({ marketer }: MarketerCardProps) {
  const percentage = Math.min((marketer.collected / marketer.target) * 100, 100);

  return (
    <div className="stat-card hover:shadow-lg transition-all duration-300">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-foreground">{marketer.name}</h3>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {marketer.collected.toLocaleString('ar-SA')} ريال
          </span>
          <span className="text-sm text-muted-foreground">
            من {marketer.target.toLocaleString('ar-SA')} ريال
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {percentage.toFixed(1)}%
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-primary/5 rounded-lg p-3">
          <Target className="w-5 h-5 text-primary" />
          <div>
            <p className="text-lg font-bold text-primary">
              {marketer.projects}
            </p>
            <p className="text-xs text-muted-foreground">مشروع</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-secondary/5 rounded-lg p-3">
          <TrendingUp className="w-5 h-5 text-secondary" />
          <div>
            <p className="text-lg font-bold text-secondary">
              {Math.floor(marketer.collected / 5000)}
            </p>
            <p className="text-xs text-muted-foreground">سهم</p>
          </div>
        </div>
      </div>
    </div>
  );
}
