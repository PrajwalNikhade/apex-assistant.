import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useEmail } from '../../context/EmailContext.jsx';

export default function Toast() {
  const { toast } = useEmail();

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-elevated border backdrop-blur-md ${
        isError 
          ? 'bg-rose-900/90 text-white border-rose-700' 
          : isInfo 
            ? 'bg-slate-900/90 text-white border-slate-700'
            : 'bg-emerald-900/95 text-white border-emerald-700'
      }`}>
        {isError && <AlertCircle className="w-5 h-5 text-rose-300 flex-shrink-0" />}
        {isInfo && <Info className="w-5 h-5 text-sky-300 flex-shrink-0" />}
        {!isError && !isInfo && <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />}

        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
}
