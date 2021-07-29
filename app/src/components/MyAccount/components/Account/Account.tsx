import React, {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { List } from 'antd';
import styled from 'styled-components';

import ACCOUNT_DATA from '../../../../data/account.json';

import { ChangePassword, CancelPlan, TokenSection } from './actions';

const Container = styled.div`
    padding: 0 24px 24px;

    .ant-list-items {
        margin: 0 -24px;
    }

    .item-wrap {
        display: flex;
        flex-direction: row;
        column-gap: 1rem;
        padding: 12px 24px;

        .label {
            width: 10rem;
        }
    }
`;

export const Account = () => {
    const [data, setData] = useState<any[]>([]);

    // Did mount
    useEffect(() => {
        const data = Object.entries(ACCOUNT_DATA);
        setData(data);
    }, []);

    // Markup
    const ACCOUNT_INFO: Record<string, React.ReactNode>[] = useMemo(
        () => [
            {
                'Account email': <span>{ACCOUNT_DATA.email}</span>,
            },
            {
                Password: <ChangePassword />,
            },
            {
                Plan: <CancelPlan value={ACCOUNT_DATA.plan} />,
            },
            {
                'Port number': <span>{ACCOUNT_DATA.portNumber}</span>,
            },
            {
                Token: <TokenSection value={ACCOUNT_DATA.token} />,
            },
            {
                Logs: 'logs',
            },
        ],
        [ACCOUNT_DATA]
    );

    const renderItem = useCallback((item, index) => {
        const itemMarkup = Object.entries(item).map(([key, value]) => (
            <div className='item-wrap' key={`item=${index}`}>
                <strong className='label' title={key}>
                    {key}
                </strong>
                <Fragment>{value as React.ReactNode}</Fragment>
            </div>
        ));

        return itemMarkup;
    }, []);

    return (
        <Container>
            <List
                dataSource={ACCOUNT_INFO}
                header={null}
                footer={null}
                bordered={false}
                renderItem={renderItem}
            />
        </Container>
    );
};
