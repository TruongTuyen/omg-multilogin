import React from 'react';
import { Select } from 'antd';

import { PERMISSIONS } from '../../constants';

const { Option } = Select;

export interface PermissionItem {
    value: string | number;
    label: string;
}

interface PermissionState {
    permission: PermissionItem[];
    defaultValue?: PermissionItem['value'];
}

interface PermissionProps {
    onChange?: (value: PermissionItem['value']) => void;
    value?: PermissionItem['value'];
}

export class Permission extends React.Component<
    PermissionProps,
    PermissionState
> {
    state: PermissionState = {
        permission: [],
        defaultValue: undefined,
    };

    componentDidMount() {
        const data = [...PERMISSIONS];
        const [first] = data;

        // Props
        const { value } = this.props;
        const defaultValue = value ?? first.value;

        this.setState({ permission: data, defaultValue });

        this.props.onChange?.(defaultValue);
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
