import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    Radio,
    Switch,
    Collapse,
    Row,
    Col,
} from 'antd';
import styled from 'styled-components';

import GROUPS from '../../../data/groups.json';

import { Layout } from '../../Profiles';
import { ProfileContext, context } from '../../Profiles/components/NewProfile';

type StatusType = 'Activate' | 'Deactivate';
interface FingerPrintItemType {
    path: string;
    title: string;
    description: string;
    status: StatusType;
}

interface FingerPrints {
    timezone: Omit<FingerPrintItemType, 'status'>;
    webRTC: Omit<FingerPrintItemType, 'status'>;
    geolocation: Omit<FingerPrintItemType, 'status'>;
}

const PATH_PROXY = '#/new-profile/proxy';

const SYSTEMS = {
    macOs: 'Mac OS',
    windows: 'Windows',
    linux: 'Linux',
    android: 'Android',
};

const BROWSER = {
    stealthfox: 'Stealthfox',
    mimic: 'Mimic',
};

const FINGER_PRINTS: FingerPrints = {
    timezone: {
        path: '#/new-profile/timezone',
        title: 'Timezone',
        description:
            'Timezone automatic filling is disabled. Timezone is not set!',
    },
    webRTC: {
        path: '#/new-profile/webRTC',
        title: 'WebRTC',
        description:
            'WebRTC automatic filling is disabled. WebRTC Public IP are not set!',
    },
    geolocation: {
        path: '#/new-profile/geolocation',
        title: 'Geolocation',
        description:
            'Geolocation automatic filling is disabled. Geolocation coordinates are not set!',
    },
};

const Container = styled.div`
    .finger-print-wrap {
        display: flex;
        align-items: center;
        flex-direction: row;
        column-gap: 0.5rem;
    }

    .finger-print-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .control {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }

    .finger-print-advanced {
        margin-bottom: 24px;
    }
`;

