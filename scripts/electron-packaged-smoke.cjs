const { _electron: electron } = require('playwright');
const path = require('path');

(async () => {
  const exePath = path.resolve(__dirname, '..', 'release', 'win-unpacked', 'Dev Crew AI.exe');
  const electronApp = await electron.launch({ executablePath: exePath, args: [] });
  const page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: /skip to demo workspace/i }).click();
  await page.waitForSelector('.terminal-grid-panel', { timeout: 10000 });
  await page.locator('.terminal-pane').first().getByRole('button', { name: /^run$/i }).click();
  await page.waitForSelector('.terminal-pane.success, .terminal-pane.danger', { timeout: 150000 });
  const terminalText = await page.locator('.terminal-grid-panel').innerText();
  console.log(JSON.stringify({
    packagedLaunch: true,
    hasTerminalGrid: terminalText.includes('Terminal Pane Grid'),
    commandCompleted: terminalText.includes('Completed') || terminalText.includes('Needs review'),
  }, null, 2));
  await electronApp.close();
})();
