import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../Button/Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/70 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-sm border border-blue-100">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary" size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
};
