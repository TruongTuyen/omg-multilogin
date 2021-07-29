import React, { Fragment, useCallback } from 'react';
import { Button, Modal, Form, Input } from 'antd';

import { useToggle } from '../../../../../hooks';

export const ChangePassword = () => {
    const [form] = Form.useForm();
    // State
    const [open, toggleOpen] = useToggle(false);

    // Handle actions
    const handleSubmit = useCallback((values) => {
        console.log('values', values); // TODO:
    }, []);

    return (
        <Fragment>
            <Button
                type='link'
                onClick={toggleOpen}
                children='Change Password'
                style={{ padding: 0 }}
            />
            <Modal
                title='Change password'
                visible={open}
                onCancel={toggleOpen}
                footer={null}
                style={{ backgroundColor: '#fff', paddingBottom: 0 }}
            >
                <Form form={form} layout='vertical' onFinish={handleSubmit}>
                    <Form.Item
                        label='Current password'
                        name='currentPassword'
                        rules={[
                            {
                                required: true,
                                message: 'Current password is required',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Enter current password' />
                    </Form.Item>
                    <Form.Item
                        label='New password'
                        name='newPassword'
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'New password is required',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Enter new password' />
                    </Form.Item>
                    <Form.Item
                        label='Confirm new  password'
                        name='confirmPassword'
                        hasFeedback
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Confirm new password is required',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('newPassword') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The two passwords that you entered do not match!'
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder='Enter confirm new password' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            children='Change password'
                            type='primary'
                            htmlType='submit'
                            style={{ marginRight: '1rem' }}
                        />
                        <Button children='Cancel' onClick={toggleOpen} />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    );
};
