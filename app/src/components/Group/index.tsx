import React, { Fragment } from 'react';

import { SectionControl, DataTable } from './components';

export default class Group extends React.Component {
    render() {
        return (
            <Fragment>
                <SectionControl />
                <DataTable />
            </Fragment>
        );
    }
}
