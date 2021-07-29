import React, { useMemo } from 'react';
import { PageHeader, TabPaneProps } from 'antd';

import { TabsComponent } from '../../components/utils';

import { Account } from '../../components/MyAccount';

const MyAccount = () => {
    const tabs: TabPaneProps[] = useMemo(
        () => [
            {
                tabKey: 'my-account',
                tab: 'My account',
                children: <Account />,
            },
            {
                tabKey: 'references',
                tab: 'References',
                children: <p>References tab.</p>,
            },
        ],
        []
    );
    return (
        <div>
            <PageHeader title='My Account' />
            <TabsComponent tabs={tabs} />
        </div>
    );
};

export default MyAccount;
