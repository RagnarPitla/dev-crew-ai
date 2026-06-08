const { _electron: electron } = require('playwright');
const path = require('path');

(async () => {
  const appPath = path.resolve(__dirname, '..', 'out', 'main', 'index.js');
  const electronApp = await electron.launch({ args: [appPath] });
  const page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({ path: path.resolve(__dirname, 'dev-crew-welcome.png'), fullPage: true });

  await page.getByRole('button', { name: /skip to demo workspace/i }).click();
  await page.waitForSelector('.terminal-grid-panel', { timeout: 10000 });
  await page.screenshot({ path: path.resolve(__dirname, 'dev-crew-terminal-grid.png'), fullPage: true });

  const firstRunButton = page.locator('.terminal-pane').first().getByRole('button', { name: /^run$/i });
  await firstRunButton.click();
  await page.waitForSelector('.terminal-pane.success, .terminal-pane.danger', { timeout: 150000 });
  await page.screenshot({ path: path.resolve(__dirname, 'dev-crew-command-result.png'), fullPage: true });

  const title = await page.title();
  const terminalText = await page.locator('.terminal-grid-panel').innerText();
  console.log(JSON.stringify({ title, hasTerminalGrid: terminalText.includes('Terminal Pane Grid'), hasEvidenceCopy: terminalText.includes('Attach this output') || terminalText.includes('Send back') }, null, 2));
  await electronApp.close();
})();
