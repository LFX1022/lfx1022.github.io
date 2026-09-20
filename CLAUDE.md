# Memory

## Session Start Routine
At the start of every new work session on this project, before starting any requested task:
1. Run `git fetch origin` then check sync status (`git status`, and compare `main` vs `origin/main` with `git log --oneline main..origin/main` / `origin/main..main`). Report whether local is ahead/behind/in sync, and whether the worktree is clean.
2. Read the most recent entry in "LFX.com Work Notes" below and summarize it for the user before proceeding.

## LFX.com Work Notes
- 2026-08-14: Checked GitHub sync. Local `main` was behind `origin/main` by 4 commits; fast-forwarded to `d423fd1`.
- Verified `HEAD == origin/main` after update and worktree was clean.
- `npm run build` is blocked by PowerShell `npm.ps1` execution policy; use `npm.cmd run build`.
- Build passed. It regenerates `public/archives/triumph-daytona-archive` output and can dirty the worktree; restore tracked archive output and delete the new `_next/static/<build-id>/` folder if only verifying sync.

- 2026-08-14: Optimized mobile model interaction. `Daytona660ThreeModel` now lets canvas own touch gestures for one-finger orbit/two-finger zoom; `Motorcycle360` uses ref-backed drag state for more reliable swipe. `npm.cmd run build` passed; archive build output was cleaned back out. User later pasted unrelated CAD/model images by mistake; ignore for site work.

- 2026-09-07: Fixed slow mobile page load, in 3 commits pushed to `origin/main` (`717b326`, `02e1dd4`, `d9a4a26`):
  - Compressed oversized images in place (resize >2000px longest edge, mozjpeg q78 / PNG palette q85). `public/images` 149MB→25.6MB; Daytona archive source images (`archives/triumph-daytona-archive/public/images/models`) 6.2MB→2.3MB. Sampled quality checks looked fine at web sizes. Script used `sharp` (installed with `--no-save`, not a persisted devDependency — reinstall if this needs repeating).
  - `public/images` still has ~174MB of uncompressed video (`.mp4`/`.mov`, one file 68MB) — not touched, this machine has no `ffmpeg`. Biggest remaining mobile-load lever if revisited.
  - Story cards' `<video autoPlay>` was mounting/loading eagerly for every story regardless of scroll position. Extracted `components/LazyVideo.tsx` (IntersectionObserver, 600px rootMargin, same pattern as `Motorcycle360`) and wired it into `components/sections/SelectedWorks.tsx`.
  - Added BIM full name ("Building Information Modeling，建築資訊模型") to the "03 / 工作與 BIM" paragraph in `data/profile.ts` — first and only place it's spelled out.
  - Known issue, deferred by user (not fixed): `public/images/motorcycles/daytona660/Daytona660360/*.PNG` (all 36 frames) are actually browser screenshots of the Triumph official site's 360 configurator, including the user's own browser tab bar — not real product photos. Currently live on the site's Daytona 660 360° viewer.
  - Operational note: don't run `npm.cmd run build` while `npm run dev` is also running against the same working tree — it clobbers the dev server's `.next` cache and the dev server starts 404ing until restarted (had to `rm -rf .next` and restart; picked up port 3001 since 3000 was stuck).

- 2026-09-20: Fixed sideways photos + cut first-load payload; pushed to `origin/main`.
  - `IMG_9573.jpg` (小豆腐 #1), `IMG_1720.JPG` (展間的 Merlot) and its unused duplicate `660250102.JPG` were stored with landscape pixels and no EXIF (already so before the 09-07 compression), so browsers showed them lying on their side. Rotated 90° CW from the pre-compression originals in git (`717b326^`) and re-encoded with the same 2000px / mozjpeg q78 settings. Checked every other image via contact sheets — none else sideways.
  - First-load audit (cold cache, no scroll) was ~6MB+: two autoplay videos fetched in full (`IMG_4147.mp4` 2.6MB, `250110.mp4` 1.4MB), 13 below-fold `<link rel=preload>` images from `priority` props and the Panigale `<img>` gallery, plus `JournalCarousel`'s mount-time neighbour prefetch. Now 4 requests / 534KB (hero textures only). Fixes: removed below-fold `priority`, `loading="lazy"` on `DreamGarageGallery` imgs, `LazyVideo` (now supports `fit: "contain"`) for the journal + setup finale videos, IntersectionObserver gate on the journal prefetch.
  - Root cause of "site still slow" is GitHub Pages itself from Taiwan: ~50KB/s via Fastly SIN vs ~1.6MB/s from Cloudflare CDN (measured with curl). Moving the static export to Cloudflare Pages is the remaining big lever — not done, user's call.
  - Windows Firewall blocks LAN access to `next dev` (network profile is Public, no inbound rule for node.exe); needs an elevated `New-NetFirewallRule` for TCP 3000 if the Mac should preview. Chrome extension can't screenshot / trigger lazy-load in a background tab — bring the tab to the front before measuring.
