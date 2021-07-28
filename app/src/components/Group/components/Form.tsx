import React from 'react';
import { Button, Form, Input } from 'antd';

import { MemberSelect } from './MemberSelect';

interface FormGroupProps {
    loading?: boolean;
    value?: any;
    onClose?: () => void;
    onSubmit: (values: any) => void;
}

export class FormGroup extends React.Component<FormGroupProps> {
    handleFinish = (values) => {
        this.props.onSubmit(values);
    };

    render() {
        const { handleFinish } = this;
        const { onClose, value, loading } = this.props;

        const selectMemberLabel = (
            <div>
                <strong>Select members to allow access </strong>
                <span>(You can set permissions later.)</span>
            </div>
        );
        return (
            <Form
                layout='vertical'
                initialValues={{ name: value?.name ?? '' }}
                onFinish={handleFinish}
            >
                <Form.Item
                    name='name'
                    label='Group name'
                    rules={[
                        { required: true, message: 'Group name is required' },
                    ]}
                >
                    <Input placeholder='Enter group name' />
                </Form.Item>

                <Form.Item label={selectMemberLabel}>
                    <MemberSelect />
                </Form.Item>
                <Form.Item>
                    <Button
                        children='Create'
                        type='primary'
                        htmlType='submit'
                        style={{ marginRight: '1rem' }}
                        loading={loading}
                    />
                    <Button children='Cancel' onClick={onClose} />
                </Form.Item>
            </Form>
        );
    }
}
