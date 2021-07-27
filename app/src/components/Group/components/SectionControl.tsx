import React from 'react';
import { Input, Button, Modal } from 'antd';
import styled from 'styled-components';

import { FormGroup } from './Form';

interface SectionControlState {
    open: boolean;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    justify-content: space-between;

    .ant-input {
        max-width: 450px;
    }

    .ant-btn {
        align-items: center;
        display: flex;
        column-gap: 0.4rem;
        padding-right: 0;
    }
`;

export class SectionControl extends React.Component<any, SectionControlState> {
    state: SectionControlState = {
        open: false,
    };

    toggleOpenModal = () => {
        this.setState((prev) => ({ ...prev, open: !prev.open }));
    };
    render() {
        const { toggleOpenModal } = this;

        return (
            <Container>
                <Input placeholder='Search groups...' />
                <Button
                    type='link'
                    onClick={toggleOpenModal}
                    children='Add new group'
                    icon={<i className='ri-folder-add-fill fs-18'></i>}
                />
                <Modal
                    title='Add new group'
                    visible={this.state.open}
                    onCancel={toggleOpenModal}
                    width='60%'
                    style={{
                        backgroundColor: '#fff',
                        paddingBottom: 0,
                    }}
                    footer={null}
                >
                    <FormGroup onClose={toggleOpenModal} />
                </Modal>
            </Container>
        );
    }
}
