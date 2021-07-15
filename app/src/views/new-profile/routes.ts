const routes: RouteConfig[] = [
	{
		key: 'NewProfile',
		path: '/new-profile',
		windowOptions: {
			title: 'New Profile',
			resizable: false,
			minimizable: false,
			maximizable: false,
			fullscreenable: false,
			width: 300,
			height: 240,
			vibrancy: 'fullscreen-ui',
		},
		createConfig: {
			showTitlebar: true,
			hideMenus: true,
		},
	},
]

export default routes
