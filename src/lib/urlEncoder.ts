// Simple Base64 encoding for URL parameters to obscure personal data

interface GameData {
  sender: string;
  recipient: string;
  reason: string;
}

export const encodeGameData = (data: GameData): string => {
  const json = JSON.stringify({
    s: data.sender,
    r: data.recipient,
    m: data.reason,
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
    };
  } catch {
    return null;
  }
};
