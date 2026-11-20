---
name: LearnNova Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d0d9fd'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#ebedff'
  surface-container-high: '#e3e7ff'
  surface-container-highest: '#dbe1ff'
  on-surface: '#111a36'
  on-surface-variant: '#464555'
  inverse-surface: '#262f4c'
  inverse-on-surface: '#eff0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565d79'
  on-secondary: '#ffffff'
  secondary-container: '#d8deff'
  on-secondary-container: '#5a627e'
  tertiary: '#5c00ca'
  on-tertiary: '#ffffff'
  tertiary-container: '#7531e6'
  on-tertiary-container: '#e4d4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#bec5e5'
  on-secondary-fixed: '#131a33'
  on-secondary-fixed-variant: '#3e4660'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#faf8ff'
  on-background: '#111a36'
  surface-variant: '#dbe1ff'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-inline:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system targets ambitious modern learners, university students, and enterprise upskilling teams navigating AI-augmented education. The aesthetic balances the rigorous clarity of modern product tools like Linear and Notion with the inviting, motivational atmosphere of elite digital learning hubs. 

The visual style is **Contemporary Architectural SaaS with Subtle Luminosity**:
- **Structured Precision:** Crisp grid alignments, purposeful spacing, and clean dividing lines ground the interface in reliable educational rigor.
- **Ambient Intelligence:** AI-native interventions (recommendations, summarization prompts, adaptive milestones) feature soft violet and indigo luminance gradients, avoiding visual noise while demarcating machine intelligence.
- **Calm Cognitive Ergonomics:** High signal-to-noise ratio. Information density is carefully modulated through deep midnight typography against stark chalk-white and cool slate surfaces, prioritizing sustained focus without cognitive fatigue.

## Colors

The palette establishes an intentional cadence between deep institutional authorities, vibrant synaptic accents, and crisp atmospheric canvases:

- **Primary (`#4F46E5`):** Royal indigo powering primary actions, core progress milestones, interactive learning focus states, and key navigational paths.
- **Secondary (`#0B132B`):** Deep interstellar navy deployed for deep-toned foundational scaffolding, high-contrast headings, and grounding sidebar elements.
- **Tertiary (`#7C3AED`):** Vivid royal violet reserved for AI copilot states, dynamic study suggestions, flash insight summaries, and celebration micro-interactions.
- **Neutral Core (`#1C2541`):** Slate navy driving crisp, legibility-first body typography and medium-contrast semantic data.
- **Surface & Foundation Tones:**
  - Canvas Base: `#FFFFFF` pure crisp white for cards and workspaces.
  - Substrate / App Background: `#F8FAFC` to `#F1F5F9` cool slate tint.
  - Tinted Accents: `#EEF2FF` (soft indigo highlight) and `#F5F3FF` (delicate lavender substrate).
  - Borders: `#E2E8F0` for structure-defining dividers and `#C7D2FE` for subtle energetic borders.
- **Functional Semantics:** Success: `#10B981`, Warning: `#F59E0B`, Danger: `#EF4444`, AI Gradient Spectrum: `linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #A855F7 100%)`.

## Typography

Typography pairs **Plus Jakarta Sans** for structural elements and **Inter** for sustained instructional reading:

- **Headlines & Metric Data (Plus Jakarta Sans):** Brings a geometric, optimistic presence. Tighter negative tracking (`-0.02em` to `-0.01em`) ensures titles remain visually compact and authoritative at larger scales.
- **Reading Passages & Instructional Body (Inter):** Leverages neutral grotesque forms and balanced x-height to maximize comprehension speed across dense curriculum, AI chat feeds, and documentation.
- **Micro-Labels & Data Caps:** Compact metadata, module status indicators, and course tags use uppercase or semi-bold micro-tokens with slight positive tracking (`0.04em`) to ensure instant legibility against tinted badges.

## Layout & Spacing

The layout operates on an 8pt architectural rhythm within a **12-column responsive fluid grid system**:

- **Desktop (1280px+):** Fixed collateral navigation (260px) paired with a 12-column adaptive workspace. Gutters remain `1.5rem` (24px) with maximum container bounds capped at 1440px for broad dashboard layouts, preserving comfortable line lengths.
- **Tablet (768px - 1279px):** Navigation collapses to an icon sidebar (72px) or top bar. Columns scale down to 8 with `1rem` (16px) gutters and `1.5rem` margins. Two-column curriculum setups stack predictably into single flows.
- **Mobile (< 768px):** Single-column stack with `1rem` (16px) outer margin. Persistent bottom navigation docked for core module access, with secondary tool drawers sliding up via bottom sheets.
- **Spacing Application:**
  - `space-xs` (4px) & `space-sm` (8px): Icon-to-text lockups, chip padding, nested list row intervals.
  - `space-md` (16px): Standard internal card padding, input spacing, form field groupings.
  - `space-lg` (24px) & `space-xl` (32px): Dashboard module gap separation, curriculum track milestones, section separators.

