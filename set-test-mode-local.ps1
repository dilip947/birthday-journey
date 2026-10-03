param([switch]$On)

$path = Join-Path $PSScriptRoot "lib\testMode.ts"

if ($On) {
    $value = "true"
} else {
    $value = "false"
}

$text = "export const TEST_MODE = $value;"

[System.IO.File]::WriteAllText(
    $path,
    $text + [Environment]::NewLine,
    (New-Object System.Text.UTF8Encoding($false))
)

Write-Host ""
if ($On) {
    Write-Host "LOCAL TEST MODE: ON" -ForegroundColor Green
    Write-Host "All days are unlocked."
} else {
    Write-Host "LOCAL TEST MODE: OFF" -ForegroundColor Yellow
    Write-Host "Normal date-based unlocking is active."
}
Write-Host ""
Write-Host "Next.js dev server has NOT been stopped."
Write-Host "No .next folder was deleted."