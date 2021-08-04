import React, { useCallback, useEffect, useState } from 'react';
import { Select, Form, Button, Input, Row, Col } from 'antd';

import PROXIES from '../../../data/proxies.json';
import { context } from '../../Profiles/components/NewProfile';

type ProxyType = Record<string, string | number>;

export function ProxyForm() {
    const [form] = Form.useForm();
    const [data, setData] = useState<ProxyType[]>([]);
    const [connectType, setConnectType] = useState(PROXIES[0].label); //

    // Context
    const profileContext = React.useContext(context);
    const dispatch = profileContext?.[1];

    // Did mount
    useEffect(() => {
        const data = [...PROXIES];
        setData(data);
    }, []);

    // Handle action
    const handleSubmit = useCallback((values) => {
        console.log(values);
    }, []);

    const handleConnectTypeChange = useCallback((_, { id }) => {
        setConnectType(id);
    }, []);

    const handleValuesChange = useCallback((value, values) => {
        let { address, port, proxy } = values;
        address = address ?? '';
        port = port ?? '';
        const prefix = address ? [address, port].filter(Boolean).join(':') : '';

        proxy = [prefix, proxy].filter(Boolean).join(' / ');
        updateContext({ proxy });
    }, []);

    const updateContext = useCallback(
        (values) => {
            dispatch?.({ type: 'Update', payload: { ...values } });
        },
        [dispatch]
    );

    return (
        <Form
            form={form}
            layout='vertical'
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}
        >
            <Form.Item label='Connect type' name='proxy'>
                <Select
                    dropdownStyle={{ backgroundColor: '#fff' }}
                    onChange={handleConnectTypeChange}
                    defaultValue={connectType}
                >
                    {data.map((option) => (
                        <Select.Option
                            key={`proxy-${option.value}`}
                            id={option.value}
                            value={option.label}
                        >
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {connectType !== PROXIES[0].label ? (
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
