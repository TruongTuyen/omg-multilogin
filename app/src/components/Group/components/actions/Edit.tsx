import React from 'react';
import { Modal, notification } from 'antd';

import { FormGroup } from '../Form';

interface EditProps {
    record?: any;
}

interface EditState {
    open?: boolean;
    loading: boolean;
}

export class Edit extends React.Component<EditProps, EditState> {
    state: EditState = {
        open: false,
        loading: false,
    };

    toggleOpen = () => {
        this.setState((prev) => ({ ...prev, open: !prev.open }));
    };

    handleSubmit = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState(
                (prev) => ({ ...prev, loading: false }),
                () => {
                    this.toggleOpen();
                    notification.success({
                        message: 'Edit group successfully.',
                    });
                }
            );
        }, 1500);
    };
    render() {
        const { toggleOpen, handleSubmit } = this;
        const { open, loading } = this.state;
        const { record } = this.props;

        return (
            <React.Fragment>
                <span
                    children='Edit'
                    onClick={toggleOpen}
                    style={{ padding: '5px 20px' }}
                />
                <Modal
                    title='Edit group'
                    visible={open}
                    footer={null}
                    width='60%'
                    onCancel={toggleOpen}
                    style={{
                        backgroundColor: '#fff',
                        paddingBottom: 0,
                    }}
                >
                    <FormGroup
                        onClose={toggleOpen}
                        value={record}
                        onSubmit={handleSubmit}
                        loading={loading}
                    />
                </Modal>
            </React.Fragment>
        );
    }
}
