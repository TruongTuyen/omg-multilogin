import React from 'react';
import styled from 'styled-components';

import { SectionFilter, DataTable } from './components';
const Container = styled.div`
    padding: 0 16px 16px;
`;

export default class Profiles extends React.Component {
    render() {
        return (
            <Container>
                <SectionFilter />
                <DataTable />
            </Container>
        );
    }
}
