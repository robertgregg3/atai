import { stateEnums } from "@context/reducer";
import { Dispatch } from "react";
import { User as FirebaseUser } from "firebase/auth";

interface UpdateUserProps {
    authUser: FirebaseUser | null,
    dispatch: Dispatch<any>,
}

export const updateUser = ({ authUser, dispatch }: UpdateUserProps) => {
    try {
        dispatch({
            type: stateEnums.SET_USER,
            payload: {
                user: authUser ? authUser : null,
                displayName: authUser ? authUser.displayName || "Unknown" : '',
                email: authUser ? authUser.email || "Unknown" : '',
            },
        });
    } catch(error) {
        console.log('Error logging in user:', error);
    }
}