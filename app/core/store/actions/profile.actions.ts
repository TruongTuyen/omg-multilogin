export const initialState = {
    selectAllP: false,
    filterP: {
        search: '',
    },
};

export function ACTION_SELECT_ALL_P(data: StoreDatas['ACTION_SELECT_ALL_P']): {
    selectAllP: StoreStates['selectAllP'];
} {
    return { selectAllP: data };
}

export function ACTION_FILTER_P(data: StoreDatas['ACTION_FILTER_P']): {
    filterP: StoreStates['filterP'];
} {
    return { filterP: { ...data } };
}

declare global {
    interface StoreStates {
        selectAllP: boolean;
        filterP: {
            search: string;
            [key: string]: any;
        };
    }

    interface StoreDatas {
        ACTION_SELECT_ALL_P: StoreStates['selectAllP'];
        ACTION_FILTER_P: StoreStates['filterP'];
    }
}
