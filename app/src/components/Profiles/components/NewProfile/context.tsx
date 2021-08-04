import React from 'react';

import createReducerContext, {
    context,
} from '../../../../hooks/factory/createReducerContext';

export { context };

type Action = 'Update';
interface ActionType {
    type: Action;
    payload: Record<string, any>;
}

const reducer = (
    state: Partial<Record<string, any>> = {},
    action: ActionType
) => {
    switch (action.type) {
        case 'Update': {
            console.log('action.payload', action.payload);
            return {
                ...state,
                ...action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

const SharedProfileProvider = createReducerContext(reducer, {});

export const ProfileContext: React.FunctionComponent = ({ children }) => {
    return <SharedProfileProvider>{children}</SharedProfileProvider>;
};
