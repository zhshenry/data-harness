# dev.ps1 - start an isolated data-harness instance.
# Runs repo source and keeps data inside the repo's .dsh directory.
# Sets DSH_HOME for this process only; never persist it (do not use setx).
$env:DSH_HOME = Join-Path $PSScriptRoot ".dsh"
pnpm dsh web --port 3090
