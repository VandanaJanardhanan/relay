import React, { useEffect } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  type = 'danger', // 'danger' | 'warning' | 'info'
  onConfirm,
  onCancel,
  loading = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: AlertCircle,
      iconColor: 'text-rose-600 bg-rose-50 border-rose-200',
      btnColor: 'bg-rose-600 hover:bg-rose-700 text-white',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    info: {
      icon: CheckCircle,
      iconColor: 'text-[#16A6A1] bg-teal-50 border-teal-200',
      btnColor: 'bg-[#16A6A1] hover:bg-[#11817d] text-white',
    },
  };

  const config = typeConfig[type] || typeConfig.danger;
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white rounded-2xl max-w-md w-full border border-[#E6EAF0] shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-4 mb-5">
          <div className={`p-3 rounded-2xl border shrink-0 ${config.iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#172B4D] mb-1">
              {title}
            </h3>
            <p className="text-xs text-[#6B778C] leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#172B4D] hover:bg-slate-100 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs disabled:opacity-50 ${config.btnColor}`}
          >
            {loading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

