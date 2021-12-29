import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
const { ipcRenderer } = window.require('electron');

const { Item } = Menu;

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 0.5rem;

    .action-btn {
        border: 0px;
        outline: 0;
        box-shadow: none;
        background-color: transparent;

        &:after {
            outline: 0 !important;
            box-shadow: none !important;
            border: 0 !important;
            background: #fff !important;
        }
    }
`;

export class MoreActions extends React.Component<any, any> {
	constructor(props) {
		super(props);
		ipcRenderer.on('asynchronous-reply', (event, arg) => {
			console.log("Frontend got data: ", arg)
		})
	}
    handleClick = () => {
		ipcRenderer.send("get_data", { product: 'notebook' });
		// ipcRenderer.sendSync('synchronous-message', 'ping')
	};
    render() {
        const { handleClick } = this;

        const actions = [
            {
                name: 'Edit',
                action: () => {
                    this.setState({ isView: true });
                },
                render: <p>Edit</p>,
            },
            {
                name: 'Move to group',
                action: () => {
                    this.setState({ isView: true });
                },
                render: <p>Move to group</p>,
            },
        ];

        const menu = (
            <Menu style={{ backgroundColor: '#fff' }}>
                {actions.map((action, index) => (
                    <Item key={`action-${index}`}>{action.render}</Item>
                ))}
            </Menu>
        );
        return (
            <Container>
                <Button children='Start' type='primary' onClick={handleClick} />
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    placement='bottomRight'
                >
                    <Button
                        className='action-btn'
                        shape='circle'
                        icon={<i className='ri-more-2-fill fs-20'></i>}
                    />
                </Dropdown>
            </Container>
        );
    }
}
