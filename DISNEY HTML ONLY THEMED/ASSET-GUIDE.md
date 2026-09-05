# Disney Multi-Realm Prototype — Asset Guide

The current build is complete and works with the downloaded editorial-stock images below. Replacing them with licensed Disney key art or short atmospheric loops would make the portfolio version feel richer without changing the layout or animation code.

## Assets already in the prototype

| Realm / use | Local file | Current dimensions | Source |
| --- | --- | ---: | --- |
| Enchanted Meadow | `public/assets/grassland.jpg` | 1800 × 1200 | [Unsplash — mountain wildflowers](https://unsplash.com/photos/colorful-wildflowers-bloom-in-a-mountain-meadow-at-sunrise-pVfZmrNK5Mg) |
| Ocean of Adventure | `public/assets/ocean.jpg` | 1800 × 2400 | [Unsplash — underwater coral and sunlight](https://unsplash.com/photos/an-underwater-view-of-a-coral-reef-with-sunlight-shining-through-the-water-uQFpgH9_wEM) |
| City of Heroes | `public/assets/city.jpg` | 1800 × 1200 | [Unsplash — futuristic neon city](https://unsplash.com/photos/a-futuristic-city-at-night-with-neon-lights-dA0-qxdbyyY) |
| Sands of Wonder | `public/assets/desert.jpg` | 1800 × 2700 | [Unsplash — dune beneath the night sky](https://unsplash.com/photos/the-night-sky-with-stars-above-a-sand-dune-59n5rzOFNec) |
| Frozen North | `public/assets/frost.jpg` | 1800 × 1200 | [Unsplash — blue ice cave](https://unsplash.com/photos/a-close-up-of-a-blue-ice-cave-TaGDiQk3jN4) |
| Galactic Frontier | `public/assets/cosmic.jpg` | 1800 × 1212 | [Unsplash — colourful deep-space nebula](https://unsplash.com/photos/a-colorful-nebula-with-stars-in-deep-space-BGOMkThbjwg) |
| Final story hub | `public/assets/lanterns.jpg` | 1800 × 1200 | [Unsplash — glowing festival lanterns](https://unsplash.com/photos/glowing-japanese-lanterns-at-a-night-festival-guEJrCgWtGs) |
| Header and footer | `public/assets/disney-logo.png` | 190 × 80 | Disney.com header capture used only for this unofficial concept |

## Ideal replacement dimensions

| Asset type | Ideal dimensions | Format / target size | Important composition note |
| --- | ---: | --- | --- |
| Hero master panorama | 3840 × 2160 | AVIF or WebP, 500–900 KB | Keep the centre 60% free enough for the title; distribute realms from meadow on the left to space on the right. |
| Realm background still | 2560 × 1600 minimum; 3200 × 1800 preferred | AVIF or WebP, under 700 KB | Provide generous crop room on every edge because the background scales during parallax. |
| Optional realm loop video | 1920 × 1080, 24 fps, 8–12 seconds | WebM plus H.264 MP4 fallback, ideally under 6 MB | Seamless loop, no audio, no fast cuts, and no essential action at the edges. Only one loop should play at a time. |
| Character / vehicle cut-out | About 1600 × 1800 | Transparent WebP or PNG, under 2 MB | Full silhouette, clean edge, no text. Leave space toward the centre for copy. |
| Atmospheric overlay | 2048 × 2048 | Transparent WebP/PNG, under 500 KB | Petals, bubbles, sparks, dust, snow or stars; subtle enough to layer over copy. |
| Mobile realm image | 1440 × 1920 | AVIF or WebP, under 450 KB | Portrait crop with the visual focus in the upper half and a darker lower third for text. |
| Social sharing image | 1200 × 630 | JPG or WebP, under 400 KB | “One Castle. Many Realms.” plus the multi-realm panorama. |
| Clean Disney wordmark | 600 × 250 or larger | Official transparent PNG/SVG | Preserve exact proportions and use only where licensing/brand rules permit. |

## Best video ideas by realm

- Meadow: sunrise rays moving over wildflowers, slow lantern drift, very light floating pollen.
- Ocean: underwater caustics, small bubbles and a distant school of fish; avoid turbulent camera motion.
- City: slow forward push through a night skyline, distant sparks, soft red/blue energy reflections.
- Sands: stars moving above a still dune, warm dust crossing the foreground, one gentle lantern glow.
- Frost: macro ice refraction, tiny snow crystals and cool light travelling through a cave wall.
- Cosmic: slow nebula drift, parallax stars and one restrained orbital trail.

## Licensed Disney imagery

For a public portfolio, use official press/key art only when its published usage terms allow portfolio display. Avoid copying artwork from paid stock previews or reposted Pinterest images. If licensed character cut-outs are supplied later, the cleanest additions would be:

- Rapunzel or a floating-lantern silhouette in the meadow section
- Moana’s canoe or Ariel silhouette in the ocean section
- Avengers tower/hero silhouette in the city section
- Aladdin and Jasmine carpet silhouette in the sands section
- Elsa silhouette or the Arendelle skyline in the frost section
- A starship or WALL-E silhouette in the cosmic section

## How to replace an image

The simplest method is to export the new asset with the same filename and overwrite its counterpart in `public/assets`. Keeping the filenames unchanged means no code edit is needed. For a video version, add the MP4/WebM files to `public/assets` and place a muted, looping `<video>` behind the matching `.realm-backdrop`; keep the still image as its poster and fallback.
