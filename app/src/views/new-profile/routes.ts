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
    {
        key: 'Overview',
        path: '/new-profile/overview',
        createConfig: {
            showTitlebar: true,
            hideMenus: true,
        },
    },
    {
        key: 'Proxy',
        path: '/new-profile/proxy',
        createConfig: {
            showTitlebar: true,
            hideMenus: true,
        },
    },
    {
        key: 'Timezone',
        path: '/new-profile/timezone',
        createConfig: {
            showTitlebar: true,
            hideMenus: true,
        },
    },
    {
        key: 'WebRTC',
        path: '/new-profile/webRTC',
        createConfig: {
            showTitlebar: true,
            hideMenus: true,
        },
    },
    {
        key: 'Geolocation',
        path: '/new-profile/geolocation',
        createConfig: {
            showTitlebar: true,
            hideMenus: true,
        },
    },
    {
        key: 'Advanced',
        path: '/new-profile/advanced',
        createConfig: {
            showTitlebar: true,
            hideMenus: true,
        },
    },
];

export default routes;
