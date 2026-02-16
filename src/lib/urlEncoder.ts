// Compact URL-safe encoding for game data
import { Language, MessageCategory, getWheelPrizes } from './i18n';

interface GameData {
  sender: string;
  recipient: string;
  reason: string;
  lang?: Language;
  category?: MessageCategory;
  prizes?: string[];
}

// URL-safe base64: replace +/ with -_, strip padding
const toUrlSafe = (b64: string) => b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromUrlSafe = (s: string) => {
  let b = s.replace(/-/g, '+').replace(/_/g, '/');
  while (b.length % 4) b += '=';
  return b;
};

// Delimiter-based format: lang\tcategory\tsender\trecipient\treason[\tp1\tp2\t...]
const SEP = '\t';

export const encodeGameData = (data: GameData): string => {
  const lang = data.lang || 'en';
  const category = data.category || 'apology';
  const defaults = getWheelPrizes(lang);
  const prizesChanged = data.prizes && JSON.stringify(data.prizes) !== JSON.stringify(defaults);

  const parts = [lang, category, data.sender, data.recipient, data.reason];
  if (prizesChanged && data.prizes) {
    parts.push(...data.prizes);
  }

  const raw = parts.join(SEP);
  const bytes = new TextEncoder().encode(raw);
  const binary = String.fromCharCode(...bytes);
  return toUrlSafe(btoa(binary));
};

export const decodeGameData = (encoded: string): GameData | null => {
  try {
    const binary = atob(fromUrlSafe(encoded));
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    const raw = new TextDecoder().decode(bytes);
    const parts = raw.split(SEP);
    
    // New format: lang\tcategory\tsender\trecipient\treason[\tprizes...]
    if (parts.length >= 5) {
      const maybeCat = parts[1];
      const validCategories: MessageCategory[] = ['apology', 'missyou', 'love', 'thankyou'];
      if (validCategories.includes(maybeCat as MessageCategory)) {
        return {
          lang: (parts[0] as Language) || 'en',
          category: maybeCat as MessageCategory,
          sender: parts[2] || '',
          recipient: parts[3] || '',
          reason: parts[4] || '',
          prizes: parts.length > 5 ? parts.slice(5) : undefined,
        };
      }
    }

    // Legacy format (no category): lang\tsender\trecipient\treason[\tprizes...]
    if (parts.length >= 4) {
      return {
        lang: (parts[0] as Language) || 'en',
        category: 'apology',
        sender: parts[1] || '',
        recipient: parts[2] || '',
        reason: parts[3] || '',
        prizes: parts.length > 4 ? parts.slice(4) : undefined,
      };
    }

    return null;
  } catch {
    // Fallback: try legacy JSON format
    try {
      const binary = atob(fromUrlSafe(encoded));
      const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
      const json = new TextDecoder().decode(bytes);
      const parsed = JSON.parse(json);
      return {
        sender: parsed.s || '',
        recipient: parsed.r || '',
        reason: parsed.m || '',
        lang: parsed.l || 'en',
        category: 'apology',
        prizes: parsed.p,
      };
    } catch {
      return null;
    }
  }
};
