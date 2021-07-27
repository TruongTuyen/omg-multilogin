import React from 'react';
import styled from 'styled-components';

import { Header } from './components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    border-top: 1px solid #dcdcdc;
    padding: 24px;
`;

export default class Members extends React.Component {
    render() {
        return (
            <Container>
                <Header />
            </Container>
        );
    }
}
