import React, { ReactNode } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import styled from 'styled-components';

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

interface Action {
    name: string;
    render: ReactNode;
}

export interface MoreActionProps {
    record?: any;
    actions: Action[];
}

export const MoreAction = ({ actions }: MoreActionProps) => {
    // Markup
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
};
