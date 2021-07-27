import React from 'react';
import { Checkbox, Button } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

interface BulkActionProp {
    onChange?: () => void;
    checked: boolean | undefined;
}

export class BulkAction extends React.Component<BulkActionProp> {
    render() {
        const { children, checked = false, onChange } = this.props;
        return (
            <Container>
                <Checkbox checked={checked} onClick={onChange} />
                <Button
                    type='link'
                    children={checked ? 'Deselect All' : 'Select All'}
                    onClick={onChange}
                />
                {children}
            </Container>
        );
    }
}
