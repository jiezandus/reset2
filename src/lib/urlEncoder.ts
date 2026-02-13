// Compact URL-safe encoding for game data
import { Language, getWheelPrizes } from './i18n';

interface GameData {
  sender: string;
  recipient: string;
  reason: string;
  lang?: Language;
  prizes?: string[];
}

// URL-safe base64: replace +/ with -_, strip padding
const toUrlSafe = (b64: string) => b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromUrlSafe = (s: string) => {
  let b = s.replace(/-/g, '+').replace(/_/g, '/');
  while (b.length % 4) b += '=';
  return b;
};

// Delimiter-based format: lang\tsender\trecipient\treason[\tp1\tp2\t...]
// Tab character is unlikely in user input and saves JSON overhead
const SEP = '\t';

export const encodeGameData = (data: GameData): string => {
  const lang = data.lang || 'en';
  const defaults = getWheelPrizes(lang);
  const prizesChanged = data.prizes && JSON.stringify(data.prizes) !== JSON.stringify(defaults);

  const parts = [lang, data.sender, data.recipient, data.reason];
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
    if (parts.length < 4) return null;

    return {
      lang: (parts[0] as Language) || 'en',
      sender: parts[1] || '',
      recipient: parts[2] || '',
      reason: parts[3] || '',
      prizes: parts.length > 4 ? parts.slice(4) : undefined,
    };
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
        prizes: parsed.p,
      };
    } catch {
      return null;
    }
  }
};
