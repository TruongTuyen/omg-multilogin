import React from 'react';
import { Form, Button, Input } from 'antd';
import styled from 'styled-components';

const Container = styled.div``;

interface FormMemberProps {
    toggleOpen?: () => void;
}

export class FormMember extends React.Component<FormMemberProps> {
    render() {
        const { toggleOpen } = this.props;
        return (
            <Container>
                <Form layout='vertical'>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            { required: true, message: 'Email is required' },
                        ]}
                    >
                        <Input placeholder='Enter user email' />
                    </Form.Item>
                    <Form.Item
                        label='Temporary password'
                        name='password'
                        rules={[
                            { required: true, message: 'Password is required' },
                        ]}
                    >
                        <Input placeholder='Enter user password' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            children='Add'
                            type='primary'
                            htmlType='submit'
                            style={{ marginRight: '1rem' }}
                        />
                        <Button children='Cancel' onClick={toggleOpen} />
                    </Form.Item>
                </Form>
            </Container>
        );
    }
}
