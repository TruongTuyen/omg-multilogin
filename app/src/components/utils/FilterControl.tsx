import React from 'react';
import { Input, Button, InputProps, Collapse } from 'antd';
import styled from 'styled-components';

const { Panel } = Collapse;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    justify-content: space-between;

    .filter-control-content {
        flex: 1 1;
        .ant-input {
            max-width: 450px;
        }
    }

    .actions-control {
        display: flex;
        flex-direction: row;
        column-gap: 0.5rem;

        .ant-btn {
            border: 0;
            background-color: transparent;
            box-shadow: none;
        }
    }

    .ant-collapse-header {
        padding: 0 !important;
    }
    .ant-collapse-content-box {
        padding: 0;
    }
`;

interface FilterControlState {
    activeKey: Array<string | number>;
}

interface FilterControlProps {
    input?: InputProps;
    children?: React.ReactNode;
    onSearch?: (value?: string) => void;
}

export class FilterControl extends React.Component<
    FilterControlProps,
    FilterControlState
> {
    state: FilterControlState = {
        activeKey: [],
    };

    toggle = () => {
        this.setState((prev) => ({
            activeKey: prev?.activeKey?.length > 0 ? [] : ['1'],
        }));
    };

    render() {
        const { children, input: inputProp, onSearch } = this.props;
        const { activeKey } = this.state;

        return (
            <Container>
                <div className='filter-control-content'>
                    <Collapse activeKey={activeKey} ghost bordered={false}>
                        <Panel key='1' header={null} showArrow={false}>
                            {children}
                        </Panel>
                    </Collapse>
                    <Input
                        {...inputProp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            onSearch?.(value);
                        }}
                    />
                </div>
                <div className='actions-control'>
                    <Button
                        shape='circle'
                        onClick={() => this.toggle()}
                        icon={<i className='ri-settings-3-fill fs-18' />}
                    />
                    <Button
                        shape='circle'
                        icon={<i className='ri-refresh-line fs-18' />}
                    />
                </div>
            </Container>
        );
    }
}
