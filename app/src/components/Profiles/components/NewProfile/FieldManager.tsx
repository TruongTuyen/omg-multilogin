import React from 'react';

import type { ActionType, FieldItem, Fields } from './types';

const ActionReducer = (state: Fields, action: ActionType) => {
    switch (action.type) {
        case 'UPDATE': {
            const key = action.payload.key;
            return {
                ...state,
                profileName: {},
            };
        }

        default: {
            return { ...state };
        }
    }
};
