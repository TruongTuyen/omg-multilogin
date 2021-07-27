import React from 'react';
import styled from 'styled-components';

import { SectionControl, DataTable } from './components';

const Container = styled.div`
    padding: 0 1.5rem 1.5rem;
`;

export default class Group extends React.Component {
    render() {
        return (
            <Container>
                <SectionControl />
                <DataTable />
            </Container>
        );
    }
}
