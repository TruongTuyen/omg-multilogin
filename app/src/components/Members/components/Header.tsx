import React from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';

import FormMember from './Form';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .ant-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 0.5rem;
        padding: 0;
    }
`;

interface HeaderState {
    open: boolean;
}

export class Header extends React.Component<any, HeaderState> {
    state: HeaderState = {
        open: false,
    };

    toggleOpen = () => {
        this.setState((prev) => ({ ...prev, open: !prev.open }));
    };

    handleSubmit = () => {};
    render() {
        const { toggleOpen, handleSubmit } = this;
        const { open } = this.state;
        return (
            <Container>
                <h3>Team member list</h3>
                <Button
                    type='link'
                    icon={<i className='ri-user-add-fill fs-18'></i>}
                    children='Add team member'
                    onClick={toggleOpen}
                />
                <Modal
                    title='Add team member'
                    visible={open}
                    footer={null}
                    width='60%'
                    onCancel={toggleOpen}
                    style={{
                        backgroundColor: '#fff',
                        paddingBottom: 0,
                    }}
                >
                    <FormMember
                        toggleOpen={toggleOpen}
                        onSubmit={handleSubmit}
                    />
                </Modal>
            </Container>
        );
    }
}
