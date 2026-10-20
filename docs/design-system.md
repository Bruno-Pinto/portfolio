# Portfolio design system

This is the current visual reference. Use it when changing components; older entries in design-decisions.md describe the history and may be superseded here.

## Concept

A personal technical portfolio: clear editorial hierarchy on dark surfaces, restrained color, sharp frames and an optional project-scanner interaction. Professional experience and factual evidence should be easy to find before exploring the interactive details.

## Color and hierarchy

- Page background: #090D10. Off-white primary text: #EDF5F6. Cyan #00FFFF is the primary action accent.
- Every main section uses the same blue #8FB9DF numbered eyebrow and off-white h2. Do not recolor individual section titles.
- Section titles use clamp(2rem, 3.9vw, 3.5rem), weight 600, line-height 1.12 and 16px after the eyebrow.
- Category colors (cyan, violet, blue, mint, amber) distinguish skills and experience details. They do not imply rankings or proficiency.
- Body text stays neutral and high contrast. Avoid colored long paragraphs, excessive glow, noise and gradients behind reading text.
- Main sections have 96px vertical padding on desktop and 64px on mobile. Containers retain shared alignment.

## Hero

The hero fills at least the viewport below the measured header using svh. Short viewports and mobile may grow naturally to keep all content readable. The full-width background uses dark blue-violet architectural planes and a low-contrast drafting grid. The grid drifts slowly only while the hero is visible and stays static on mobile and for reduced motion. Name, role, study context, a broad introduction and primary actions lead the layout.

A larger portrait balances the text. There is no map, technology list or lower wayfinding strip. Background patterns are CSS-only and need no external image or service.

## Controls

- Corners remain square. Framed controls use a 1px border, dark surface and at least 48px height.
- Hero and contact social links use larger icons, visible labels and separate frames. Keep email, language and CV links native anchors.
- Hover changes border/background/text over 180ms. Fine-pointer framed social controls lift by 3px.
- Press scales controls to 0.97 over 120ms. The scanner keeps its existing flight transform; individual scale is independent.
- Navigation and text links receive hover color and press feedback without turning all links into cards.
- Keyboard focus retains a visible cyan outline. Disabled controls do not react like enabled controls. Essential feedback also works without motion.

## Motion

No blinking, light-on flicker, looping flashes, typewriter gate or delayed introduction. Entrances run once on viewport entry: the hero title uses a horizontal mask reveal, the portrait opens from its center, experience entries fly in as complete cards with a short horizontal motion and fade, skills use a small scale/fade, and supporting text fades in. These last 650?900ms and do not move content upward. About topics and their connectors have a brief coordinated 380ms entry with up to 260ms of desktop stagger. Mobile topics reveal as they enter the viewport. Text remains available without JavaScript.

The About identity map uses a stationary near-black surface with a faint orthogonal grid, not parallax, large glows or looping floats. Its photo receives one faint 1-second scan on first entry. A static topic hover brightens the corresponding measured connector; topics do not receive decorative tab stops.

Respect prefers-reduced-motion for all movement, including when the preference changes during an animation. Never obstruct navigation while motion completes.

## Verification

Check English and German at 320, 390, 768 and 1440px. Confirm no horizontal overflow, consistent section heading styles, readable wrapping, focus visibility, control hover/press states, portrait loading, reduced motion and scanner/list journeys. Run production build, lint and relevant Playwright tests. Keep sources and licenses documented for any new external assets.

The hero location includes a local decorative Swiss flag. After the 900ms portrait expansion, two border paths draw from the top-left along opposite edges and meet at the bottom-right over 850ms. Without JavaScript or with reduced motion, the complete frame is visible immediately.

Experience cards reveal independently when roughly 65% is visible below the header, without waiting for another card. For cards too tall to fit, the trigger is capped at 80% of the available viewport height. The whole card travels 16px horizontally and fades in over 560ms. Its left rail starts after 100ms and grows downward over 480ms; horizontal branches draw over 280ms. Reduced motion and keyboard focus reveal content immediately. Without JavaScript the complete timeline stays visible.

