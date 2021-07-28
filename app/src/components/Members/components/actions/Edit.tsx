import React, { useCallback } from 'react';
import { Modal, notification } from 'antd';

import { useToggle } from '../../../../hooks';

import GroupForm from '../Form';

interface EditProps {
    record?: any;
}

export const Edit = ({ record }: EditProps) => {
    // State
    const [open, toggleOpen] = useToggle(false);
    const [loading, toggleLoading] = useToggle(false);

    const handleSubmit = useCallback(() => {
        toggleLoading(true);

        setTimeout(() => {
            toggleLoading(false);
            toggleOpen(false);
            notification.success({
                message: 'Edit group successfully.',
            });
        }, 1500);
    }, []);

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
                <GroupForm
                    toggleOpen={toggleOpen}
                    value={record}
                    loading={loading}
                    onSubmit={handleSubmit}
                    isEdit
                />
            </Modal>
        </React.Fragment>
    );
};
