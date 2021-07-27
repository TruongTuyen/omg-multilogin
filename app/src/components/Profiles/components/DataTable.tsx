import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

import PROFILE_DATA from '../../../data/profiles.json';
import { withStore } from '@/core/store';

import { MoreActions } from './actions';
import { NameContainer } from './NameContainer';

interface DataTableProps extends Partial<PageProps>, StoreProps {
    selectAllP?: StoreStates['selectAllP'];
    filterP?: StoreStates['filterP'];
    data: any[];
}

@withStore(['selectAllP', 'filterP'])
export class DataTable extends React.Component<DataTableProps> {
    handleChange = () => {};

    render() {
        const { selectAllP, dispatch, filterP: filter, data } = this.props;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a?.name.length - b.name.length,
                ellipsis: true,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Last edited',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                render: (updatedAt) => (
                    <span>{moment(updatedAt).format('MM/DD/YYYY')}</span>
                ),
            },
            {
                title: '',
                key: 'action',
                render: (record) => {
                    return <MoreActions record={record} />;
                },
            },
        ];

        // rowSelection object indicates the need for row selection
        const rowSelection = selectAllP
            ? {
                  onChange: (selectedRowKeys: React.Key[]) => {
                      if (selectedRowKeys != null) {
                          dispatch?.({
                              type: 'ACTION_SELECTION_ITEM_P',
                              data: selectedRowKeys,
                          });
                      }
                  },
              }
            : undefined;

        return (
            <Table
                rowSelection={rowSelection}
                dataSource={data}
                columns={columns}
                onChange={this.handleChange}
                style={{ marginTop: '1.5rem' }}
                expandable={{
                    expandedRowRender: (record) => (
                        <NameContainer record={record} />
                    ),
                }}
                pagination={{
                    total: data.length,
                    pageSize: filter?.limit,
                    onChange(page, pageSize) {
                        dispatch?.({
                            type: 'ACTION_FILTER_P',
                            data: {
                                ...filter,
                                limit: pageSize as number,
                                paged: page as number,
                            },
                        });
                    },
                }}
            />
        );
    }
}
