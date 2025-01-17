import { Dispatch } from "react";
import { fetchChartData } from "../api/mockApi";
import { stateEnums } from "@context/reducer";

interface FetchDataProps {
    dispatch: Dispatch<any>,
    setIsDataInitialised: (arg: boolean) => void
}

export const fetchData = async ({ dispatch, setIsDataInitialised }: FetchDataProps) => {
    try {
        const data = await fetchChartData();

        dispatch({
            type: stateEnums.SET_DATA,
            payload: data,
        });
        setIsDataInitialised(true)
    } catch (error) {
        console.error("Error fetching mocked data:", error);
    }

};
