interface Filter {
    [key: string]: any;
}

type selectedAll = boolean;

export interface ProfilesTypes {
    filter: Filter;
    selectedAll: selectedAll;
}
