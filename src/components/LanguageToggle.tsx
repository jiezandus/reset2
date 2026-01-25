import { Language } from '@/lib/i18n';

interface LanguageToggleProps {
  language: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle = ({ language, onToggle }: LanguageToggleProps) => {
  return (
    <div className="flex items-center border-2 border-current">
      <button
        onClick={() => onToggle('en')}
        className={`w-8 h-6 flex items-center justify-center text-[9px] font-bold transition-colors ${
          language === 'en' 
            ? 'bit-fg text-[#c8d4a2]' 
            : 'bit-text opacity-60 hover:opacity-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onToggle('zh')}
        className={`w-8 h-6 flex items-center justify-center text-[9px] font-bold transition-colors ${
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
