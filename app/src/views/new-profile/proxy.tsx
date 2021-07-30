import React from 'react';
import { PageHeader } from 'antd';

import { Proxy as ProxyComponent } from '../../components/Proxy';

export default function Proxy() {
    return (
        <div>
            <PageHeader title='Proxy' />
            <ProxyComponent />
        </div>
    );
}
