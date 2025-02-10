import { Button } from "@components/ui";
import { stateEnums } from "@context/reducer";
import { StateContext } from "@context/StateProvider";
import { useContext, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Audio } from "react-loader-spinner";
import './ProfileContent.css';

type UpdateMessageType = 'Your profile was successfully updated' | 'There was an error updating your profile' | null;

interface State {
    displayName: string;
    email: string;
}

interface Action {
    type: string;
    payload: {
        displayName: string;
        email: string;
    };
}

export const ProfileContent: React.FC = () => {
    const { state, dispatch } = useContext(StateContext) as { state: State; dispatch: React.Dispatch<Action> };
    const { displayName, email } = state;
    const [ updatedDisplayName, setUpdatedDisplayName ] = useState<string>(displayName);
    const [ processingUpdate,  setProcessingUpdate ] = useState<boolean>(false)
    const [ updateMessage,  setUpdateMessage ] = useState<UpdateMessageType>(null)

    const handleSave = () => {
        setProcessingUpdate(true)

        setTimeout(() => {             
            const auth = getAuth();
            
            if (auth.currentUser) {
                updateProfile(auth.currentUser, {
                    displayName: updatedDisplayName,
                }).then(() => {
                    dispatch({
                        type: stateEnums.UPDATE_USER,
                        payload: {
                            displayName: updatedDisplayName,
                            email: 'iamrobertgregg@gmail.com',
                        }
                    });
                    setProcessingUpdate(false);
                    setUpdateMessage('Your profile was successfully updated')
                });
            }
        }, 1000)
    };

    const handleUpdateDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedDisplayName(e.target.value);
    };

    const prodcessingSpinner = <Audio
        height="25"
        width="25"
        color="#10a8a9"
        ariaLabel="audio-loading"
        visible={true}
    />
    
    return (
        <div data-testid='profile-content'>
            <div className='profile__content-block'>
                <h3>Profile Details</h3>
            </div>
            <div className='profile__content-block'>
                <h5>User name:</h5>
                <input type="text" placeholder={displayName} onChange={handleUpdateDisplayName} />
            </div>
            <div className='profile__content-block'>
                <h5>Email:</h5>
                <input type="text" placeholder={email} disabled />
            </div>
            <div className='profile__content-block'>
                <Button 
                    handleClick={handleSave} 
                    text={`${processingUpdate ? 'Saving' : 'Save'}`} 
                    icon={processingUpdate ? prodcessingSpinner : <></>} 
                />
            </div>
            <span className='updated-message'>{updateMessage} </span>
        </div>
    );
};