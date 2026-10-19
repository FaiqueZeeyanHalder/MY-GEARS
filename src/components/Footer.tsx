import React from 'react';
import { RotateCcw, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onResetDefaults: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetDefaults }) => {
  return (
    <footer className="mt-20 border-t border-zinc-200/80 bg-white text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900 tracking-tight">GEAR·ARCHIVE</span>
            <span aria-hidden="true">·</span>
            <span>Hand-curated hardware and workspace collection</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => {
                if (window.confirm('Reset all gear items back to the original default collection?')) {
                  onResetDefaults();
                }
              }}
              className="text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-2"
              title="Restore initial items"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Default Gear</span>
            </button>
            <span aria-hidden="true" className="text-zinc-300">|</span>
            <span>All gears self-purchased and tested</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} Studio Archive. Built with clean light aesthetics.</p>
          <p className="flex items-center gap-1">
            Zero sponsored insertions <span aria-hidden="true">·</span> Independent daily driver review
          </p>
        </div>
      </div>
    </footer>
  );
};
