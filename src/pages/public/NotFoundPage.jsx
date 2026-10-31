import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F7F9FC] text-center">
      <Logo size="lg" to="/" />
      <div className="mt-8 max-w-md space-y-4">
        <span className="text-6xl font-black text-[#16A6A1]">404</span>
        <h1 className="text-2xl font-bold text-[#172B4D]">Page Not Found</h1>
        <p className="text-xs text-[#6B778C] leading-relaxed">
          The coordination route you're looking for doesn't exist or has moved. Return to safety using the options below.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#172B4D] hover:bg-[#213b69] transition-colors"
          >
            <Home className="w-4 h-4 text-[#16A6A1]" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

