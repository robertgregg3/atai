import { createContext, Dispatch, useEffect, useMemo, useReducer } from 'react';
import stateReducer, { ActionProps, initialState, InitialStateProps } from './reducer';

export const StateContext = createContext<{
    state: InitialStateProps,
    dispatch: Dispatch<ActionProps>
}>({
    state: initialState,
    dispatch: () => null
});

export const StateProvider = ({ children }: { children: React.ReactNode}) => {
    const [state, dispatch] = useReducer<React.Reducer<InitialStateProps, ActionProps>>(stateReducer, initialState);

    useEffect(() => {
        console.log('state', state)
    }, [state])

    const contextValue = useMemo(() => ({
        state, 
        dispatch,
    }), [state, dispatch]);

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )

}