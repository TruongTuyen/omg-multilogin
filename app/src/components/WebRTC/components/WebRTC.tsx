import React, { useCallback, useEffect, useState } from 'react';
import { Input, Switch, Button } from 'antd';
import styled from 'styled-components';

import { Layout } from '../../Profiles';
import { AlertSection, ItemType } from '../../utils/AlertSection';

const Container = styled.div`
    padding-top: 1rem;

    .web-rtc-wrap {
        padding: 2rem 0;
        margin-top: 3rem;
        border-top: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        margin-right: -30px;
        margin-left: -30px;

        .web-rtc-inner {
            margin-left: 30px;
            margin-right: 30px;
            display: flex;
            flex-direction: column;
            row-gap: 0.75rem;

            .subtitle {
                color: #777879;
            }

            .ant-input {
                margin-top: 0.35rem;
                max-width: 20rem;
                display: block;
            }
        }

        .web-rtc-control {
            display: flex;
            flex-direction: row;
            column-gap: 0.5rem;
            align-items: center;
        }
    }

    .local-ip-wrap {
        .ant-input {
            max-width: 20rem;
        }
    }

    .local-ips-wrap {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        padding: 2rem 0;

        .local-ip-input {
            display: flex;
            flex-direction: row;
            column-gap: 0.5rem;
            align-items: center;
        }
    }
`;

interface WebRTCPublicIPProps {
    checked: boolean;
    publicIP: string;
    setChecked: (value: boolean) => void;
    setPublicIP: (value: string) => void;
}

const BEHAVIOR: ItemType[] = [
    {
        value: 'altered',
        label: 'Altered',
        message:
            'WebRTC plugin will be turned on and will falsely leak your actual external IP as a Public IP address. A valid Local IP will also be falsely leaked instead of your actual local IP address.',
        type: 'info',
    },
    {
        value: 'disabled',
        label: 'Disabled',
        message:
            'WebRTC plugin will be turned off completely. Websites will see that you turned it off.',
        type: 'warning',
    },
    {
        value: 'real',
        label: 'Real',
        message:
            "WebRTC plugin will be turned on and will leak your real IP. This mode is only recommended if you don't use proxies in your connection.",
        type: 'warning',
    },
];

export const WebRTC = () => {
    const [behavior, setBehavior] = useState<string>(BEHAVIOR[0].value);
    const [checked, setChecked] = useState<boolean>(false);
    const [publicIP, setPublicIP] = useState<string>('');

    // Handle actions
    const handleBehaviorChange = useCallback((e) => {
        const value = e.target.value;
        setBehavior(value);
    }, []);

    // Variables
    const isAltered = 'altered' === behavior;
    const isReal = 'real' === behavior;

    return (
        <Layout>
            <Container>
                <AlertSection
                    data={BEHAVIOR}
                    label='Behavior:'
                    value={behavior}
                    onChange={handleBehaviorChange}
                />
                {isAltered && (
                    <>
                        <WebRTCPublicIP
                            checked={checked}
                            setChecked={setChecked}
                            publicIP={publicIP}
                            setPublicIP={setPublicIP}
                        />
                        <LocalIPs isAltered={true} />
                    </>
                )}
                {isReal && <LocalIPs />}
            </Container>
        </Layout>
    );
};

function WebRTCPublicIP({
    checked,
    setChecked,
    publicIP,
    setPublicIP,
}: WebRTCPublicIPProps) {
    // Handle actions
    const togglePublicIP = useCallback((value) => {
        if (value) {
            setPublicIP('');
        }
        setChecked(value);
    }, []);
    const handlePublicIP = useCallback((e) => {
        const value = e.target.value;
        setPublicIP(value);
    }, []);

    return (
        <div className='web-rtc-wrap'>
            <div className='web-rtc-inner'>
                <div className='web-rtc-control'>
                    <Switch checked={checked} onChange={togglePublicIP} />
                    <span>Fill WebRTC Public IP based on the IP.</span>
                </div>
                <span className='subtitle'>
                    Fill WebRTC Public IP on browser profile start based on the
                    external IP.
                </span>
                <div>
                    <h4>Public IP:</h4>
                    <Input
                        value={publicIP}
                        onChange={handlePublicIP}
                        placeholder='Public IP'
                        disabled={checked}
                    />
                </div>
            </div>
        </div>
    );
}

function LocalIPs({ isAltered = false }: { isAltered?: boolean }) {
    const [localIP, setLocalIP] = useState<Record<string, string>>({});
    const [enabledLocalIP, setEnabledLocalIP] = useState<boolean>(false);

    useEffect(() => {
        const firstLocalIP = {
            '1': '192.168.1.200',
        };
        setLocalIP(firstLocalIP);
    }, [isAltered]);

    const handleLocalIPChange = useCallback((e, key) => {
        const value = e.target.value;
        setLocalIP((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleRemove = useCallback((key) => {
        setLocalIP((prev) => {
            return Object.keys(prev).reduce((acc, cur) => {
                const compare = cur.toString() !== key.toString();
                return compare ? { ...acc, [cur]: prev[cur] } : acc;
            }, {});
        });
    }, []);

    const handleAddNew = useCallback(() => {
        const lastKey = Object.keys(localIP).pop();
        const newKey = parseInt(lastKey!) + 1;
        setLocalIP((prev) => ({ ...prev, [newKey]: '' }));
    }, [localIP]);

    // Markup
    const removeBtn = useCallback(
        (key) => {
            return (
                <Button
                    shape='circle'
                    className='btn-not-outline'
                    icon={<i className='ri-delete-bin-line' />}
                    onClick={() => handleRemove(key)}
                />
            );
        },
        [handleRemove]
    );
    const localIPMarkup = useCallback(
        (key, value) => {
            const label = `Local IP ${key}:`;
            return (
                <div className='local-ip-wrap' key={`local-ip-${key}`}>
                    <h4>{label}</h4>
                    <div className='local-ip-input'>
                        <Input
                            value={value}
                            onChange={(e) => handleLocalIPChange(e, key)}
                            placeholder='192.168.x.x'
                        />
                        {key !== '1' && removeBtn(key)}
                    </div>
                </div>
            );
        },
        [handleLocalIPChange, removeBtn]
    );
    const handleEnabledChange = useCallback(
        (value) => setEnabledLocalIP(value),
        []
    );

    // Variables
    const showLocalIP = isAltered || enabledLocalIP;

    return (
        <div className='local-ips-wrap'>
            <h4>Local IP(s)</h4>
            {!isAltered && (
                <div className='local-ips-inner'>
                    <Switch onChange={handleEnabledChange} />
                    <span style={{ marginLeft: '0.5rem' }}>
                        Enabled Local IP masking
                    </span>
                </div>
            )}
            {showLocalIP ? (
                <>
                    {Object.entries(localIP).map(([key, value]) =>
                        localIPMarkup(key, value)
                    )}
                    <div>
                        <Button
                            style={{ padding: 0 }}
                            type='link'
                            children='Add new local IP'
                            onClick={handleAddNew}
                        />
                    </div>
                </>
            ) : null}
        </div>
    );
}
