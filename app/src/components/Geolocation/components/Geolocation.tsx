import React, { useCallback, useState } from 'react';
import { Input, Switch, Form, Slider } from 'antd';
import styled from 'styled-components';

import { Layout } from '../../Profiles';
import { AlertSection, ItemType } from '../../utils/AlertSection';

const Container = styled.div`
    padding-top: 1rem;

    .ant-form-item-extra {
        color: #777879;
        margin-top: 0.35rem;
    }

    .ant-slider-rail {
        background-color: #fff;
    }

    .base-ip-wrap {
        margin: 2rem 0 1.5rem;
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;

        .subtitle {
            color: #777879;
        }
    }

    .step-wrap {
        display: flex;
        flex-direction: row;
        column-gap: 0.5rem;
        align-items: center;

        .ant-slider {
            width: 100%;
        }
    }
`;

const BEHAVIOR: ItemType[] = [
    {
        value: 'prompt',
        label: 'Prompt',
        message:
            'Whenever a website requests your geolocation coordinates, you will be prompted in a browser to either accept or deny the request as it happens in a normal browser. In the first case, geolocation from the browser profile configuration will be provided to a website.',
        type: 'success',
    },
    {
        value: 'allow',
        label: 'Allow',
        message:
            'Whenever a website requests your geolocation coordinates, the request will always be honored. A website will receive geolocation coordinates configured in the browser profile.',
        type: 'warning',
    },
    {
        value: 'block',
        label: 'Block',
        message:
            'Websites will always be denied from receiving your geolocation coordinates.',
        type: 'warning',
    },
];

export const Geolocation = () => {
    const [form] = Form.useForm();
    // State
    const [behavior, setBehavior] = useState<string>(BEHAVIOR[0].value);
    const [checked, setChecked] = useState<boolean>(false);

    // Handle actions
    const handleBehaviorChange = useCallback((e) => {
        const value = e.target.value;
        setBehavior(value);
    }, []);

    const handleValuesChange = useCallback((...args) => {
        console.log('args', args);
    }, []);

    const showBaseIP = ['prompt', 'allow'].includes(behavior);

    return (
        <Layout>
            <Container>
                <AlertSection
                    data={BEHAVIOR}
                    label='Behavior:'
                    value={behavior}
                    onChange={handleBehaviorChange}
                />
                {showBaseIP && (
                    <>
                        <div className='base-ip-wrap'>
                            <div className='base-ip-inner'>
                                <Switch
                                    checked={checked}
                                    onChange={setChecked}
                                />
                                <span style={{ marginLeft: '0.5rem' }}>
                                    Fill geolocation based on IP
                                </span>
                            </div>
                            <span className='subtitle'>
                                Fill geolocation coordinates on browser profile
                                start based on the external IP.
                            </span>
                        </div>
                        {!checked && (
                            <Form
                                form={form}
                                layout='vertical'
                                style={{ maxWidth: '30rem' }}
                                onValuesChange={handleValuesChange}
                                initialValues={{
                                    accuracy: 10,
                                }}
                            >
                                <Form.Item
                                    label='Latitude'
                                    extra='Example: 40.1234'
                                    name='latitude'
                                >
                                    <Input placeholder='Enter latitude' />
                                </Form.Item>
                                <Form.Item
                                    label='Longitude'
                                    extra='Example: 40.1234'
                                    name='longitude'
                                >
                                    <Input placeholder='Enter longitude' />
                                </Form.Item>
                                <Form.Item label='Accuracy (meters)'>
                                    <div className='step-wrap'>
                                        <Form.Item name='accuracy' noStyle>
                                            <Slider
                                                min={10}
                                                step={10}
                                                handleStyle={{
                                                    backgroundColor: '#c2e2ff',
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            noStyle
                                            dependencies={['accuracy']}
                                        >
                                            {({ getFieldValue }) => {
                                                const value =
                                                    getFieldValue('accuracy');
                                                return <span>{value}</span>;
                                            }}
                                        </Form.Item>
                                    </div>
                                </Form.Item>
                            </Form>
                        )}
                    </>
                )}
            </Container>
        </Layout>
    );
};
