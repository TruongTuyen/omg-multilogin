import React, { useCallback } from 'react';
import { Modal, notification } from 'antd';

import { useToggle } from '../../../../hooks';

interface DeleteProps {
    record: any;
}

export function Delete({}: DeleteProps) {
    // State
    const [open, toggleOpen] = useToggle(false);
    const [loading, toggleLoading] = useToggle(false);

    const handleConfirm = useCallback(() => {
        toggleLoading(true);
        setTimeout(() => {
            toggleLoading(false);
            toggleOpen(false);
            notification.success({
                message: 'Deleted this ground successfully.',
            });
        }, 1500);
    }, []);

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
