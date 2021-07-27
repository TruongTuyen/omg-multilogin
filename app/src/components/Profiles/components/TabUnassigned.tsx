import React from 'react';

import Profiles from './Profiles';

import PROFILES from '../../../data/profiles.json';

interface TabUnassignedState {
    data: any[];
}

export class TabUnassigned extends React.Component<any, TabUnassignedState> {
    state: TabUnassignedState = {
        data: [],
    };

    componentDidMount() {
        const data = [...PROFILES];
        const unAssigned = data?.filter((i) => !i.assigned);
        this.setState({ data: unAssigned });
    }

    render() {
        const { data } = this.state;

        const count = data?.length > 0 ? `(${data.length})` : '';
        const headerMarkup = <span>{`Unassigned ${count}`}</span>;
        return <Profiles data={data} isUnassigned header={headerMarkup} />;
    }
}
