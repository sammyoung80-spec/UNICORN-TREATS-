import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Lock, KeyRound, X, Sparkles, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAdmin();
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(accessCode);
    if (success) {
      setError(false);
      setAccessCode('');
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c0d08] via-[#120704] to-[#070302] border-2 border-[#F4C95D]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#FFF4DE]/60 hover:text-white hover:bg-black/30 transition-colors"
          aria-label="Close admin modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F45AA8]/20 to-[#F4C95D]/20 border border-[#F4C95D]/40 flex items-center justify-center mx-auto mb-4 text-[#F4C95D] shadow-lg">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-center text-[#FFF4DE]">
          Admin & Editor Access
        </h3>
        <p className="text-xs text-center text-[#FF9ACB] mt-1 font-script text-base">
          WordPress & Elementor-style customization backend
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#FFF4DE]/70 mb-2">
              Enter Access Code
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Access code..."
                autoFocus
                className="w-full px-4 py-3 pl-10 rounded-xl bg-black/60 border border-[#F4C95D]/40 text-[#FFF4DE] text-sm placeholder:text-[#FFF4DE]/30 focus:outline-none focus:border-[#F45AA8] transition-colors"
              />
              <KeyRound className="w-4 h-4 text-[#F4C95D] absolute left-3.5 top-3.5" />
            </div>
            {error && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Invalid access code. Please try again.
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#F45AA8] via-[#FF9ACB] to-[#F45AA8] text-white shadow-[0_4px_20px_rgba(244,90,168,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Unlock Admin Editor</span>
            </button>
          </div>
        </form>

        <p className="mt-5 text-[11px] text-center text-[#FFF4DE]/40">
          Admin code required to edit frontend, resize assets & view customer messages.
        </p>
      </div>
    </div>
  );
};
