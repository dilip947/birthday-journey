$path = Join-Path $PSScriptRoot "lib\testMode.ts"

if (-not (Test-Path $path)) {
    Write-Host "ERROR: lib\testMode.ts was not found." -ForegroundColor Red
    exit 1
}

$enabled = $args -contains "-On"
$value = if ($enabled) { "true" } else { "false" }

$text = "export const TEST_MODE = $value;"

[System.IO.File]::WriteAllText(
    $path,
    $text,
    (New-Object System.Text.UTF8Encoding($false))
)

if ($enabled) {
    Write-Host ""
    Write-Host "LOCAL TEST MODE: ON" -ForegroundColor Green
    Write-Host "All test-mode features are enabled."
}
else {
    Write-Host ""
    Write-Host "LOCAL TEST MODE: OFF" -ForegroundColor Yellow
    Write-Host "Normal date-based unlocking is active."
}

Write-Host ""
Write-Host "Next.js dev server has NOT been stopped."
Write-Host "No .next folder was deleted."