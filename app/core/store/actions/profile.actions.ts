export const initialState = {
    selectAllP: false,
    filterP: {
        search: '',
        limit: 10,
        paged: 1,
    },
    selectedIdsP: [],
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

export function ACTION_SELECTION_ITEM_P(
    data: StoreDatas['ACTION_SELECTION_ITEM_P']
) {
    return { selectedIdsP: data };
}

declare global {
    interface StoreStates {
        selectAllP: boolean;
        filterP: {
            search?: string;
            limit?: number;
            paged?: number;
            [key: string]: any;
        };
        selectedIdsP: (string | number)[];
    }

    interface StoreDatas {
        ACTION_SELECT_ALL_P: StoreStates['selectAllP'];
        ACTION_FILTER_P: StoreStates['filterP'];
        ACTION_SELECTION_ITEM_P: StoreStates['selectedIdsP'];
    }
}
