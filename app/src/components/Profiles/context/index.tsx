import React from 'react';

import type { ProfilesTypes } from '../types';

export const ProfilesContext = React.createContext({
    selectedAll: false,
    filter: {
        search: '',
    },
} as ProfilesTypes);
