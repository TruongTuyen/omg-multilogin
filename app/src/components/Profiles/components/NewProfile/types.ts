export interface FieldItem {
    label: string;
    value: unknown;
}

export interface Fields {
    profileName: FieldItem;
}

export type ActionType = {
    type: 'UPDATE';
    payload: FieldItem[keyof FieldItem] & { key: string };
};