The hero blue-violet background is deliberately dimmer than the content. The scanner has a low-opacity cyan perimeter trace on a 14-second loop while idle or ready and visible. It pauses offscreen and during card movement/scanning, and is hidden for reduced motion. The red scanning beam and progress feedback retain their existing behavior.

## Stylesheet ownership

Keep the Tailwind import and static theme tokens in src/app/globals.css. Put shared native CSS in src/app/portfolio.css, imported after globals.css by both localized root layouts. Keep component-specific CSS in CSS Modules. This separation avoids a reproduced Tailwind loader issue where the local preview retained old CSS after edits and Git branch changes. Live add/revert CSS updates were verified through the browser after the separation. Production caching and the static-export workflow remain unchanged.

## Project browsing: upright hand and progressive list

The scanner keeps all seven projects available. At desktop widths of 1200px and above, upright cards overlap as a hand without rotation. Hover or keyboard focus brings a complete card forward; Each slot has an explicit increasing layer so a resting card always sits behind its right neighbour. Only pointer hover or visible keyboard focus raises a slot temporarily. All cards share a fixed five-row face and baseline. PHP, SpinWheels and the portfolio use their explicit featured metadata for a cyan/blue/violet foil finish with a faint 12-second resting sheen (static with reduced motion); other cards remain dark, including on hover. Lift uses individual translate/scale properties, separate from flight transforms, and respects reduced motion. The desktop hand overlaps only the outer 12px of each card and scrolls horizontally instead of compressing all seven cards into one viewport. Titles, numbers and artwork remain exposed without hover. Inspected cards remain full-size above slightly dimmed neighbours. On narrower screens, separated cards form a horizontal swipe rail with previous/next controls and scroll snapping. Card faces, illustrations and scanner proportions remain shared.

Return flights use inert, aria-hidden snapshots in a fixed viewport layer so the rail does not clip card movement. The real tray card keeps its focus and layout position; snapshot lift is reset and cleanup runs on both completion and cancellation. The tray touches the scanner directly. The existing pad caption supplies localized guidance; rail controls sit after the cards. the temporary snapshot is removed when the flight ends or is cancelled. No change is made to the red scan beam, result panel, return behavior or view toggle.

List view initially displays only the first three projects, in the shared order. A centered show-all button reveals the other four and has explicit expanded/controls semantics. Cards remain mounted while hidden so individual details states survive repeated show-all/collapse cycles. Collapse restores focus if it would hide the active element and preserves the control's viewport position. Related-project links reveal later entries before opening and focusing them.

List summaries use two or three stacked contribution bullets rather than competing columns. Expanded content keeps remaining contributions, features and context in a simple reading flow with fewer dividers and no nested outcome panels. Source links remain directly accessible. Project prose is plain, with no orange keyword highlighting or authoring markers; existing technology tags remain unchanged.

Mouse users can grab a card and drag the deck horizontally. An 8px threshold distinguishes dragging from clicking, with pointer capture during a grab and click suppression after a drag. Touch retains native scrolling; arrows and keyboard activation remain available.

## Shared project identity and reading hierarchy

Project category metadata in src/content/project-scanner.ts is independent of locale and featured status. Professional software/product work uses cyan #7EDFE6; university work uses muted purple #CBBBF0; personal projects use green #9ED6B1; infrastructure/ITSM uses amber #E8C18A. The projectAccent helper passes one CSS custom property to list cards, scanner faces and the selected detail panel. Use that accent for framing, category labels, focus states and short headings. Titles, summaries, paragraphs and technology tags stay neutral. Category text still names the project type: color is supplementary.

