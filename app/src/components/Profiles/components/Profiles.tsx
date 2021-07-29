import React from 'react';
import styled from 'styled-components';

import { SectionFilter } from './SectionFilter';
import { DataTable } from './DataTable';

interface ProfilesProps {
    data: any[];
    isUnassigned?: boolean;
    header?: React.ReactNode;
}

const Container = styled.div`
    .header-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 0.5rem;
        margin-top: 1rem;
        color: #3e82db;
        font-weight: 600;
    }
`;

export default class Profiles extends React.Component<ProfilesProps> {
    render() {
        const { data, isUnassigned, header } = this.props;
        return (
            <Container>
                <SectionFilter />
                {isUnassigned && (
                    <div className='header-wrap'>
                        <i className='ri-folder-fill fs-18'></i>
                        {header}
                    </div>
                )}
                <DataTable data={data} />
            </Container>
        );
    }
}
