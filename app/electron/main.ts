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
		env: {
			TZ: 'Australia/Melbourne', // Asia/Singapore.. List timezone from: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
		}
	});

	const context = browser.defaultBrowserContext()
	await context.overridePermissions("https://findmylocation.org", ['geolocation'])


	console.log(await browser.version());
	//const page = await browser.newPage();
	var page = (await browser.pages())[0];
	await page.setDefaultNavigationTimeout(0);
	// await page.emulateTimezone('America/Chicago'); // https://source.chromium.org/chromium/chromium/deps/icu.git/+/faee8bc70570192d82d2978a71e2a615788597d1:source/data/misc/metaZones.txt
	const pageClient = page["_client"];

	// await page.setGeolocation({latitude:21.01153, longitude:105.78524})
	// Fake location 
	await page.setGeolocation({latitude:37.64400, longitude:-97.34800})

	// Fake canvas fingerprint
	// Check result at: https://browserleaks.com/canvas
	
	await page.evaluateOnNewDocument(() => {
        const originalFunction = HTMLCanvasElement.prototype.toDataURL;
        HTMLCanvasElement.prototype.toDataURL = function (type) {
            if (type === 'image/png' && this.width === 220 && this.height === 30) {
                // this is likely a fingerprint attempt, return fake fingerprint
				
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAAAeCAAAAABiES/iAAACeElEQVRYw+2YzUtUURjGf47OmDPh5AyFomUiEeEmyghXtWsh4dcswlYV2KYWfZh/QRBUVLhTCCJXEgmKUCIkFhJREARBkbkyKBlTRmUC82lxZ7z3TjM4whwXwz2ry3vO87znx33Pey4XFfHAg/PgPDgPzoPz4Dy4rFIKscSkAfmnsUY+iTfXFhxue4Zm4QpfaKbg8k+EsZNsGG6iNVzRMrkZeRPmjp6eCgcae5f+3wJIgtWLldG+DUnfzoail1etaVsEa1f2lUqw2hPd3T7nCrkMtlkQ24YDwP8+FZkI+gY3uq2cTcu54GIA/dJCDUAnSE4RdAESdALUxZ0hl4E5OMs49iE528E5a+cj5YFhDVI3vLA2c4K+zLXpvR37tNRDs3STg1OJqXqQSwS14wlJUD+VeHWAW86Qy8BwQ5Ek/WK/JBgqC72UTvJakmY5lAvurTRPSDrMmKRRcIvgeUo2KmmEI86Qy8DwmVu/ezQIBCSBLzwjKZhujv5cZZmUNkAq57ekRXCLYDG12pre5Qy5DAzDXbPfIOB/JqmCzNafCZd+dMA5RfZxdsBlNTAMF+FJfD2eSvSI0iGpmXe5GnbG3qyyHAO3yCZxlGV2uBLWDcJVMZKc7UrnfIBvQI+pHpxbS34ZaNkK7gYN0yvTDSCXyCZxNJTscFFe/DUH1w3QvpnzPiUPdTXfsvxZDdBGmeQU2SQd9lWQHS5m9J6Ln4/suZCwc96D25qM1formq5/3ApOX1uDkZ7P7JXkENkkK5eqQm3flRtuvitSYgCucKOf0zv01bazcG3Tyz8GKukvSjjrlB3/U5Rw42dqAo29yypKOO8figeX1/gH+zX9JqfOeUwAAAAASUVORK5CYII=';
            }
            // otherwise, just use the original function
            return originalFunction.apply(this);
        };
    });

	// Fake user-agent
	// To generate a random userAgen: https://www.npmjs.com/package/user-agents
	const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' + 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
	await page.setUserAgent(userAgent);

	// Pass the Webdriver Test.
	await page.evaluateOnNewDocument(() => {
		Object.defineProperty(navigator, 'webdriver', {
			get: () => false,
		});
	});

	// Pass the Chrome Test.
	/*
	await page.evaluateOnNewDocument(() => {
		// We can mock this in as much depth as we need for the test.
		window.navigator.chrome = {
			runtime: {},
		// etc.
		};
	});
	*/

	// Pass the Permissions Test.
	/*
	await page.evaluateOnNewDocument(() => {
		const originalQuery = window.navigator.permissions.query;
		return window.navigator.permissions.query = (parameters) => ( parameters.name === 'notifications' ? Promise.resolve({ state: Notification.permission }) : originalQuery(parameters));
	}); */

	// Pass the Plugins Length Test.
	/*
	await page.evaluateOnNewDocument(() => {
		// Overwrite the `plugins` property to use a custom getter.
		Object.defineProperty(navigator, 'plugins', {
			// This just needs to have `length > 0` for the current test,
			// but we could mock the plugins too if necessary.
			get: () => [1, 2, 3, 4, 5],
		});
	}); */
	
	  // Pass the Languages Test.
	  /*
	await page.evaluateOnNewDocument(() => {
		// Overwrite the `plugins` property to use a custom getter.
		Object.defineProperty(navigator, 'languages', {
			get: () => ['en-US', 'en'],
		});
	}); */

	// http://api.ipify.org/
	await page.goto(
		"https://getip.pro/",
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

ipcMain.on('get_data', (event, arg) => {
	console.log('Args: ', arg);
	test2();
	setInterval(() => {
		event.reply('asynchronous-reply', 'pong')
	}, 2000);
});

