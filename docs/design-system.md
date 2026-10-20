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

No blinking, light-on flicker, looping flashes, typewriter gate or delayed introduction. Entrances run once on viewport entry: the hero title uses a horizontal mask reveal, the portrait opens from its center, experience entries reveal from an edge, skills use a small scale/fade, and supporting text fades in. These last 650?900ms and do not move content upward. About topics reveal in sequence: connector drawing then text, spaced 680ms apart. Mobile reveals follow scrolling. Text remains available without JavaScript.

About parallax moves only the background, at a 0.3 scroll ratio capped at 120px on desktop, with faded edges and overscan. It is disabled on mobile and for reduced motion. Connectors are measured from rendered portrait and text bounds and stop 18px short of the portrait. Text floats gently while in view.

Respect prefers-reduced-motion for all movement, including when the preference changes during an animation. Never obstruct navigation while motion completes.

## Verification

Check English and German at 320, 390, 768 and 1440px. Confirm no horizontal overflow, consistent section heading styles, readable wrapping, focus visibility, control hover/press states, portrait loading, reduced motion and scanner/list journeys. Run production build, lint and relevant Playwright tests. Keep sources and licenses documented for any new external assets.
