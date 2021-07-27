import React from 'react';

import Profiles from './Profiles';

import PROFILES from '../../../data/profiles.json';

interface TabAllProfilesState {
    data: any[];
}

export class TabAllProfiles extends React.Component<any, TabAllProfilesState> {
    state: TabAllProfilesState = {
        data: [],
    };

    componentDidMount() {
        const data = [...PROFILES];
        this.setState({ data });
    }

    render() {
        const { data } = this.state;
        return <Profiles data={data} />;
    }
}
