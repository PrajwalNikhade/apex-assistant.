import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Bot, 
  UserCheck, 
  BellOff, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Layers
} from 'lucide-react';
import { useViewMode } from '../../context/ViewModeContext.jsx';

export default function OnboardingTour({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { setViewMode } = useViewMode();

  if (!isOpen) return null;

  const slides = [
    {
      title: "The Problem We Solve",
      badge: "Vision & Purpose",
      subtitle: "Personal Assistants manage high email volume for executives, but figuring out WHO needs to respond creates constant back-and-forth and missed deadlines.",
      content: (
        <div className="space-y-3 py-2 text-xs text-slate-600 leading-relaxed">
          <p>
            Often, a client reads an email on mobile but doesn't clarify whether they plan to handle it or expect their assistant to reply.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 font-medium">
            💡 <strong>Our Core Innovation:</strong> AI continuously analyzes conversation history, sender intent, and decision stakes to automatically assign reply responsibility.
          </div>
        </div>
      )
    },
    {
      title: "3 Automatic AI Classifications",
      badge: "Core AI Engine",
      subtitle: "Every conversation is classified in real-time with an explainable AI rationale and confidence score.",
      content: (
        <div className="grid grid-cols-1 gap-2.5 py-1 text-xs">
          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
            <div className="flex items-center gap-2 font-bold text-indigo-900 mb-1">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>1. Assistant to Reply</span>
            </div>
            <p className="text-slate-600">Scheduling, dinner reservations, travel logistics, vendor renewal invoices, and routine follow-ups.</p>
          </div>

          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
            <div className="flex items-center gap-2 font-bold text-rose-900 mb-1">
              <UserCheck className="w-4 h-4 text-rose-600" />
              <span>2. Client to Reply</span>
            </div>
            <p className="text-slate-600">Term sheet valuations, VP compensation packages, board audits, and strategic authorizations.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
              <BellOff className="w-4 h-4 text-slate-500" />
              <span>3. No Reply Needed</span>
            </div>
            <p className="text-slate-600">Automated newsletters, payment receipts, system alerts, and closed threads.</p>
          </div>
        </div>
      )
    },
    {
      title: "Dual Connected Experiences",
      badge: "Assistant + Client",
      subtitle: "Two distinct interfaces tailored to the exact workflow of each user.",
      content: (
        <div className="space-y-3 py-2 text-xs text-slate-600">
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <Bot className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-slate-900 mb-0.5">Assistant Command Center (Sarah)</h5>
              <p>Complete dashboard with metrics, search, triage, AI drafts, calendar extraction, and classification overrides.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <UserCheck className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-slate-900 mb-0.5">Minimalist Client View (Alexander)</h5>
              <p>Clean, distraction-free feed showing ONLY items requiring the client's decision, with 1-click delegation back to Sarah.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const current = slides[currentStep];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-elevated border border-slate-200 overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-white">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-white/10 px-2 py-0.5 rounded-full">
                {current.badge}
              </span>
              <h3 className="text-base font-bold text-white mt-1">{current.title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs sm:text-sm font-medium text-slate-800 mb-2">
            {current.subtitle}
          </p>

          {current.content}

          {/* Dots Indicator & Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-4">
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentStep === i ? 'bg-indigo-600 w-6' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {currentStep < slides.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-soft transition-all flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-soft transition-all"
                >
                  Start Exploring Prototype
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
