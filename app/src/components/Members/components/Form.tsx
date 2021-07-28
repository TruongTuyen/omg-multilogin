import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { Button, Col, Form, Input, Row, Switch, Alert } from 'antd';
import styled from 'styled-components';

import { generatorPassword, isEmail } from '../../../helper';

import { Clipboard } from '../../utils/Clipboard';
import { GroupSelect } from './GroupSelect';

const Container = styled.div`
    .password-wrap {
        .ant-form-item-control-input-content {
            display: flex;
            align-items: flex-start;
        }
    }
`;

interface FormMemberProps {
    value?: any;
    loading?: boolean;
    isEdit?: boolean;
    toggleOpen?: () => void;
    onSubmit: (values: any) => void;
}

const FormMember = ({
    loading,
    value,
    isEdit,
    onSubmit,
    toggleOpen,
}: PropsWithChildren<FormMemberProps>) => {
    const [form] = Form.useForm();
    const [password, setPassword] = useState('');
    const [invitation, setInvitation] = useState(true);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        changePassword();
    }, []);

    useEffect(() => {
        if (value != null) {
            const { email, groups } = value;
            setGroups(groups);
            form.setFieldsValue({ email });
        }
    }, [value]);

    // Handle action
    const changePassword = useCallback(() => {
        const password = generatorPassword(16);
        form.setFieldsValue({ password });
        setPassword(password);
    }, []);

    const handleSubmit = useCallback(
        (values) => {
            onSubmit(values);
        },
        [onSubmit]
    );

    // Markup
    const suffixMarkup = (
        <i
            className='ri-refresh-line'
            onClick={changePassword}
            style={{
                cursor: 'pointer',
            }}
        />
    );

    const selectGroupLabel = (
        <div>
            <strong>Select groups to allow access </strong>
            <span>(You can set permissions later.)</span>
        </div>
    );

    const emailMarkup = (
        <Form.Item
            label='Email'
            name='email'
            rules={[
                {
                    required: true,
                    message: 'Email is required',
                },
                () => ({
                    validator(_, value) {
                        if (!value || isEmail(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error('Email must be a valid email address.')
                        );
                    },
                }),
            ]}
        >
            <Input type='email' placeholder='Enter email' />
        </Form.Item>
    );

    const passwordMarkup = (
        <Form.Item label='Temporary password'>
            <Row gutter={4}>
                <Col span={20}>
                    <Form.Item
                        name='password'
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Password is required',
                            },
                        ]}
                    >
                        <Input
                            suffix={suffixMarkup}
                            value={password}
                            onChange={(e) => {
                                const value = e.target.value;
                                setPassword(value);
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Clipboard value={password} />
                </Col>
            </Row>
        </Form.Item>
    );

    return (
        <Container>
            <Form
                form={form}
                layout='vertical'
                onFinish={handleSubmit}
                initialValues={{ invitation }}
            >
                <Row gutter={[24, 6]}>
                    {isEdit ? (
                        <Col span={24}>{emailMarkup}</Col>
                    ) : (
                        <>
                            <Col span={12}>{emailMarkup}</Col>
                            <Col span={12}>{passwordMarkup}</Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Row gutter={[6, 0]} align='middle'>
                                        <Col>
                                            <Form.Item
                                                noStyle
                                                name='invitation'
                                            >
                                                <Switch
                                                    checked={invitation}
                                                    onChange={(value) =>
                                                        setInvitation(value)
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col flex='auto'>
                                            <span>
                                                Send password with an invitation
                                                email (not secure)
                                            </span>
                                        </Col>
                                        <Col
                                            span={24}
                                            style={{ marginTop: '1rem' }}
                                        >
                                            {invitation && (
                                                <Alert
                                                    type='warning'
                                                    message='We recommend sending temporary passwords through secure channels.'
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                        </>
                    )}

                    <Col span={24}>
                        <Form.Item label={selectGroupLabel}>
                            <GroupSelect value={groups} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <Button
                                children='Add'
                                type='primary'
                                htmlType='submit'
                                style={{ marginRight: '1rem' }}
                                loading={loading}
                            />
                            <Button children='Cancel' onClick={toggleOpen} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default FormMember;
