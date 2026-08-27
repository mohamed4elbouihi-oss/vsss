import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { dirs } from './dirs.ts';

const root = path.resolve(import.meta.dirname, '..', '..');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

for (const dir of dirs) {
    if (dir === '') continue;
    const targetDir = path.join(root, dir);
    const pkgJson = path.join(targetDir, 'package.json');
    const nodeModules = path.join(targetDir, 'node_modules');
    if (!fs.existsSync(pkgJson)) {
        continue;
    }
    if (fs.existsSync(nodeModules)) {
        console.log(`[${dir}] node_modules already exists. Skipping.`);
        continue;
    }
    console.log(`\n[${dir}] Installing dependencies (--ignore-scripts)...`);
    const res = child_process.spawnSync(npm, ['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
        cwd: targetDir,
        stdio: 'inherit',
        shell: true,
        env: process.env,
    });
    if (res.status !== 0) {
        console.warn(`Warning: npm install in ${dir} exited with status ${res.status}`);
    }
}
console.log('\nAll missing directories installed!');
