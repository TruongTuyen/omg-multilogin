import React from 'react';
import { PageHeader } from 'antd';

import WrapOverView from '../../components/Overview/components/Overview';

export default function Overview() {
    return (
        <div>
            <PageHeader title='Overview' />
            <WrapOverView />
        </div>
    );
}
