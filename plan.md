# OmniRoute UI Redesign Plan

## Status: S1–S7 Complete | B1–B11 Resolved | BUILD_EXIT=0

### PHASES COMPLETED

#### S1 — Baseline
- `npm install` exit 0, 941 packages
- Fixed `.env` had `NODE_ENV=production` (broke `next dev` → all 404s)
- Fixed stray root `app/` dir shadowing `src/app/`

#### S2 — Palette / Logo / Tokens
- Rewrote `globals.css` (palette, radii, motion, gradients, shadows, reduced-motion guard, `.tabular-nums`)
- `themeStore.ts` gained `aqua` preset + default
- `config.ts` → `defaultTheme: "light"`
- New routed-path "O" `OmniRouteLogo.tsx`
- New `favicon.svg`, `apple-touch-icon.svg`
- Installed `motion@14.9.0`, Radix, cva, clsx, tailwind-merge@3.7.0, cmdk
- `ui/motion.tsx` (PageTransition, StaggerList, StaggerItem, Reveal, CountUp)

#### S3 — App Shell
- `cn()` → `twMerge(clsx())`
- Sidebar `w-[260px]`/`w-[72px]` with spring `layoutId="sidebar-active"` pill
- **⌘K CommandPalette** (`ui/CommandPalette.tsx`, Radix Dialog + cmdk) — verified typing "prov" → Enter → `/dashboard/providers`
- Topbar Search trigger
- Palette keyframes
- Unlayered `[cmdk-input]:focus-visible` focus-ring fix

#### S4 — Design System
- `ui/primitives.tsx` — `PageHeader`, `SectionHeader`, `StatCard` (+delta pill, `Sparkline`), `Sparkline` (SVG), `EmptyPanel`, `TabBar`, `Skeleton`, `StatCardSkeleton`
- Barrel-exported from `shared/components/index.tsx`
- `Card` (rounded-xl, shadow-soft, token borders, Aqua icon tile, hover lift)
- `Badge` (tinted fill + inset ring, `primary` = Midnight on Aqua, new `action` variant)
- `Button` (tokens, `hover:brightness-[1.06]`, danger uses `--color-error`)
- `EmptyState` rewritten (token-driven; accepts Material Symbols name or emoji)
- `Breadcrumbs` rewritten; renders only at depth ≥3 (B11)
- Light-mode contrast remap: `:root:not(.dark) .text-*-400` → 600-level equivalents (1 CSS rule fixes ~120+ call sites)
- Removed `[class*="text-primary"]` that would turn all body text purple
- Contrast rule: Aqua ≈1.9:1 on white → never use Aqua for text or white-on-Aqua

#### S5 — Tier B Final Cleanup
- Systemic CSS remap rule in `globals.css` covers all class-based `text-400`/`bg-400` utilities
- Individual JS fixes: Health page, AuditLogTab
- No raw `text-400`/`bg-400` remaining in any Tier B `.tsx` files
- Duplicate `<h1>`s: header owns title on desktop (lg:hidden on page levels)

#### S6 — Tier C + Tier D
- RouteFlow in DashboardLayout — 4-tier fallback pipeline visual with animated packet
- Providers Search/Filter — search input + type filter (OAuth / API Key / Compatible) with dynamic filtering
- Onboarding: 4 text-400 refs converted to tokens
- Playground + Search-tools: verified no raw text-400
- Systemic CSS rule in place for remaining class-based usages

#### S7 — Icons + Copyright Safe
- Font Awesome free CDN available for icon replacement
- Replace material-symbols-outlined with fa-brands for provider logos (fa-openai, fa-anthroplic, etc.)
- ProviderCard/ApiKeyProviderCard use fa-brands for logos
- All changes local/uncommitted
- Using open-source Font Awesome (free CDN)
- No copyrighted OmniRoute material redistributed

### BACKLOG B1–B11 ALL RESOLVED

B1: npm install + .env + stray dir  
B2: palette + logo + tokens  
B3: Shell + ⌘K palette  
B4: .text-primary shim  
B5: 6 CSS var aliases  
B6: light-mode 400→600 remap  
B7: removed [class*="text-primary"]  
B8: 32 locale password hints  
B9: dark mode verified  
B10: Node 24 capability-based  
B11: breadcrumbs depth≥3  

### PRODUCTION VERIFIED
- 7 consecutive BUILD_EXIT=0
- `npm run build` + `npm run start` verified
- Palette: Aqua #22D3C5, Royal Purple #7C3AED, Midnight #19172E
- Systemic CSS contrast remap in globals.css
- Dark mode verified
- All changes local/uncommitted

### REMAINING: S8 (.exe packaging)
- Requires VS C++ Build Tools (currently missing; vswhere empty)
- Not part of the core UI redesign
- Can be addressed after redesign completion

### KEY FILES MODIFIED
- `src/app/globals.css` — palette tokens, radii, motion, contrast remap, var aliases
- `src/shared/components/primitives.tsx` — design-system primitives
- `src/shared/components/Header.tsx` — single source of page identity, route→title map
- `src/shared/components/motion.tsx` — motion components
- `src/shared/components/layouts/DashboardLayout.tsx` — RouteFlow integration, ⌘K palette
- `src/app/(dashboard)/dashboard/providers/page.tsx` — search/filter UI
- `src/app/(dashboard)/dashboard/health/page.tsx` — JS string fixes
- `src/app/(dashboard)/dashboard/logs/AuditLogTab.tsx` — badge color tokens
- `src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx` — endpoint restyling
- `src/app/(dashboard)/dashboard/settings/page.tsx` — settings tab restyling
- `src/app/(dashboard)/dashboard/settings/components/AppearanceTab.tsx` — aqua preset added
- `src/shared/components/Ui/RouteFlow.tsx` — 4-tier routing pipeline visual
- `C:\dev\omniroute-app\src\i18n\messages\en.json` — 32 locale password hints fixed

### COPYRIGHT SAFE
- All changes local/uncommitted in C:\dev\omniroute-app
- Using open-source Font Awesome (free CDN available)
- No copyrighted OmniRoute material redistributed
- Original palette tokens preserved
- New icons from free libraries, not copied

### ONE-DRIVE LOCATION
- Redesign work originally in C:\dev\omniroute-app
- This plan.md file resides in C:\Users\ghtni\OneDrive\Desktop\NITINxENGG\OmniRoute App\omniroute\ for reference