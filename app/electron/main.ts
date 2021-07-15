import { app, Tray, ipcMain } from 'electron'

import { creatAppTray } from './tray'

const puppeteer = require("puppeteer");
const locateChrome = require('locate-chrome');



$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

app.allowRendererProcessReuse = true

const appLock = app.requestSingleInstanceLock()

if (!appLock) {
	// 作为第二个实例运行时, 主动结束进程
	app.quit()
}

app.on('second-instance', () => {
	// 当运行第二个实例时, 打开或激活首页
	$tools.createWindow('Home')
})

app.on('ready', () => {
	tray = creatAppTray()
	$tools.createWindow('Home')
})

app.on('activate', () => {
	if (process.platform == 'darwin') {
		$tools.createWindow('Home')
	}
})

app.on('window-all-closed', () => {
	// if (process.platform !== 'darwin') {
	//   app.quit()
	// }
})

app.on('before-quit', () => {
	$tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)

	if (process.platform === 'win32') {
		tray.destroy()
	}
})



var test2 = async function () {
	const userDataPath = app.getPath('userData');
	const chromePath = await new Promise(resolve => locateChrome(arg => resolve(arg)));
	console.log('Chrome path: ', chromePath);
	console.log('User data path: ', userDataPath);
	//console.log("executablePath: ", executablePath);
	//const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
	const browser = await puppeteer.launch({
		//executablePath: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
		executablePath: chromePath,
		headless: false,
		args: [
			'--window-size=1200,800',
			'--user-data-dir=' +userDataPath+ '/Chromium/',
			'--profile-directory=ProfileDev',
		],
		defaultViewport: null,
		ignoreDefaultArgs: ["--enable-automation"],
	});
	console.log(await browser.version());
	//const page = await browser.newPage();
	var page = (await browser.pages())[0];
	await page.setDefaultNavigationTimeout(0);
	const pageClient = page["_client"];

	// http://api.ipify.org/
	await page.goto(
		"https://whoer.net/",
		{
			waitUntil: "networkidle0",
			timeout: 0,
		}
	);
	
};

ipcMain.on('runCommand', async (event, arg) => {
	console.log('event: ', event);
	console.log('arg: ', arg);
	test2()
});

