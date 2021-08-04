import React from 'react';

interface R extends React.Reducer<any, any> {}

export const context = React.createContext<
    [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>] | undefined
>(undefined);

const createReducerContext = (
    reducer: R,
    defaultInitialState: React.ReducerState<R>
) => {
    const providerFactory = (
        props:
            | (React.Attributes &
                  React.ProviderProps<
                      | [
                            React.ReducerState<R>,
                            React.Dispatch<React.ReducerAction<R>>
                        ]
                      | undefined
                  >)
            | null
            | undefined,
        children: {} | null | undefined
    ) => React.createElement(context.Provider, props, children);

    const ReducerProvider: React.FunctionComponent<{
        initialState?: React.ReducerState<R>;
    }> = ({ children, initialState }) => {
        const state = React.useReducer<R>(
            reducer,
            initialState !== undefined ? initialState : defaultInitialState
        );

        return providerFactory({ value: state }, children);
    };

    return ReducerProvider;
};

export default createReducerContext;
