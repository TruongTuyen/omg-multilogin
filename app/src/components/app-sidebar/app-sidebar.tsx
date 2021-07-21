import React from 'react';
import { Tooltip } from 'antd';

import AppSideMenus from './side-menus.json';
import './app-sidebar.less';

interface SideMenuItem {
    key: string;
    href: string;
    title: string;
    icon: string;
}

interface State {
    activeMenuKey: string;
}

export class AppSidebar extends React.Component<unknown, State> {
    state: State = {
        activeMenuKey: AppSideMenus[0]?.key,
    };

    componentDidMount(): void {
        window.addEventListener('router-update', this.onRouterUpdate);
    }

    onRouterUpdate = (e: CustomEventMap['router-update']): void => {
        const routeProps: PageProps = e.detail;
        this.setState({ activeMenuKey: routeProps.name });
    };

    render(): JSX.Element {
        return (
            <div className='app-sidebar'>
                <div className='app-sidebar-wrap'>
                    <div className='flex center app-sidebar-header'>
                        <img width='40' src={$tools.APP_ICON} />
                    </div>

                    <div className='flex column side-menu'>
                        <div className='side-quick-actions'>
                            <h3 className='side-title'>Brower profile</h3>
                            <div className='side-actions'>
                                <a
                                    className='action-create-new'
                                    href='#/new-profile'
                                >
                                    Create new
                                </a>
                            </div>
                        </div>
                        <ul className='side-menu-ul'>
                            {AppSideMenus.map(this.renderMenuItem)}
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
        return (
            <li key={key} className={`side-menu-list`}>
                <a
                    className={`side-menu-item fs-22 ri-${icon}-${
                        isActive ? 'fill' : 'line'
                    }`}
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
