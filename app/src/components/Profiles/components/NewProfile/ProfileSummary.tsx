import React, { Fragment, useState } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import { context } from './context';

const PROFILE_SUMMARY_FIELDS = {
    profileName: {
        label: 'Profile name',
        value: 'Not specified',
    },
    proxy: {
        label: 'Proxy',
        value: 'Without proxy',
    },
    browser: {
        label: 'Browser',
        value: 'Mimic',
    },
    os: {
        label: 'OS',
        value: 'Mac OS',
    },
    userAgent: {
        label: 'User-Agent',
        value: 'Mozilla/5.0',
    },
    resolution: {
        label: 'Resolution',
        value: '1024x768',
    },
    languages: {
        label: 'Languages',
        value: 'en-US,en;q=0.9',
    },
    platform: {
        label: 'Platform',
        value: 'MacIntel',
    },
    timezone: {
        label: 'Timezone',
        value: 'Automatic',
    },
    geolocation: {
        label: 'Geolocation',
        value: '[Prompt] Automatic',
    },
    webRTC: {
        label: 'WebRTC',
        value: '[Altered] Automatic',
    },
    canvas: {
        label: 'Canvas',
        value: '[Off]',
    },
    webGLMetadata: {
        label: 'WebGL metadata',
        value: '[Mask]',
    },

    webGLImage: {
        label: 'WebGL image',
        value: '[Noise]',
    },
    audioContext: {
        label: 'AudioContext',
        value: '[Noise]',
    },
    fonts: {
        label: 'Fonts',
        value: 'Total 195 fonts',
    },
    mediaDevices: {
        label: 'Media devices',
        value: 'Masked 1 | 4 | 2',
    },
    localStorage: {
        label: 'Local Storage',
        value: 'Enabled',
    },
    extStorage: {
        label: 'Ext. storage',
        value: 'Enabled',
    },
    plugins: {
        label: 'Plugins',
        value: 'Disabled',
    },
    flash: {
        label: 'Flash',
        value: 'Disabled',
    },
};

export interface ProfileSummaryType
    extends Partial<Record<keyof typeof PROFILE_SUMMARY_FIELDS, string>> {}

const Container = styled.div`
    margin-top: 1.5rem;

    h3 {
        color: #3e82db;
        margin-bottom: 0.85rem;
    }

    .field-content {
        word-break: break-all;
        font-size: 13px;
        color: #787a80;
    }
`;

export const ProfileSummary = () => {
    const contextN = React.useContext(context);
    // State
    const [state, setState] = useState<ProfileSummaryType>({});
    const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

    // Get data
    React.useEffect(() => {
        const state = contextN?.[0];

        typingTimeoutRef.current && clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            setState((prev) => ({ ...prev, ...state }));
        }, 350);
    }, [contextN]);

    return (
        <Container>
            <h3>PROFILE SUMMARY</h3>
            <Row gutter={[24, 12]}>
                {Object.entries(PROFILE_SUMMARY_FIELDS).map(
                    ([key, { value, label }], index) => {
                        const matchedValue = state[key] ?? value;
                        return (
                            <Fragment key={`field-${index}`}>
                                <Col span={8}>
                                    <span className='field-name'>{label}:</span>
                                </Col>
                                <Col span={16}>
                                    <span className='field-content'>
                                        {matchedValue}
                                    </span>
                                </Col>
                            </Fragment>
                        );
                    }
                )}
            </Row>
        </Container>
    );
};
