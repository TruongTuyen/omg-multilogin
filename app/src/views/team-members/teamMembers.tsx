import React from 'react';
import { PageHeader } from 'antd';

import Members from '../../components/Members';

export default class TeamMembers extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <PageHeader title='Team members' />
                <Members />
            </div>
        );
    }
}
