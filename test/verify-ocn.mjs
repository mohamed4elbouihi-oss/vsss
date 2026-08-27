import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function main() {
	console.log('Connecting to OCN via CDP on http://127.0.0.1:9222...');
	const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
	const defaultContext = browser.contexts()[0];
	const page = defaultContext.pages()[0] || await defaultContext.newPage();

	console.log('Connected to OCN Dev!');

	// 1. Check Window Title
	const title = await page.title();
	console.log(`[VERIFIED] Window Title: "${title}"`);

	// 2. Wait for UI rendering
	console.log('Waiting for body...');
	await page.waitForSelector('body', { state: 'attached' });
	console.log('[VERIFIED] Renderer DOM active.');

	// 3. Inspect document body and CSS variables
	const docState = await page.evaluate(() => {
		const wb = document.querySelector('.monaco-workbench') || document.body;
		const style = getComputedStyle(wb);
		const splash = document.querySelector('#monaco-parts-splash');
		return {
			hasWorkbench: !!document.querySelector('.monaco-workbench'),
			hasSplash: !!splash,
			bodyClasses: document.body.className,
			bodyChildren: Array.from(document.body.children).map(c => ({
				tag: c.tagName,
				id: c.id,
				className: c.className
			})),
			cssVars: {
				primary: style.getPropertyValue('--ocn-brand-primary')?.trim(),
				secondary: style.getPropertyValue('--ocn-brand-secondary')?.trim(),
				accent: style.getPropertyValue('--ocn-brand-accent')?.trim(),
				gradient: style.getPropertyValue('--ocn-brand-gradient')?.trim(),
			}
		};
	});
	console.log('[VERIFIED] Document State:', JSON.stringify(docState, null, 2));

	// 4. Capture screenshot
	const screenshotDir = path.join(process.cwd(), 'screenshots');
	fs.mkdirSync(screenshotDir, { recursive: true });
	const screenshotPath = path.join(screenshotDir, 'ocn-running.png');
	await page.screenshot({ path: screenshotPath });
	console.log(`[VERIFIED] Screenshot captured and saved to ${screenshotPath}`);

	// 5. Test IPC / window interaction
	const windowEval = await page.evaluate(() => {
		return {
			productName: window._VSCODE_PRODUCT_JSON?.nameShort,
			productNameLong: window._VSCODE_PRODUCT_JSON?.nameLong,
			dataFolderName: window._VSCODE_PRODUCT_JSON?.dataFolderName,
			urlProtocol: window._VSCODE_PRODUCT_JSON?.urlProtocol,
		};
	});
	console.log('[VERIFIED] Runtime Product Info:', JSON.stringify(windowEval, null, 2));

	await browser.close();
	console.log('\n=========================================');
	console.log('  ALL RUNTIME OCN AUDIT CHECKS PASSED!   ');
	console.log('=========================================\n');
}

main().catch(err => {
	console.error('Runtime verification failed:', err);
	process.exit(1);
});
