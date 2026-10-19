import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { GearItem } from '../types/gear';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  gears: GearItem[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  gears,
}) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'markdown' | 'plain'>('markdown');

  if (!isOpen) return null;

  const generateMarkdown = () => {
    const categories = Array.from(new Set(gears.map((g) => g.category)));
    let md = `# My Curated Gear & Workspace Kit (2026)\n\n`;
    md += `*Generated from the Gear Archive Showcase*\n\n`;

    categories.forEach((cat) => {
      md += `## ${cat}\n\n`;
      const itemsInCat = gears.filter((g) => g.category === cat);
      itemsInCat.forEach((item) => {
        md += `- **[${item.name}](${item.externalUrl || '#'})** by ${item.brand} — ₹${item.priceUSD.toLocaleString('en-IN')} (${item.yearsInUse}y in use)\n`;
        md += `  > ${item.tagline}\n`;
      });
      md += `\n`;
    });

    return md;
  };

  const generatePlain = () => {
    let text = `MY CURATED GEAR & WORKSPACE SETUP\n=================================\n\n`;
    gears.forEach((item) => {
      text += `• ${item.name} (${item.brand}) [${item.category}]\n`;
      text += `  MSRP: ₹${item.priceUSD.toLocaleString('en-IN')} | In use: ${item.yearsInUse} yrs\n`;
      text += `  ${item.tagline}\n\n`;
    });
    return text;
  };

  const exportText = format === 'markdown' ? generateMarkdown() : generatePlain();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = format === 'markdown' ? 'my-gears.md' : 'my-gears.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-zinc-200/80 flex items-center justify-between bg-white shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900">
              Export Gear List
            </h2>
            <p className="text-xs text-zinc-500">
              Formatted markdown or plain text ready to paste into GitHub, YouTube, or your blog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-6 pt-4 flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-600">Format:</span>
          <div className="flex p-0.5 bg-zinc-100 rounded-lg">
            <button
              onClick={() => setFormat('markdown')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                format === 'markdown'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Markdown (.md)
            </button>
            <button
              onClick={() => setFormat('plain')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                format === 'plain'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Plain Text
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="p-4 sm:p-6 flex-1 overflow-hidden flex flex-col">
          <div className="relative flex-1 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
            <pre className="p-4 text-xs font-mono text-zinc-200 overflow-y-auto h-72 sm:h-80 whitespace-pre-wrap selection:bg-zinc-700">
              {exportText}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 bg-zinc-50 border-t border-zinc-200/80 flex items-center justify-between shrink-0">
          <span className="text-xs text-zinc-500">
            {gears.length} items formatted
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
