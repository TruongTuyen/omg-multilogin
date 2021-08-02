import React from 'react';
import { PageHeader } from 'antd';

import { Advanced as AdvancedComponent } from '../../components/Advanced';

export default function Advanced() {
    return (
        <div>
            <PageHeader title='Advanced' />
            <AdvancedComponent />
        </div>
    );
}
