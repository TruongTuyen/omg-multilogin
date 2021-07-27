import React from 'react';
import { PageHeader } from 'antd';

export default class TeamMembers extends React.Component {
    render(): JSX.Element {
        console.log('team-members');
        return (
            <div>
                <PageHeader title='Team members' />
            </div>
        );
    }
}
