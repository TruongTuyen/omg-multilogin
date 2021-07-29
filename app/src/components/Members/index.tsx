import React from 'react';
import styled from 'styled-components';

import { Header, DataTable } from './components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid #dcdcdc;
    padding: 24px 35px;
`;

export default class Members extends React.Component {
    render() {
        return (
            <Container>
                <Header />
                <DataTable />
            </Container>
        );
    }
}
