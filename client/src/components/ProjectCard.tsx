import { Project } from '@/lib/mockData';
import { Users, TrendingUp } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const percentage = Math.min((project.collected / project.target) * 100, 100);
  
  const statusBadge = {
    complete: { bg: 'bg-green-100', text: 'text-green-800', label: 'مكتمل' },
    partial: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'جزئي' },
    zero: { bg: 'bg-red-100', text: 'text-red-800', label: 'لم يتم جمع شيء' }
  };

  const status = statusBadge[project.status];

  return (
    <div className="stat-card hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground">{project.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{project.marketer}</p>
        </div>
        <span className={`${status.bg} ${status.text} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4`}>
          {status.label}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {project.collected.toLocaleString('ar-SA')} ريال
          </span>
          <span className="text-sm text-muted-foreground">
            من {project.target.toLocaleString('ar-SA')} ريال
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
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {project.donors}
          </p>
          <p className="text-xs text-muted-foreground mt-1">متبرع</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary">
            {project.transactions}
          </p>
          <p className="text-xs text-muted-foreground mt-1">عملية</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">
            {Math.floor(project.collected / 9600)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">حلقة</p>
        </div>
      </div>
    </div>
  );
}
