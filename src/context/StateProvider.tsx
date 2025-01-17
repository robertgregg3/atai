import { createContext, Dispatch, useEffect, useMemo, useReducer, useState } from 'react';
import stateReducer, { ActionProps, initialState, InitialStateProps, stateEnums } from './reducer';
import { auth } from "../firebaseConfig";
import { updateUser, fetchData } from '@utils';

export const StateContext = createContext<{
    state: InitialStateProps,
    dispatch: Dispatch<ActionProps>
}>({
    state: initialState,
    dispatch: () => null
});

export const StateProvider = ({ children  }: { children: React.ReactNode }) => {
    const [ state, dispatch ] = useReducer<React.Reducer<InitialStateProps, ActionProps>>(stateReducer, initialState);
    const [ isDataInitilaised, setIsDataInitialised ] = useState<boolean>(false);
    const [ isAuthChecked, setIsAuthChecked ] = useState<boolean>(false);

    console.log("Render StateProvider:", { isDataInitilaised, isAuthChecked, state });

    // once all auth / data checks are done set loading to false
    useEffect(() => {
        if (isAuthChecked && isDataInitilaised) {
            dispatch({ type: stateEnums.SET_LOADING, payload: false });
        }
    }, [isDataInitilaised, isAuthChecked])

    // Handle user authentication changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            updateUser({ authUser, dispatch });
            setIsAuthChecked(true);
        });
    
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    // Fetch initial data for the app using the mocked API
    useEffect(() => {
        fetchData({ dispatch, setIsDataInitialised });
    }, []);

    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}
