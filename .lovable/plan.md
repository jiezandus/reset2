

## Update Speech Bubble Messages

A quick update to make the in-game speech bubbles funnier and more lighthearted.

---

### What Will Change

The speech bubbles that pop up during the Pong game when the sender's paddle hits the ball will display playful, humorous messages instead of serious apologies.

**Current Messages (too serious):**
- "SORRY!", "MY BAD", "FORGIVE?", "OOPS", "PLEASE?", "I WAS WRONG", "MISS U", "IM SORRY"

**New Funnier Messages:**
- "OOPS!"
- "NICE ONE"
- "UR GOOD"
- "MY BAD"
- "HELP ME"
- "SORRY!"
- "YIKES"
- "TOO FAST"
- "OUCH!"

These new messages are playful reactions to the gameplay itself rather than direct apologies, making them feel more like friendly banter during a game.

---

### Technical Details

**File:** `src/components/PongGame.tsx`

Update the `APOLOGY_MESSAGES` array (lines 26-35) with the new funny messages.

