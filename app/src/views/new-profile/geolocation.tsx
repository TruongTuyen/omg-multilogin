import React from 'react';
import { PageHeader } from 'antd';

import { Geolocation as GeolocationComponent } from '../../components/Geolocation';

export default function Geolocation() {
    return (
        <div>
            <PageHeader title='Geolocation' />
            <GeolocationComponent />
        </div>
    );
}
