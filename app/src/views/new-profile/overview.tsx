import React from 'react';
import { PageHeader } from 'antd';

import { Overview as OverviewComponent } from '../../components/Overview';

export default function Overview() {
    return (
        <div>
            <PageHeader title='Overview' />
            <OverviewComponent />
        </div>
    );
}