Collapsed list cards use the short shared summary and at most two shared contribution/feature bullets. Full descriptions, remaining contributions and all technical context remain in native disclosure. Reading text is capped at approximately 66-72 characters per line. Expanded content has one quiet recessed surface, not nested cards. Existing verified outcomes and engineering decisions appear first within expanded context and immediately after the scanner introduction, with a small accent rule and label. Source links and show-all state remain independent.

Card category metadata and technology pills use 12px text; list/scanner metadata uses 12px or larger. Browser tests resolve computed foreground/background colors, alpha, gradient stops, featured foil overlays and the deck's neighbour brightness filter, then check normal text against 4.5:1, large text against 3:1 and visible focus outlines against 3:1. Disabled controls are exempt. A prior purple label measured 4.46:1 when dimmed over foil, so its shared accent was lightened. Reduced-motion, card geometry and deck interactions remain unchanged.

Validation on 2026-10-20: the lowest measured computed contrast across tested project text and focus states was 4.82:1 on desktop and 6.59:1 on mobile, covering both locales, all seven selected projects, expanded/collapsed lists, neighbouring dimmed cards and hovered links/disclosures. The full browser suite passed 70 tests with two platform-specific skips. Scanner details now use content-driven height and document scrolling on desktop and mobile.

Project disclosure is a full-width, minimum-60px footer row with left-aligned label and a literal + / multiplication-sign state icon on the right. The native summary owns the whole hit area and keyboard behavior. A neutral inset surface and border distinguish it; hover adds the category edge, pressed state darkens the surface, and keyboard focus uses a 3px category outline. Repository links sit above the action, leaving it as the final collapsed-card row. Reduced motion disables its transitions.

## About identity map

Beyond the code / Abseits des Codes uses the owner-supplied bruno-at-desk.png portrait, uncropped at its original 831:1039 aspect ratio. The older portrait.jpg and hero portrait-new.jpg stay available; the hero is unchanged. Above 1050px, five topics surround the central photo asymmetrically. Dedicated square markers at the photo frame and topic edges are real SVG endpoints, measured on resize and font load. The music branch routes below the photo caption. Tablet uses a portrait-first two-column arrangement; at 600px and below the five topics stack in reading order. Connectors disappear on tablet/mobile instead of crossing content.

Background, motivation, working approach, hobbies and music use concise localized owner-approved text. Education and unchanged language proficiency information share a directly attached supporting strip. It stacks at tablet/mobile widths. All content remains visible without JavaScript and without hovering. Motion respects reduced motion, runs once, never loops, and never gates content.

## Scanner discovery and completed state

The empty desktop scanner uses a short 132px slot instead of a full-height blank card. On mobile/tablet the empty pad is omitted; the scanner toolbar, compact selection entry and guidance remain visible. Selecting a project restores the full 420px dock for flight and scanning. On screens up to 850px wide, only the completed state collapses the dock to a 148px title/category/return header over 320ms. Reduced motion applies that state immediately. Auto-scroll waits for the slot transition and aligns the compact header so project details are visible below it. Desktop keeps its full-sized card and two-column arrangement. No details panel clips or scrolls internally.

On mobile/tablet (up to 850px), a native details-based project picker sits at the start of the details pane and stays near the reading position with sticky positioning. It is hidden on desktop, where the deck handles project selection. It offers seven compact text choices without duplicating card faces, and uses the same choose handler and flight state. Escape closes it and restores summary focus; outside pointer interaction dismisses it. Choosing focuses the dock, returning restores focus and viewport visibility to the source card. Outgoing flights scale from the compact dock back to full deck geometry. The red beam, progress, foil, category accents, dragging and list view remain unchanged.

Scanner UX validation (2026-10-20): visually reviewed desktop 1440/1366px, tablet 768px and mobile 390/320px, with both locales covered by browser checks. The full suite passed 82 tests with two platform-specific skips; the final viewport guard and picker contrast checks passed their targeted rerun. Long content now lengthens the document instead of creating a nested scrollbar. The smaller deck overlap means more horizontal travel, offset by mouse dragging, native touch scrolling, arrow controls and the nearby project picker.
