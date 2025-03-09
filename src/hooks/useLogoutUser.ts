import { stateEnums } from '@context/reducer';
import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
import { StateContext } from '@context/StateProvider';

export const useLogoutUser = () => {
    const { dispatch } = useContext(StateContext);

    const logoutUser = async () => {  
      try {
        const auth = getAuth();
        await signOut(auth);
        dispatch({
          type: stateEnums.SET_USER,
          payload: {
            user: null,
            displayName: "",
            email: ''
          },
        });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }

    return { logoutUser };
}
