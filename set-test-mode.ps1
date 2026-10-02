param(
    [switch]$On
)

$mode = if ($On) { "true" } else { "false" }

$files = @(
    "app\week\page.tsx",
    "app\week\[day]\page.tsx",
    "app\week\fun\mines\page.tsx"
)

$utf8 = New-Object System.Text.UTF8Encoding($false)

foreach ($path in $files) {
    if (Test-Path $path) {
        $text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

        $text = $text.Replace(
            'const TEST_MODE = true;',
            "const TEST_MODE = $mode;"
        )

        $text = $text.Replace(
            'const TEST_MODE = false;',
            "const TEST_MODE = $mode;"
        )

        [System.IO.File]::WriteAllText($path, $text, $utf8)
    }
}
