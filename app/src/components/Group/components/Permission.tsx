import React from 'react';
import { Select } from 'antd';

import { PERMISSIONS } from '../../../constants';

const { Option } = Select;

export interface PermissionItem {
    value: string | number;
    label: string;
}

interface PermissionSelectState {
    permission: PermissionItem[];
    defaultValue?: PermissionItem['value'];
}

interface PermissionSelectProps {
    onChange?: (value: PermissionItem['value']) => void;
}

export class PermissionSelect extends React.Component<
    PermissionSelectProps,
    PermissionSelectState
> {
    state: PermissionSelectState = {
        permission: [],
        defaultValue: undefined,
    };

    componentDidMount() {
        const data = [...PERMISSIONS];
        const [first] = data;
        this.setState({ permission: data, defaultValue: first.value });

        this.props.onChange?.(first.value);
    }

    handleChange = (value) => {
        this.setState({ defaultValue: value });
        this.props.onChange?.(value);
    };

    render() {
        const { permission, defaultValue } = this.state;
        const { handleChange } = this;

        return (
            <Select
                onChange={handleChange}
                style={{ width: 200 }}
                dropdownStyle={{ backgroundColor: '#fff' }}
                value={defaultValue}
            >
                {permission.map(({ value, label }) => (
                    <Option key={value} value={value}>
                        {label}
                    </Option>
                ))}
            </Select>
        );
    }
}
