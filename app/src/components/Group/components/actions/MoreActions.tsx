import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';

import { Edit } from './Edit';
import { Delete } from './Delete';

const { Item } = Menu;
const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 0.5rem;

    .ant-btn {
        border: 0px;
        outline: 0;
        box-shadow: none;
        background-color: transparent;
    }
`;

interface MoreActionsProps {
    record?: any;
}

export class MoreActions extends React.Component<MoreActionsProps> {
    render() {
        const { record } = this.props;

        // Markup
        const actions = [
            {
                name: 'Edit',
                render: <Edit record={record} />,
            },
            {
                name: 'Delete',
                render: <Delete record={record} />,
            },
        ];

        const menu = (
            <Menu style={{ backgroundColor: '#fff' }}>
                {actions.map((action, index) => (
                    <Item key={`action-${index}`} style={{ padding: 0 }}>
                        {action.render}
                    </Item>
                ))}
            </Menu>
        );
        return (
            <Container>
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    placement='bottomRight'
                >
                    <Button
                        className='btn-not-outline'
                        shape='circle'
                        icon={<i className='ri-more-2-fill fs-20'></i>}
                    />
                </Dropdown>
            </Container>
        );
    }
}
