import React from 'react';

import AppSideMenus from './side-menus.json';
import ProfileSideMenus from './profile-menus.json';
import './app-sidebar.less';

interface SideMenuItem {
    key: string;
    href: string;
    title: string;
    icon?: string;
}

interface State {
    activeMenuKey: string;
    newProfilePath: boolean;
}

const NEW_PROFILE_PATH = '/new-profile';

export class AppSidebar extends React.Component<unknown, State> {
    state: State = {
        activeMenuKey: AppSideMenus[0]?.key,
        newProfilePath: false,
    };

    componentDidMount(): void {
        window.addEventListener('router-update', this.onRouterUpdate);
    }

    onRouterUpdate = (e: CustomEventMap['router-update']): void => {
        const routeProps: PageProps = e.detail;
        const routePath = routeProps?.match?.path;
        const newProfilePath = routePath.startsWith(NEW_PROFILE_PATH);
        this.setState({ activeMenuKey: routeProps.name, newProfilePath });
    };

    render(): JSX.Element {
        //
        const { newProfilePath } = this.state;

        return (
            <div className='app-sidebar'>
                <div className='app-sidebar-wrap'>
                    <div className='flex center app-sidebar-header'>
                        <img width='40' src={$tools.APP_ICON} />
                    </div>

                    <div className='flex column side-menu'>
                        <div className='side-quick-actions'>
                            {newProfilePath ? (
                                <>
                                    <a
                                        href='#/profiles'
                                        style={{ color: '#fff' }}
                                    >
                                        <i className='ri-home-3-fill fs-30'></i>
                                    </a>
                                    <h3 className='side-title'>
                                        New brower profile
                                    </h3>
                                </>
                            ) : (
                                <>
                                    <h3 className='side-title'>
                                        Brower profile
                                    </h3>
                                    <div className='side-actions'>
                                        <a
                                            className='action-create-new'
                                            href='#/new-profile'
                                        >
                                            Create new
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                        <ul className='side-menu-ul'>
                            {newProfilePath
                                ? ProfileSideMenus.map(this.renderMenuItem)
                                : AppSideMenus.map(this.renderMenuItem)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    renderMenuItem = ({
        key,
        icon,
        title,
        href,
    }: SideMenuItem): JSX.Element => {
        const { activeMenuKey } = this.state;
        const isActive = activeMenuKey === key;

        const iconClassName = icon
            ? `has-icon ri-${icon}-${isActive ? 'fill' : 'line'}`
            : '';

        return (
            <li key={key} className={`side-menu-list`}>
                <a
                    className={`side-menu-item fs-22 ${iconClassName}`}
                    style={{ color: isActive ? '#fff' : '' }}
                    href={href}
                >
                    <span className={'menu-item-name'}>{title}</span>
                </a>
            </li>
        );
    };

    componentWillUnmount(): void {
        window.removeEventListener('router-update', this.onRouterUpdate);
    }
} // class AppSidebar end
