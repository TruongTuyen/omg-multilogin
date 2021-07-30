import React from 'react';
import { PageHeader } from 'antd';

import { Timezone as TimezoneComponent } from '../../components/Timezone';

export default function Timezone() {
    return (
        <div>
            <PageHeader title='Timezone' />
            <TimezoneComponent />
        </div>
    );
}
