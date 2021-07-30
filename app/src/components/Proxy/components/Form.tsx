import React, { useCallback, useEffect, useState } from 'react';
import { Select, Form, Button, Input, Row, Col } from 'antd';

import PROXIES from '../../../data/proxies.json';

type ProxyType = Record<string, string | number>;

export function ProxyForm() {
    const [form] = Form.useForm();
    const [data, setData] = useState<ProxyType[]>([]);
    const [connectType, setConnectType] = useState(2);

    // Did mount
    useEffect(() => {
        const data = [...PROXIES];
        setData(data);
    }, []);

    // Handle action
    const handleSubmit = useCallback((values) => {
        console.log(values);
    }, []);

    const handleConnectTypeChange = useCallback(
        (value) => setConnectType(value),
        []
    );

    return (
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
            <Form.Item label='Connect type'>
                <Select
                    dropdownStyle={{ backgroundColor: '#fff' }}
                    onChange={handleConnectTypeChange}
                    defaultValue={connectType}
                >
                    {data.map((option) => (
                        <Select.Option
                            key={`proxy-${option.value}`}
                            value={option.value}
                        >
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {connectType !== 1 ? (
                <>
                    <p
                        style={{ marginBottom: '1rem' }}
                        children='User "ip:port:login:password" or "ip:port" format to quickly paste a proxy IP address.'
                    />
                    <Form.Item noStyle>
                        <Row gutter={6}>
                            <Col span={18}>
                                <Form.Item
                                    label='New address'
                                    name='address'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Address is required.',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Enter new address' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name='port'
                                    label='Port'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Port is required.',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Enter new port' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label='Login' name='login'>
                        <Input placeholder='Login' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input.Password placeholder='Password' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            children='Check proxy'
                            type='primary'
                            htmlType='submit'
                            ghost
                        />
                    </Form.Item>
                </>
            ) : null}
        </Form>
    );
}
