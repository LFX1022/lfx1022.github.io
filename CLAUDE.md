# Memory

## LFX.com Work Notes
- 2026-08-14: Checked GitHub sync. Local `main` was behind `origin/main` by 4 commits; fast-forwarded to `d423fd1`.
- Verified `HEAD == origin/main` after update and worktree was clean.
- `npm run build` is blocked by PowerShell `npm.ps1` execution policy; use `npm.cmd run build`.
- Build passed. It regenerates `public/archives/triumph-daytona-archive` output and can dirty the worktree; restore tracked archive output and delete the new `_next/static/<build-id>/` folder if only verifying sync.

- 2026-08-14: Optimized mobile model interaction. `Daytona660ThreeModel` now lets canvas own touch gestures for one-finger orbit/two-finger zoom; `Motorcycle360` uses ref-backed drag state for more reliable swipe. `npm.cmd run build` passed; archive build output was cleaned back out. User later pasted unrelated CAD/model images by mistake; ignore for site work.
