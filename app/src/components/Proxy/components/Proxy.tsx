import React from 'react';
import { Alert } from 'antd';
import styled from 'styled-components';

import { Layout } from '../../Profiles';
import { ProxyForm } from './Form';

const Container = styled.div`
    padding-top: 1rem;

    .ant-alert {
        border: 0;
        background-color: transparent;
        padding-left: 0;
    }
`;

export const Proxy = () => {
    return (
        <Layout>
            <Container>
                <Alert
                    type='info'
                    showIcon
                    message='A proxy masks the IP address of a browser profile.'
                />
                <ProxyForm />
            </Container>
        </Layout>
    );
};