export const Overview: React.FunctionComponent = () => {
    const [form] = Form.useForm();
    // State
    const [groups, setGroups] = useState<any[]>([]);
    const contextN = React.useContext(context);
    const dispatch = contextN?.[1];

    // Handle actions
    useEffect(() => {
        const groups = [...GROUPS].map(({ id, name }) => ({ value: id, name }));
        setGroups(groups);
    }, []);
    const handleValuesChange = useCallback(
        (_, values) => {
            dispatch?.({
                type: 'Update',
                payload: { ...values },
            });
        },
        [dispatch]
    );

    // Markup
    const systemMarkup = useMemo(() => {
        return (
            <Radio.Group>
                {Object.entries(SYSTEMS).map(([key, value]) => (
                    <Radio value={value} key={`system-${key}`}>
                        {value}
                    </Radio>
                ))}
            </Radio.Group>
        );
    }, []);

    const browserMarkup = useMemo(() => {
        return (
            <Radio.Group>
                {Object.entries(BROWSER).map(([key, value]) => (
                    <Radio.Button value={value} key={`browser-${key}`}>
                        {value}
                    </Radio.Button>
                ))}
            </Radio.Group>
        );
    }, []);

    const firstSystem = SYSTEMS.macOs; //Object.keys(SYSTEMS).shift(); // Get first item
    const lastBrowser = BROWSER.mimic; //Object.keys(BROWSER).pop(); // Get last item

    return (
        <Layout>
            <Container>
                <Form
                    form={form}
                    layout='vertical'
                    onValuesChange={handleValuesChange}
                    initialValues={{
                        os: firstSystem,
                        browser: lastBrowser,
                        fingerPrint: true,
                    }}
                >
                    <Row gutter={24} style={{ marginTop: '2rem' }}>
                        <Col span={12}>
                            <Form.Item
                                label='Browser profile name'
                                name='profileName'
                            >
                                <Input placeholder='Enter browser profile name' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Save profile group' name='group'>
                                <Select>
                                    {groups.map(({ value, name }, index) => (
                                        <Select.Option
                                            value={value}
                                            key={`group-${index}`}
                                        >
                                            {name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label='Operation system:' name='os'>
                        {systemMarkup}
                    </Form.Item>
                    <Form.Item label='Browser:' name='browser'>
                        {browserMarkup}
                    </Form.Item>
                    <Form.Item label='Proxy settings:'>
                        <Button
                            type='primary'
                            href={PATH_PROXY}
                            children='Edit proxy settings'
                        />
                    </Form.Item>
                    <Form.Item label='Timezone, WebRTC, Geolocation'>
                        <div className='finger-print-wrap'>
                            <Form.Item
                                name='fingerPrint'
                                valuePropName='checked'
                                noStyle
                            >
                                <Switch />
                            </Form.Item>
                            <span>
                                Fill Timezone, WebRTC, and Geolocation
                                fingerprints based on the external IP
                            </span>
                        </div>
                    </Form.Item>
                    <div className='finger-print-advanced'>
                        <FingerPrintItem />
                    </div>
                    <Form.Item>
                        <Button children='Get new fingerprint' type='primary' />
                    </Form.Item>
                </Form>
            </Container>
        </Layout>
    );
};

function FingerPrintItem() {
    // State
    const [status, setStatus] = useState<
        Partial<Record<keyof FingerPrints, StatusType>>
    >({});
    const [activeKey, setActiveKey] = useState<string[]>([]);

    // Mock
    React.useEffect(() => {
        setStatus({
            timezone: 'Activate',
            webRTC: 'Activate',
            geolocation: 'Deactivate',
        });
    }, []);

    // Handle actions
    const handleActiveChange = React.useCallback((value) => {
        setActiveKey(value);
    }, []);

    const headerMarkup = React.useCallback(
        (value: Omit<FingerPrintItemType, 'status'>, key: string) => {
            const { title, path } = value;
            const currentStatus = status[key];
            const isAction = activeKey.includes(key);
            // Arrow
            const arrow = isAction ? 'up' : 'down';
            const arrowIcon = (
                <i className={`ri-arrow-${arrow}-s-fill fs-20`} />
            );

            // Status
            const isActivate = ['Activate'].includes(currentStatus!);
            const icon = isActivate ? 'checkbox-circle' : 'information';
            const iconColor = isActivate ? '#40c200' : '#f54236';
            const iconMarkup = (
                <i
                    className={`ri-${icon}-fill fs-20`}
                    style={{ color: iconColor }}
                />
            );

            return (
                <div className='finger-print-item'>
                    <span>{title}</span>
                    <div className='control'>
                        <span>{iconMarkup}</span>
                        <Button
                            type='text'
                            icon={arrowIcon}
                            className='btn-not-outline'
                        />
                        <Button children='Edit' href={path} type='link' />
                    </div>
                </div>
            );
        },
        [status, activeKey]
    );

    const timezone = FINGER_PRINTS.timezone;
    const webRTC = FINGER_PRINTS.webRTC;
    const geolocation = FINGER_PRINTS.geolocation;

    return (
        <Collapse activeKey={activeKey} onChange={handleActiveChange}>
            <Collapse.Panel
                showArrow={false}
                header={headerMarkup(timezone, 'timezone')}
                key={'timezone'}
            >
                {timezone.description}
            </Collapse.Panel>
            <Collapse.Panel
                showArrow={false}
                header={headerMarkup(webRTC, 'webRTC')}
                key={'webRTC'}
            >
                {webRTC.description}
            </Collapse.Panel>
            <Collapse.Panel
                showArrow={false}
                header={headerMarkup(geolocation, 'geolocation')}
                key={'geolocation'}
            >
                {geolocation.description}
            </Collapse.Panel>
        </Collapse>
    );
}

export default function WrapOverView() {
    return (
        <ProfileContext>
            <Overview />
        </ProfileContext>
    );
}
