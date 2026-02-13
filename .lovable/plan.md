

# Update Pong Speech Bubbles — More Apologetic Tone

## Goal
Replace the current speech bubble messages with ones that feel more genuinely apologetic and remorseful (from the sender's perspective), while keeping them short, lighthearted, and fun for the game context.

## Current vs. Proposed

| # | Current (EN) | Proposed (EN) | Current (ZH) | Proposed (ZH) |
|---|-------------|---------------|--------------|---------------|
| 1 | OOPS! | I'M SORRY OK | 哎呀！ | 对不起好吧 |
| 2 | NICE ONE | I DESERVED THAT | 厉害！ | 我活该 |
| 3 | UR GOOD | FORGIVE ME PLS | 你真棒 | 求你原谅我 |
| 4 | MY BAD | MY BAD FR | 我的错 | 真的是我的错 |
| 5 | HELP ME | I MESSED UP | 救命 | 我搞砸了 |
| 6 | SORRY! | SO SORRY!! | 抱歉！ | 太对不起了!! |
| 7 | YIKES | I FEEL AWFUL | 糟糕 | 我好内疚 |
| 8 | TOO FAST | DON'T HATE ME | 太快了 | 别讨厌我 |
| 9 | OUCH! | I OWE U BIG | 好痛！ | 我欠你的 |

## What Changes

**`src/lib/i18n.ts`**
- Replace the 9 `bubble*` values in both `en` and `zh` translation objects with the new apologetic messages above
- No structural changes needed — `getApologyMessages()` picks them up automatically

