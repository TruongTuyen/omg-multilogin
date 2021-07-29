import React from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';

import { Clipboard } from '../../../../utils';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 0.5rem;
    max-width: 30rem;
    width: 100%;

    .ant-input-affix-wrapper {
        border: 0;
        background-color: #efefef;
        box-shadow: none;

        .ant-input {
            background-color: transparent;
        }

        .ant-input-suffix {
            margin-left: 10px;
        }
    }

    .ant-btn {
        border: 0;
        background-color: transparent;
        box-shadow: none;
    }
`;

interface TokenSectionProps {
    value?: string;
}

export const TokenSection = ({ value }: TokenSectionProps) => {
    const activator = (
        <Button
            className='btn-not-outline'
            icon={<i className='ri-file-copy-line fs-18'></i>}
        />
    );
    return (
        <Container>
            <Input.Password value={value} readOnly />
            <Clipboard value={value as string} activator={activator} />
        </Container>
    );
};
