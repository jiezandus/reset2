
## Set Category Button Font Size to Match Input Boxes

**Change**: Update the category button label font size from `text-[5px]` to `text-xs` (12px) to match the input boxes.

**File**: `src/pages/Index.tsx`

The category buttons in the message step currently use `text-[5px]` for their labels (Apology, Miss You, Love, Thank You). This will be changed to `text-xs`.

**Note**: At 12px, the text may be tight inside the small grid buttons. The button padding or grid layout may need slight adjustment to accommodate the larger text comfortably. I'll check and adjust if needed.

### Technical Details
- In `src/pages/Index.tsx`, locate the category button `<span>` with class `text-[5px]` (currently around line ~178)
- Change `text-[5px]` to `text-xs`
- May need to adjust button padding (`py-1 px-0.5`) or allow text wrapping if labels overflow
