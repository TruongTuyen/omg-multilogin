import React from 'react';
import { Table, Button } from 'antd';
import styled from 'styled-components';

import GROUPS from '../../../data/groups.json';
import { MoreActions, Pinned } from './actions';

const Container = styled.div`
    .name-wrap {
        .ant-btn {
            display: flex;
            flex-direction: row;
            align-items: center;
            column-gap: 0.5rem;
        }
    }
`;

interface DataTableState {
    data: any[];
}

export class DataTable extends React.Component<any, DataTableState> {
    state: DataTableState = {
        data: [],
    };

    componentDidMount() {
        const data = [...GROUPS];
        this.setState({ data });
    }
    render() {
        const { data } = this.state;

        // Markup
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (name) => {
                    return (
                        <div className='name-wrap'>
                            <Button
                                icon={<i className='ri-folder-fill fs-18'></i>}
                                type='link'
                            >
                                <span>{name}</span>
                            </Button>
                        </div>
                    );
                },
            },
            {
                title: 'Profiles',
                dataIndex: 'profiles',
                key: 'profiles',
            },
            {
                title: 'Pinned',
                dataIndex: 'pinned',
                key: 'pinned',
                render: (_pinned, record) => <Pinned record={record} />,
            },
            {
                title: '',
                key: 'action',
                render: (record) => <MoreActions record={record} />,
            },
        ];

        return (
            <Container>
                <Table
                    dataSource={data}
                    columns={columns}
                    style={{ marginTop: '1.5rem' }}
                />
            </Container>
        );
    }
}
