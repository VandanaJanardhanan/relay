import React from 'react';
import { ArrowUpRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StatCard = ({
  label,
  value,
  icon: Icon,
  description,
  accent = 'default', // 'default', 'success', 'warning', 'primary'
  linkTo,
  badgeText,
}) => {
  const accentStyles = {
    default: {
      card: 'bg-white border-[#E6EAF0]',
      iconBg: 'bg-slate-100 text-[#172B4D]',
      value: 'text-[#172B4D]',
      highlight: '',
    },
    primary: {
      card: 'bg-white border-[#E6EAF0]',
      iconBg: 'bg-teal-50 text-[#16A6A1]',
      value: 'text-[#172B4D]',
      highlight: '',
    },
    success: {
      card: 'bg-white border-[#E6EAF0]',
      iconBg: 'bg-emerald-50 text-[#36B37E]',
      value: 'text-[#172B4D]',
      highlight: '',
    },
    warning: {
      card: 'bg-[#FFFBF5] border-amber-300 ring-1 ring-amber-200/50',
      iconBg: 'bg-amber-100 text-amber-700',
      value: 'text-amber-900',
      highlight: 'border-l-4 border-l-amber-500',
    },
    critical: {
      card: 'bg-[#FFF8F7] border-rose-300 ring-1 ring-rose-200/50',
      iconBg: 'bg-rose-100 text-rose-700',
      value: 'text-rose-900',
      highlight: 'border-l-4 border-l-rose-500',
    },
  };

  const style = accentStyles[accent] || accentStyles.default;

  const content = (
    <div
      className={`relative p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${style.card} ${style.highlight}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-[#6B778C]">{label}</span>
        <div className={`p-2.5 rounded-xl ${style.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-3xl font-extrabold tracking-tight">
          <span className={style.value}>{value}</span>
        </div>
        {badgeText && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            {badgeText}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-[#6B778C] font-normal flex items-center gap-1">
          {accent === 'warning' && value > 0 && (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 inline shrink-0" />
          )}
          {description}
        </p>
      )}

      {linkTo && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#16A6A1] hover:text-[#11817d]">
          <span>View details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="block group">{content}</Link>;
  }

  return content;
};

