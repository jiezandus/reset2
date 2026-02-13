// Simple Base64 encoding for URL parameters to obscure personal data
import { Language } from './i18n';

interface GameData {
  sender: string;
  recipient: string;
  reason: string;
  lang?: Language;
  prizes?: string[];
}

export const encodeGameData = (data: GameData): string => {
  const json = JSON.stringify({
    s: data.sender,
    r: data.recipient,
    m: data.reason,
    l: data.lang || 'en',
    p: data.prizes,
  });
  return btoa(encodeURIComponent(json));
};

export const decodeGameData = (encoded: string): GameData | null => {
  try {
    const json = decodeURIComponent(atob(encoded));
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
