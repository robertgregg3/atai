import { createContext, Dispatch, useEffect, useMemo, useReducer } from 'react';
import stateReducer, { ActionProps, initialState, InitialStateProps, stateEnums } from './reducer';
import { auth } from "../firebaseConfig";
import { fetchChartData } from '../api/mockApi';
import csvFile from "../data/static-data.csv?raw";

export const StateContext = createContext<{
    state: InitialStateProps,
    dispatch: Dispatch<ActionProps>
}>({
    state: initialState,
    dispatch: () => null
});

export const StateProvider = ({ children  }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer<React.Reducer<InitialStateProps, ActionProps>>(stateReducer, initialState);

    let isDataInitialized = false;
    let isAuthChecked = false;

    const checkLoadingComplete = () => {
        if (isDataInitialized && isAuthChecked) {
            dispatch({ type: stateEnums.SET_LOADING, payload: false });
        }
    };

    // Handle user authentication changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch({
                    type: stateEnums.SET_USER,
                    payload: {
                        user: authUser,
                        displayName: authUser.displayName || "Unknown",
                    },
                });
                isAuthChecked = true;
                checkLoadingComplete();
            } else {
                dispatch({ 
                    type: stateEnums.SET_USER,
                    payload: {
                        user: null,
                        displayName: "",
                    },
                 });
                 isAuthChecked = true;
                 checkLoadingComplete();
            }
        });
    
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    // Fetch initial data for the app using the mocked API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchChartData();
                dispatch({
                    type: stateEnums.SET_DATA,
                    payload: data,
                });
                isDataInitialized = true;
                checkLoadingComplete();
            } catch (error) {
                console.error("Error fetching mocked data:", error);
            }
        };

        fetchData();
    }, [csvFile]);

    // for development purpose and will leave in for production
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
