import { stateEnums } from '@context/reducer';
import { StateContext } from '@context/StateProvider';
import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const { dispatch } = useContext(StateContext);
    const navigate = useNavigate();

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          dispatch({
            type: stateEnums.SET_USER,
            payload: {
              user: null,
              displayName: "",
            },
          });
        });
        navigate("/");
    }

    return logout;
}

export default useLogout;