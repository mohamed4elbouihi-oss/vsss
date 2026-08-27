import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { dirs } from './dirs.ts';

const root = path.resolve(import.meta.dirname, '..', '..');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

console.log(`Installing dependencies across all ${dirs.length} directories...`);

for (const dir of dirs) {
    const targetDir = path.join(root, dir);
    const pkgJson = path.join(targetDir, 'package.json');
    if (!fs.existsSync(pkgJson)) {
        continue;
    }
    if (dir === '' || dir === 'extensions/copilot' || dir === 'extensions') {
        // already done
        continue;
    }
    console.log(`\n[${dir || '.'}] Running npm install...`);
    const res = child_process.spawnSync(npm, ['install', '--no-audit', '--no-fund'], {
        cwd: targetDir,
        stdio: 'inherit',
        shell: true,
        env: process.env,
    });
    if (res.status !== 0) {
        console.warn(`Warning: npm install in ${dir} exited with status ${res.status}`);
    }
}
console.log('\nAll subdirectories processed!');