## Elevation & Depth

This design system avoids harsh drop-shadows, employing **layered cool-tinted ambient luminescence and low-contrast borders**:

- **Layer 0 (Canvas):** Base background tinted in cool slate `#F8FAFC`. Zero elevation.
- **Layer 1 (Card/Container Base):** Pure `#FFFFFF` resting directly on the canvas, bounded by a 1px border (`#E2E8F0`). Subtle ambient drop: `0 1px 3px rgba(11, 19, 43, 0.04), 0 1px 2px rgba(11, 19, 43, 0.02)`.
- **Layer 2 (Interactive Floating / Hover):** Activated cards, hover states, and course tiles elevate with: `0 10px 25px -5px rgba(79, 70, 229, 0.08), 0 8px 10px -6px rgba(11, 19, 43, 0.04)`.
- **Layer 3 (Modals / Overlays / Flyouts):** High-level overlays rely on strong blur containment (`backdrop-filter: blur(12px)`) with `rgba(11, 19, 43, 0.4)` backdrops, paired with: `0 20px 25px -5px rgba(11, 19, 43, 0.12), 0 8px 10px -6px rgba(11, 19, 43, 0.08)`.
- **AI Glowing Elevation:** For automated insights, personalized recommendations, or active prompt bars, an aura ring is applied via `box-shadow: 0 0 0 1px #C7D2FE, 0 4px 20px rgba(124, 58, 237, 0.12)`.

## Shapes

The geometric structure relies on **Rounded Level 2** (`0.5rem` / 8px core radius):

- **Micro Components (Buttons, Inputs, Metric Badges):** Standard `8px` (`0.5rem`) radius creates an approachable yet orderly technical profile.
- **Structural Modules (Cards, Panels, Modal Windows):** Uses `rounded-lg` (`1rem` / 16px) to frame multi-row content and modular syllabus sections softly without appearing bulbous.
- **Pill Badges & AI Prompts:** Category pills, status indicators, and prompt tokens specifically override standard card geometry using `9999px` full-capsule styling (`pill`) to contrast against rectangular cards.
- **Progress Trackers:** Capsule-ended tracks (`rounded-full`) maintain organic momentum along completion bars.

## Components

### Buttons
- **Primary:** Solid `#4F46E5` background, `#FFFFFF` text, subtle inner shadow (`inset 0 1px 0 rgba(255, 255, 255, 0.15)`), `8px` border-radius. On hover: shifts to `#4338CA` with an ambient glow.
- **AI Assist Action:** Gradient background (`linear-gradient(135deg, #4F46E5, #7C3AED)`), white text, accompanied by an AI sparkle icon. On hover: gradient shifts luminosity with a `0 4px 14px rgba(124, 58, 237, 0.35)` elevation.
- **Secondary:** Surface `#FFFFFF`, 1px border `#E2E8F0`, text `#1C2541`. On hover: border `#C7D2FE`, background `#F8FAFC`.
- **Ghost:** Transparent background, text `#4F46E5` or `#64748B`. Hover state applies `#EEF2FF` fill.

### Chips & Pill Badges
- **Status Pills:** Fully rounded (`rounded-full`), height 24px, 8px horizontal padding.
  - Active/In-Progress: Background `#EEF2FF`, text `#4F46E5`, 1px border `#C7D2FE`.
  - AI Suggested: Background `#F5F3FF`, text `#7C3AED`, with a micro gradient dot.
  - Completed: Background `#ECFDF5`, text `#065F46`, border `#A7F3D0`.

### Form Inputs & Selectors
- **Text Inputs:** Height 40px, surface `#FFFFFF`, 1px border `#E2E8F0`, font `14px Inter`. Placeholder text `#94A3B8`.
- **Focus State:** 1px border `#4F46E5`, paired with an outer focus ring `0 0 0 3px rgba(79, 70, 229, 0.15)`.
- **Checkboxes & Radios:** 16px square/circle with `4px` corner radius on checks. Inactive: border `#CBD5E1`. Checked: filled `#4F46E5` with white checkmark asset.

### Cards & Module Containers
- **Curriculum Card:** Pure white background, 16px border-radius, 1px solid `#E2E8F0`. Internal padding `24px`. Contains track title, estimated study time, tag pill, and integrated progress bar.
- **AI Insight Callout:** Lavender gradient wash (`linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 100%)`), border `1px solid #E9D5FF`, dynamic purple micro-badge anchor.

### Learning Progress Bars
- **Progress Track:** 6px or 8px height, background `#EEF2FF`, radius `9999px`.
- **Indicator Fill:** Smooth transition `fill 300ms ease-out`. Gradient `linear-gradient(90deg, #4F46E5, #7C3AED)`. 
- **Streak & Milestone Indicators:** Glowing circular node markers resting inline with active progress points.