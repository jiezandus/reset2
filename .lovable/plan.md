

# Lucky Wheel Feature

## Overview
After the recipient wins the Pong game and sees the apology message, a new "Lucky Wheel" phase will appear. The recipient spins a retro 1-bit styled wheel to land on a fun "make-it-up-to-you" reward coupon. The won coupon is then included in the reply message so the sender knows they need to redeem it.

## New Flow
```text
Apology Reveal --> [Press B] --> Lucky Wheel --> [Spin] --> Coupon Reveal --> [Press B] --> Reply Selection --> Copy & Send --> Success
```

The existing phases shift: `apology -> wheel -> coupon -> reply -> success`

## Wheel Prizes (6 segments, bilingual)
1. "Make you a nice dinner" / "给你做一顿大餐"
2. "Go to a game arcade" / "一起去游戏厅"
3. "Buy the keyboard you wanted" / "买你想要的键盘"
4. "Movie night, your pick" / "电影之夜，你来选"
5. "Boba tea for a week" / "请你喝一周奶茶"
6. "A heartfelt letter" / "一封真心的信"

## What Gets Built

### 1. New Component: `src/components/LuckyWheel.tsx`
- A canvas-based spinning wheel rendered in the 1-bit retro style (black segments on LCD green background, thick borders)
- 6 equal segments with prize text drawn at angles
- Spin triggered by a button (or A button on console)
- Smooth easing animation (spin for ~3 seconds, decelerate to stop on a random segment)
- Callback `onResult(prize)` fires when spin completes
- Fits within the existing console screen dimensions

### 2. Updated Component: `src/components/GameEndScreen.tsx`
- Add two new phases to `GamePhase`: `'wheel'` and `'coupon'`
- Full phase flow becomes: `apology -> wheel -> coupon -> reply -> success`
- **Wheel phase**: Shows title "SPIN THE WHEEL" with subtitle "Let's see how {name} will make it up to you!", renders the LuckyWheel component, and a "SPIN!" button
- **Coupon phase**: Shows the won prize as a retro "coupon" card with dashed border, prize text, and "{senderName} owes you:" header. Press B to continue to reply
- **Reply phase update**: The copied reply message now includes the coupon (e.g., the reply text + " P.S. Don't forget — you owe me: [prize]!")
- Update `pressB` handler to navigate through new phases: apology -> wheel (no B action during spin) -> coupon -> reply (back goes to coupon) -> success
- Store `wonPrize` in state

### 3. Updated Translations: `src/lib/i18n.ts`
- Add new keys for both EN and ZH:
  - `spinTheWheel` / "SPIN THE WHEEL" / "转转幸运轮"
  - `wheelSubtitle` / "Let's see how {name} makes it up!" / "看看{name}怎么补偿你！"
  - `spin` / "SPIN!" / "转！"
  - `youGot` / "You got:" / "你获得了："
  - `couponFrom` / "{name} owes you:" / "{name}欠你："
  - `redeemCoupon` / "Redeem this coupon!" / "兑换这张优惠券！"
  - `wheelPrize1` through `wheelPrize6` for each prize
  - `couponAppend` / "P.S. Don't forget you owe me: {prize}" / "附：别忘了你欠我：{prize}"
- Update `replyShareMessage` template to include `{coupon}` placeholder
- Add `getWheelPrizes(lang)` helper function returning the 6 prize strings

### 4. Updated Styles: `src/index.css`
- Add a `@keyframes spin-wheel` animation for the wheel rotation
- Add `.animate-spin-wheel` utility class

## Technical Details
- The wheel uses HTML Canvas for pixel-perfect 1-bit rendering within the small console screen (~240x160px area)
- Spin result is pre-determined randomly before animation starts; animation duration/rotation is calculated to land on that segment
- No external dependencies needed -- pure Canvas API
- The coupon text is appended to the clipboard message in the reply phase via the existing `getShareMessage` function

