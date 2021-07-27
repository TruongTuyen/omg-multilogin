import React from 'react';
import styled from 'styled-components';

import { SectionControl } from './components';

const Container = styled.div`
    padding: 0 16px 16px;
`;

export default class Group extends React.Component {
    render() {
        return (
            <Container>
                <SectionControl />
            </Container>
        );
    }
}
