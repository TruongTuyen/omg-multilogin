import React, { useMemo } from 'react';
import { Alert, Radio } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
    h4 {
        margin-bottom: 0.5rem;
    }

    .ant-alert {
        margin-top: 0.75rem;
    }
`;

type TypeOfAlert = 'success' | 'info' | 'warning' | 'error';
export interface ItemType {
    value: string;
    label: string;
    message: string;
    type: TypeOfAlert;
}

interface AlertSectionProps {
    data: ItemType[];
    label?: string;
    value?: string;
    onChange?: (e: any) => void;
}

export function AlertSection({
    data,
    label,
    value,
    onChange,
}: AlertSectionProps) {
    const alertMarkup = useMemo(() => {
        let markup: Pick<ItemType, 'message' | 'type'> | null = null;
        data.forEach(({ message, type, value: valueItem }: ItemType) => {
            if (value === valueItem) {
                markup = {
                    message,
                    type,
                };
            }
        });
        return markup!;
    }, [value, data]);

    return (
        <Container>
            <h4>{label}</h4>
            <Radio.Group value={value} onChange={onChange}>
                {data.map(({ value, label }, index) => (
                    <Radio.Button key={`${value}-${index}`} value={value}>
                        {label}
                    </Radio.Button>
                ))}
            </Radio.Group>
            <Alert
                message={alertMarkup?.message}
                type={alertMarkup?.type}
                showIcon
            />
        </Container>
    );
}
