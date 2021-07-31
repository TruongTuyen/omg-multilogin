import React from 'react';
import { PageHeader } from 'antd';

import { WebRTC as WebRTCComponent } from '../../components/WebRTC';

export default function WebRTC() {
    return (
        <div>
            <PageHeader title='WebRTC' />
            <WebRTCComponent />
        </div>
    );
}
