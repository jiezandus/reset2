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

export const encodeGameData = (data: GameData): string => {
  const lang = data.lang || 'en';
  const defaults = getWheelPrizes(lang);
  // Only include prizes if they differ from defaults
  const prizesChanged = data.prizes && JSON.stringify(data.prizes) !== JSON.stringify(defaults);

  const payload: Record<string, unknown> = {
    s: data.sender,
    r: data.recipient,
    m: data.reason,
    l: lang,
  };
  if (prizesChanged) payload.p = data.prizes;

  const json = JSON.stringify(payload);
  // Use TextEncoder for proper UTF-8 → binary string for btoa
  const bytes = new TextEncoder().encode(json);
  const binary = String.fromCharCode(...bytes);
  return toUrlSafe(btoa(binary));
};

export const decodeGameData = (encoded: string): GameData | null => {
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
};
