import { createContext, Dispatch, useEffect, useMemo, useReducer } from 'react';
import stateReducer, { ActionProps, initialState, InitialStateProps, stateEnums } from './reducer';
import { auth } from "../firebaseConfig";
import { CsvDataProps } from '@components/charts/chart.types';



export const StateContext = createContext<{
    state: InitialStateProps,
    dispatch: Dispatch<ActionProps>
}>({
    state: initialState,
    dispatch: () => null
});

export const StateProvider = ({ children, initialData  }: { children: React.ReactNode, initialData: CsvDataProps[] | unknown }) => {
    const [state, dispatch] = useReducer<React.Reducer<InitialStateProps, ActionProps>>(stateReducer, initialState);

    useEffect(() => {
        dispatch({ type: stateEnums.SET_LOADING, payload: true });
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch({
                    type: stateEnums.SET_USER,
                    payload: {
                        user: authUser,
                        displayName: authUser.displayName || "Unknown",
                    },
                });
            }

            // Set initial data for the app
            if (initialData) {
                dispatch({
                    type: stateEnums.SET_DATA,
                    payload: initialData,
                });
            }

            dispatch({ type: stateEnums.SET_LOADING, payload: false });

            return () => unsubscribe(); // Cleanup subscription on unmount
        });
    }, [initialData]);

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
