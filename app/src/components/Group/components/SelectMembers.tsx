import React from 'react';
import { List, Checkbox } from 'antd';
import styled from 'styled-components';

import LIST_MEMBERS from '../../../data/members.json';

import { PermissionSelect } from './Permission';
import type { PermissionItem } from './Permission';

const Container = styled.div`
    .member-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
`;

interface SelectMemberState {
    data?: any[];
}

export class SelectMember extends React.Component<any, SelectMemberState> {
    state = {
        data: [],
    };

    componentDidMount() {
        const data = [...LIST_MEMBERS].map((i) => ({
            ...i,
            selected: false,
            permission: null,
        }));
        this.setState({ data });
    }

    changeSelected = ({ id }) => {
        this.setState((prev) => ({
            ...prev,
            data: prev.data?.map((i) => {
                if (i.id === id) {
                    return {
                        ...i,
                        selected: !i.selected,
                    };
                }
                return i;
            }),
        }));
    };

    changePermission = ({
        id,
        value,
    }: {
        id: any;
        value: PermissionItem['value'];
    }) => {
        this.setState((prev) => ({
            ...prev,
            data: prev.data?.map((i) => {
                if (i.id === id) {
                    return {
                        ...i,
                        permission: value,
                    };
                }
                return i;
            }),
        }));
    };

    renderItem = ({ mail, selected, id }) => {
        return (
            <List.Item>
                <div className='member-wrap'>
                    <Checkbox
                        children={mail}
                        checked={selected}
                        onChange={() => this.changeSelected({ id })}
                    />
                    {selected && (
                        <PermissionSelect
                            onChange={(value) =>
                                this.changePermission({ id, value })
                            }
                        />
                    )}
                </div>
            </List.Item>
        );
    };

    render() {
        const { data } = this.state;

        return (
            <Container>
                <List
                    size='large'
                    header={null}
                    footer={null}
                    bordered
                    dataSource={data}
                    renderItem={this.renderItem}
                />
            </Container>
        );
    }
}
