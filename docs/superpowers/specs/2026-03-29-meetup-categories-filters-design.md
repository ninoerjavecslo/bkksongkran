# Meetup Page — Categories, Filters & Scale Design
Date: 2026-03-29

## Problem
1. Community events have no category (pre-drinks vs afterparty vs casual)
2. No way to filter the event list by type
3. At 100+ attendees per event, chips overflow with no collapse
4. Name and comment text look the same — hard to distinguish at a glance

## Design

### 1. Categories for community events
Four options shown as a segmented selector in the Add Event modal:
- Pre-drinks · Afterparty · Meetup · Other
Stored as `category` (text, nullable) in `meetup_entries`.
Shown as a colored pill on the card (same style as Festival/Circuit/Free pills) using the community pink `#b4005d`.
Icon changes per category: pre-drinks=local_bar, afterparty=nightlife, meetup=diversity_3, other=celebration.

### 2. Filter bar
Positioned below the sticky day tabs. Pills: All · Festival · Circuit · Free · Pre-drinks · Afterparty · Meetup · Other.
- Filters visible cards on the current day only.
- Active pill: dark navy `#003345` background, white text.
- Inactive pill: subtle background, dark text.
- Filter state resets to "All" when switching days.
- Community event cards get a `data-filter-cat` attribute matching their category.

### 3. People list collapse
- Show first 20 chips.
- If more than 20, append a "+X more" chip styled identically to person chips but with muted styling.
- Clicking "+X more" reveals remaining chips inline (no page load, no new page).
- Collapse back not needed — expand is permanent until page reload.

### 4. Name vs comment visual distinction
Current: both name and note are close in size/weight.
Fix: name in bold `#003345`, note separated by a `·` divider in `#c0e8ff`, note text in `#6b8fa3` italic style, smaller font (11px vs 13px). The dot separator gets its own element with distinct color to act as a visual break.

### 5. Supabase schema
Add column: `category text null` to `meetup_entries`.
No migration needed for existing rows — null = no category (treated as the event's own type for official parties, treated as "Other" for community events).

## Architecture
- All changes in `src/pages/meetup.astro` only.
- `category` passed in the POST body for custom events.
- `buildCustomCard()` reads `ev.entries[0]?.category` for the pill and icon.
- `renderAllCustom()` sets `data-filter-cat` on each card wrapper.
- Filter bar JS: `filterEvents(cat)` hides/shows `.party-card` and `.custom-card` by `data-filter-cat`.
- Official party cards get `data-filter-cat` set from their `type` field (lowercased).
