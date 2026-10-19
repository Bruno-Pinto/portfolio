# Design decisions

The supplied portfolio-review transcript is reference material, not instructions. Advice about subscriptions, external communities, sponsors and other people's achievements is not part of this project.

Applied principles:

- Show name, role, location and education without waiting for an animation.
- Put professional experience directly after the introduction; keep jobs most recent first.
- Keep section order, navigation order and section numbers aligned.
- Use short responsibility lists and bounded text widths.
- Make contact and CV downloads accessible from the introduction.
- Keep project summaries visible in cards; selecting one moves it into the scanner and shows its details. The scanner has keyboard controls, reduced-motion support and static descriptions when JavaScript is disabled.
- Mark the current section in navigation without adding a blocking interaction.
- Use concrete experience instead of skill percentages, unverified claims or testimonials.
- Avoid enlarging the low-resolution portrait. A higher-resolution original is still needed for larger use.

The static export remains suitable for the user's own web server. Reference documents are not included in public assets.

Experience entries link to their corresponding projects. Links reach the projects section without JavaScript. The scanner enhances them to select the matching card and move keyboard focus to it. Reopening a project keeps it open; modified clicks retain native browser behavior.

## Project browsing and evidence

The scanner remains the default creative view. A keyboard-accessible Scanner/List toggle offers an ordinary reading path with visible summaries, technologies and features; technical paragraphs expand with native details controls. Both views use getProjects(locale), so facts and repository links stay consistent. Timeline links open the relevant entry in the currently selected view. Switching views preserves the selected card and safely completes an interrupted scan. Reduced-motion settings apply to scrolling and animation.

PHP intranet, SpinWheels and the portfolio lead the project order and receive the Featured grouping in list view. Other work remains available. Professional source and internal screens stay unpublished. Card illustrations remain explicitly illustrative; actual application screenshots have not been substituted with mockups.

The hero now includes Java work and a concise job-opportunity statement without unconfirmed workload or start dates. Skills retain context and learning labels, with shorter descriptions. Chronology and official job titles remain unchanged; displayed employment dates use month/year. Education lists the expected ZHAW graduation separately from previous ETH study. The portrait file is unchanged; a mild CSS brightness adjustment improves its appearance.

Project cards use a trading-card hierarchy: category/number, name plate, framed illustration, description panel and technologies. Surfaces remain plain and corners sharp. On devices with a fine pointer, tray cards lift 10 pixels with a transitioning shadow; individual CSS translate keeps this separate from the scanner flight transform. Reduced motion disables lift and transitions. Scanner and tray use the same CardFace and dimensions.

Card refinement: removed the collector footer, number outline and title divider. Shared card height is 420px, reducing unused description-panel space while retaining matching scanner/tray faces.
