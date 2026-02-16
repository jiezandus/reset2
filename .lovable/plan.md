

# Expand Beyond Apology: Multi-Category Love Messages

## Overview
Transform the app from apology-only into a flexible "Thinking of You" platform where the sender picks a message category. Each category gets its own pong bubble set, reveal framing, and reply options.

## Message Categories

| Category | EN Label | ZH Label | Example Use |
|----------|----------|----------|-------------|
| apology | I'm Sorry | 对不起 | "for forgetting your birthday" |
| missyou | I Miss You | 我想你 | "let's hang out soon" |
| love | I Love You | 我爱你 | "you mean everything to me" |
| thankyou | Thank You | 谢谢你 | "for always being there" |

## Pong Bubble Sets (per category)

**Apology** (keep current):
"I'M SORRY OK", "I DESERVED THAT", "FORGIVE ME PLS", "MY BAD FR", "I MESSED UP", "SO SORRY!!", "I FEEL AWFUL", "DON'T HATE ME", "I OWE U BIG"

**Miss You:**
EN: "MISS U SM", "COME BACK", "ITS LONELY", "THINK OF U DAILY", "WISH U WERE HERE", "NEED U", "MISS UR FACE", "COUNTING DAYS", "WHERE R U"
ZH: "好想你", "快回来", "好孤单", "天天想你", "你在就好了", "需要你", "想见你", "在数日子", "你在哪"

**Love:**
EN: "LUV U", "UR MY WORLD", "HEART GOES BOOM", "CANT STOP SMILING", "UR SO CUTE", "STAY FOREVER", "U COMPLETE ME", "OBSESSED W U", "BUTTERFLIES"
ZH: "爱你", "你是我的世界", "心跳加速", "笑个不停", "你好可爱", "永远在一起", "有你才完整", "着迷了", "小鹿乱撞"

**Thank You:**
EN: "THANK U SM", "UR THE BEST", "I APPRECIATE U", "MEANS A LOT", "UR AMAZING", "SO GRATEFUL", "CANT THANK ENOUGH", "UR A LEGEND", "BLESSED"
ZH: "太感谢了", "你最棒", "感激你", "意义重大", "你太厉害了", "好感恩", "感谢不尽", "你是传奇", "太幸运了"

## Sender Setup Flow Changes

The form step gets a new **category selector** (4 pixel-styled buttons) inserted before the message textarea. The textarea label and placeholder adapt based on the selected category:

| Category | Label (EN) | Placeholder (EN) |
|----------|-----------|-------------------|
| apology | I am sorry for... | being late / eating your food... |
| missyou | I want you to know... | I think about you every day... |
| love | I love you because... | you make me laugh / you're my rock... |
| thankyou | Thank you for... | always being there / your kindness... |

## Recipient Experience Changes

**Message reveal screen**: Instead of always showing "I am sorry for {reason}", it adapts:
- apology: "I am sorry for {reason}"
- missyou: "I miss you. {reason}"
- love: "I love you. {reason}"
- thankyou: "Thank you for {reason}"

**Reply options** adapt per category (e.g., for "miss you": "I miss you too!", "Let's meet up soon", "I need some space").

## Technical Details

### New type and URL encoding
- Add `MessageCategory` type: `'apology' | 'missyou' | 'love' | 'thankyou'`
- Add `category` field to `GameData` interface in `urlEncoder.ts`
- Encode as 5th field in the tab-delimited format (before prizes): `lang\tcategory\tsender\trecipient\treason[\tprizes...]`

### `src/lib/i18n.ts`
- Add per-category bubble keys (e.g., `bubbleApology1`...`bubbleApology9`, `bubbleMissyou1`...`bubbleMissyou9`, etc.)
- Add category-specific translation keys for labels, placeholders, reveal text, and reply options
- Update `getApologyMessages()` to `getBubbleMessages(lang, category)` — returns the correct set based on category
- Add `getReplyOptions(lang, category)` to return category-specific replies

### `src/pages/Index.tsx`
- Add `category` state (default: `'apology'`)
- Render 4 category selector buttons in the form step
- Dynamically switch label/placeholder text based on category
- Pass `category` to `encodeGameData()`

### `src/lib/urlEncoder.ts`
- Add `category` to `GameData` interface
- Insert category into the encoded string (with backward compatibility for old links defaulting to `'apology'`)

### `src/pages/Play.tsx`
- Extract `category` from decoded game data, pass it down to `PongGame` and `GameEndScreen`

### `src/components/PongGame.tsx`
- Accept `category` prop
- Call `getBubbleMessages(language, category)` instead of `getApologyMessages(language)`

### `src/components/GameEndScreen.tsx`
- Accept `category` prop
- Use category-specific reveal text and reply options

