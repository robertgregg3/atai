import { ActionProps, stateEnums } from '@context/reducer';
import { getAuth, signOut } from '@firebase/auth';
import firebase from 'firebase/compat/app';

type dispatchProps = (action: ActionProps) => void;

interface logoutUserProps {
  dispatch: dispatchProps,
  onError?: () => void
}

const logoutUser = async ({dispatch, onError}: logoutUserProps) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch({
        type: stateEnums.SET_USER,
        payload: {
          user: null,
          displayName: "",
        },
      });
    } catch (error) {
      if(onError) {
        onError();
      }
      console.error("Logout failed:", error);
    }
}

export default logoutUser;