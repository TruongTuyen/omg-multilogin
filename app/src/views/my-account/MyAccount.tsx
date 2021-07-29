import React, { useMemo } from 'react';
import { PageHeader, TabPaneProps } from 'antd';
import styled from 'styled-components';

import { TabsComponent } from '../../components/utils';

import { Account } from '../../components/MyAccount';

const Container = styled.div`
    .ant-tabs-tab {
        padding: 16px 24px;
    }
`;

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
                children: <p>references</p>,
            },
        ],
        []
    );
    return (
        <Container>
            <PageHeader title='My Account' />
            <TabsComponent tabs={tabs} />
        </Container>
    );
};

export default MyAccount;
