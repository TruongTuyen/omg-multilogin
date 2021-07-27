import React from 'react';
import { Modal, notification } from 'antd';

interface DeleteState {
    open: boolean;
    loading: boolean;
}

interface DeleteProps {
    record: any;
}

export class Delete extends React.Component<DeleteProps, DeleteState> {
    state: DeleteState = {
        open: false,
        loading: false,
    };

    toggleOpen = () => {
        this.setState((prev) => ({ ...prev, open: !prev.open }));
    };

    handleConfirm = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState(
                (prev) => ({ ...prev, loading: false }),
                () => {
                    this.toggleOpen();
                    notification.success({
                        message: 'Deleted this ground successfully.',
                    });
                }
            );
        }, 1500);
    };

    render() {
        const { open, loading } = this.state;
        const { toggleOpen, handleConfirm } = this;
        return (
            <React.Fragment>
                <span style={{ padding: '5px 20px' }} onClick={toggleOpen}>
                    Delete
                </span>
                <Modal
                    visible={open}
                    title='Delete group'
                    onCancel={toggleOpen}
                    onOk={handleConfirm}
                    okButtonProps={{ loading }}
                    style={{ backgroundColor: '#fff', paddingBottom: 0 }}
                >
                    <p>Are you sure to delete this group?</p>
                </Modal>
            </React.Fragment>
        );
    }
}
