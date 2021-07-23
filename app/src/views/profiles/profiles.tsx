import React from 'react';
import { PageHeader, TabPaneProps } from 'antd';

import { TabsComponent } from '../../components/utils';
import ProfilesComponent from '../../components/Profiles';

import './profiles.less';

export default class Profiles extends React.Component<PageProps> {
    private tabs: TabPaneProps[] = [
        {
            tabKey: 'all-profiles',
            tab: 'All profiles',
            children: <ProfilesComponent />,
        },
        {
            tabKey: 'groups',
            tab: 'Groups',
            children: <p>Groups content</p>,
        },
        {
            tabKey: 'unassigned',
            tab: 'Unassigned',
            children: <p>Unassigned content</p>,
        },
    ];

    render(): JSX.Element {
        return (
            <div className='profiles-wrap'>
                <PageHeader title='All Profiles' />
                <TabsComponent tabs={this.tabs} />
            </div>
        );
    }
}
