import React from 'react';
import { PageHeader, TabPaneProps } from 'antd';

import GroupComponent from '../../components/Group';
import { TabsComponent } from '../../components/utils';
import {
    TabUnassigned,
    TabAllProfiles,
} from '../../components/Profiles/components';

import './profiles.less';

export default class Profiles extends React.Component<PageProps> {
    private tabs: TabPaneProps[] = [
        {
            tabKey: 'all-profiles',
            tab: 'All profiles',
            children: <TabAllProfiles />,
        },
        {
            tabKey: 'groups',
            tab: 'Groups',
            children: <GroupComponent />,
        },
        {
            tabKey: 'unassigned',
            tab: 'Unassigned',
            children: <TabUnassigned />,
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
