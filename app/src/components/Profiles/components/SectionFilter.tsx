import React from 'react';
import { Button } from 'antd';

import { withStore } from '@/core/store';

import { FilterControl, BulkAction } from '../../utils';

interface SectionFilterProps extends Partial<PageProps>, StoreProps {
    selectAllP?: StoreStates['selectAllP'];
    filterP?: StoreStates['filterP'];
    selectedIdsP?: StoreStates['selectedIdsP'];
}

@withStore(['selectAllP', 'filterP', 'selectedIdsP'])
export class SectionFilter extends React.Component<SectionFilterProps, any> {
    constructor(props: SectionFilterProps) {
        super(props);
    }

    handleSearch = (value?: string): void => {
        const { filterP, dispatch } = this.props;
        dispatch?.({
            type: 'ACTION_FILTER_P',
            data: {
                ...filterP,
                search: value as string,
            },
        });
    };

    toggleSelectAll = (): void => {
        const { selectAllP, dispatch } = this.props;
        dispatch?.({
            type: 'ACTION_SELECT_ALL_P',
            data: !selectAllP,
        });
    };

    render() {
        const { selectAllP, selectedIdsP } = this.props;
        const { handleSearch, toggleSelectAll } = this;

        // Style
        const borderNone = { border: 0 };
        const disabled = selectedIdsP?.length === 0;
        return (
            <FilterControl
                input={{ placeholder: 'Search profile..' }}
                onSearch={handleSearch}
            >
                <BulkAction onChange={toggleSelectAll} checked={selectAllP}>
                    <Button
                        style={borderNone}
                        type='link'
                        children='Move to group'
                        disabled={disabled}
                        onClick={() => console.log('move to group')}
                    />
                    <Button
                        style={borderNone}
                        type='link'
                        children='Transfer'
                        disabled={disabled}
                        onClick={() => console.log('Transfer')}
                    />
                </BulkAction>
            </FilterControl>
        );
    }
}
