$sourceRoot = 'C:\Users\mohamed\AppData\Local\Programs\Microsoft VS Code\110a328ea5\resources\app\node_modules.asar.unpacked'
$destRoot = (Get-Location).Path + '\node_modules'
$repoRoot = (Get-Location).Path

$modules = @(
    @{ Source = '@vscode\sqlite3\build\Release\vscode-sqlite3.node'; Dest = '@vscode\sqlite3\build\Release\vscode-sqlite3.node' },
    @{ Source = '@vscode\spdlog\build\Release\spdlog.node'; Dest = '@vscode\spdlog\build\Release\spdlog.node' },
    @{ Source = '@vscode\policy-watcher\build\Release\vscode-policy-watcher.node'; Dest = '@vscode\policy-watcher\build\Release\vscode-policy-watcher.node' },
    @{ Source = '@vscode\windows-registry\build\Release\winregistry.node'; Dest = '@vscode\windows-registry\build\Release\winregistry.node' },
    @{ Source = '@vscode\windows-mutex\build\Release\CreateMutex.node'; Dest = '@vscode\windows-mutex\build\Release\CreateMutex.node' },
    @{ Source = '@vscode\windows-ca-certs\build\Release\crypt32.node'; Dest = '@vscode\windows-ca-certs\build\Release\crypt32.node' },
    @{ Source = '@vscode\native-watchdog\build\Release\watchdog.node'; Dest = '@vscode\native-watchdog\build\Release\watchdog.node' },
    @{ Source = '@vscode\deviceid\build\Release\windows.node'; Dest = '@vscode\deviceid\build\Release\windows.node' },
    @{ Source = '@vscode\windows-process-tree\build\Release\windows_process_tree.node'; Dest = '@vscode\windows-process-tree\build\Release\windows_process_tree.node' },
    @{ Source = '@vscode\fs-copyfile\build\Release\copyfile.node'; Dest = '@vscode\fs-copyfile\build\Release\copyfile.node' },
    @{ Source = 'kerberos\build\Release\kerberos.node'; Dest = 'kerberos\build\Release\kerberos.node' },
    @{ Source = 'native-is-elevated\build\Release\iselevated.node'; Dest = 'native-is-elevated\build\Release\iselevated.node' },
    @{ Source = 'native-keymap\build\Release\keymapping.node'; Dest = 'native-keymap\build\Release\keymapping.node' },
    @{ Source = 'node-pty\build\Release\conpty.node'; Dest = 'node-pty\build\Release\conpty.node' },
    @{ Source = 'node-pty\build\Release\conpty_console_list.node'; Dest = 'node-pty\build\Release\conpty_console_list.node' },
    @{ Source = 'windows-foreground-love\build\Release\foreground_love.node'; Dest = 'windows-foreground-love\build\Release\foreground_love.node' }
)

foreach ($m in $modules) {
    $src = Join-Path $sourceRoot $m.Source
    $dst = Join-Path $destRoot $m.Dest
    $dstDir = Split-Path -Parent $dst
    if (-not (Test-Path $dstDir)) {
        New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
    }
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dst -Force
        Write-Output ("[OK] Copied " + $m.Dest + " (" + (Get-Item $dst).Length + " bytes)")
    } else {
        Write-Output ("[ERR] Source not found: " + $src)
    }
}

# Also ensure extensions copyfile.node
$gitFsCopy = Join-Path $repoRoot 'extensions\git\node_modules\@vscode\fs-copyfile\build\Release'
New-Item -ItemType Directory -Force -Path $gitFsCopy | Out-Null
Copy-Item (Join-Path $sourceRoot '@vscode\fs-copyfile\build\Release\copyfile.node') (Join-Path $gitFsCopy 'copyfile.node') -Force
Write-Output "[OK] Copied extensions/git fs-copyfile"

# Ensure microsoft-authentication msal-node-runtime.node
$msalSrc = 'C:\Users\mohamed\AppData\Local\Programs\Microsoft VS Code\110a328ea5\resources\app\extensions\microsoft-authentication\dist\msal-node-runtime.node'
$msalDst = Join-Path $repoRoot 'extensions\microsoft-authentication\dist'
if (Test-Path $msalSrc) {
    New-Item -ItemType Directory -Force -Path $msalDst | Out-Null
    Copy-Item $msalSrc (Join-Path $msalDst 'msal-node-runtime.node') -Force
    Write-Output "[OK] Copied extensions/microsoft-authentication msal-node-runtime.node"
}
