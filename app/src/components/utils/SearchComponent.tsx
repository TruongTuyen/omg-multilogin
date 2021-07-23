import React from 'react';
import { Input, InputProps } from 'antd';

const { Search } = Input;

export class SearchComponent extends React.Component<InputProps> {
    render() {
        const { props } = this;
        const className = props;
        return <Search {...props} className={`search-wrap ${className}`} />;
    }
}
