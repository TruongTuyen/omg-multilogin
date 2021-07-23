import React from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

import { ProfilesTypes } from './types';
import { withStore } from '@/core/store';

import { SectionFilter } from './components';
const Container = styled.div`
    padding: 0 16px 16px;
`;

interface ProfilesProps extends Partial<PageProps>, StoreProps {
    filterP?: {
        search: string;
    };
}

@withStore(['filterP'])
export default class Profiles extends React.Component<
    ProfilesProps,
    ProfilesTypes
> {
    state: ProfilesTypes = {
        selectedAll: false,
        filter: {
            search: '',
        },
    };

    toggleCheckedAll = () => {
        this.setState((prev) => ({ ...prev, selectedAll: !prev.selectedAll }));
    };

    handleSearch = debounce((value?: string) => {
        this.setState((prev) => ({
            ...prev,
            filter: { ...prev.filter, search: value },
        }));
    }, 300);

    render() {
        const { filterP } = this.props;

        return (
            <Container>
                <SectionFilter />
            </Container>
        );
    }
}
