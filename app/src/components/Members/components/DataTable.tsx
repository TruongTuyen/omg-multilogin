import React, { useMemo } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

import MEMBERS from '../../../data/members.json';

import { MoreActions } from './actions';

const Container = styled.div`
    .email-wrap,
    .status-wrap {
        display: flex;
        align-items: center;
        flex-direction: row;
        column-gap: 0.5rem;
    }
`;

export function DataTable() {
    // Markup
    const columnsMarkup = useMemo(
        () => [
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                render: (record) => {
                    return (
                        <div className='email-wrap'>
                            <i className='ri-user-fill fs-18'></i>
                            <span>{record}</span>
                        </div>
                    );
                },
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (record) => {
                    return (
                        <div className='status-wrap'>
                            <i
                                className='ri-check-fill fs-18'
                                style={{ color: '#3e82db' }}
                            />
                            <span>{record}</span>
                        </div>
                    );
                },
            },
            {
                key: 'actions',
                render: (record) => <MoreActions record={record} />,
            },
        ],
        []
    );

    return (
        <Container>
            <Table
                columns={columnsMarkup}
                dataSource={MEMBERS}
                style={{ marginTop: '1.5rem' }}
            />
        </Container>
    );
}
