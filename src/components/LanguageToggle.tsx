import { Language } from '@/lib/i18n';

interface LanguageToggleProps {
  language: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle = ({ language, onToggle }: LanguageToggleProps) => {
  return (
    <div className="flex items-center gap-1 border-2 border-current">
      <button
        onClick={() => onToggle('en')}
        className={`px-2 py-0.5 text-[9px] font-bold transition-colors ${
          language === 'en' 
            ? 'bit-fg text-[#c8d4a2]' 
            : 'bit-text opacity-60 hover:opacity-100'
        }`}
      >
        EN
      </button>
      <div className="w-[1px] h-3 bg-current opacity-40" />
      <button
        onClick={() => onToggle('zh')}
        className={`px-2 py-0.5 text-[9px] font-bold transition-colors ${
          language === 'zh' 
            ? 'bit-fg text-[#c8d4a2]' 
            : 'bit-text opacity-60 hover:opacity-100'
        }`}
      >
        中
      </button>
    </div>
  );
};

export default LanguageToggle;
