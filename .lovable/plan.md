

# Chinese Language Support Implementation Plan

## Overview
Add bilingual support (English/Chinese) to the RESET game with a language toggle on the first page. The selected language will be encoded in the game URL so recipients see the game in the sender's chosen language.

## Implementation Steps

### Step 1: Create Language Translation System
Create a new file `src/lib/i18n.ts` containing:
- Language type definition (`'en' | 'zh'`)
- Translation object with all English and Chinese strings
- Helper function `t(key, lang, replacements?)` to get translated text with dynamic value substitution

### Step 2: Create Language Context
Create `src/contexts/LanguageContext.tsx`:
- React Context to provide language state globally
- `useLanguage()` hook for easy access
- Default language: English

### Step 3: Add Language Toggle to Index Page
Modify `src/pages/Index.tsx`:
- Add a toggle switch in the header area (EN | 中)
- Use the 1-bit retro style matching the existing UI
- Store selected language in context

### Step 4: Encode Language in URL
Modify `src/lib/urlEncoder.ts`:
- Add `lang` field to the encoded data structure
- Update `encodeGameData` and `decodeGameData` to include language

### Step 5: Update Index Page Text
Modify `src/pages/Index.tsx`:
- Replace all hardcoded strings with `t()` function calls
- Include language in share messages

### Step 6: Update Play Page
Modify `src/pages/Play.tsx`:
- Extract language from decoded URL data
- Set language context based on URL parameter

### Step 7: Update PongGame Component
Modify `src/components/PongGame.tsx`:
- Replace all hardcoded strings with `t()` calls
- Include pre-game screen text and speech bubbles

### Step 8: Update GameEndScreen Component
Modify `src/components/GameEndScreen.tsx`:
- Replace all hardcoded strings with `t()` calls
- Update all phases (apology, reply, success)
- Update share message generation

---

## Technical Details

### Translation File Structure (`src/lib/i18n.ts`)

```text
translations = {
  en: {
    // Index page
    breakTheIce: "Break the Ice",
    createApologyGame: "Create an apology game",
    yourName: "Your Name",
    enterYourName: "Enter your name...",
    theirName: "Their Name",
    whoApologizing: "Who are you apologizing to?",
    sorryFor: "I am sorry for....",
    sorryPlaceholder: "being late/eating your food/ghosting you...etc",
    generateInvite: "Generate Invite ►",
    ready: "Ready!",
    sendTo: "Send to {name} via your messaging app",
    // ... all other strings
  },
  zh: {
    breakTheIce: "破冰行动",
    createApologyGame: "创建一个道歉游戏",
    yourName: "你的名字",
    enterYourName: "输入你的名字...",
    // ... all Chinese translations
  }
}
```

### Language Toggle UI Design
- Position: Top-right corner of the form screen
- Style: Two-option pill toggle matching 1-bit aesthetic
- Labels: "EN" and "中" (short for space efficiency)

### URL Encoding Update
The encoded URL data will include:
```text
{
  s: sender,
  r: recipient,
  m: reason,
  l: 'en' | 'zh'  // new language field
}
```

### Backward Compatibility
- If `l` (language) is missing from decoded data, default to English
- Maintains compatibility with existing shared links

