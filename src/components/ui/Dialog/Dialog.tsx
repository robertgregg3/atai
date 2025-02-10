import { useContext } from "react";
import { IconOnlyButton } from "../buttons";
import { StateContext } from "@context/StateProvider";
import { useHandleDialog } from "./hooks/useDialog";
import './Dialog.css';

export const Dialog: React.FC<{ children: React.ReactNode }> = () => {
    const { state } = useContext(StateContext);
    const { dialogContent, showDialog } = state;
    const { handleDialogClick } = useHandleDialog();
    
    const handleDialogClickOutside = () => handleDialogClick(null);
    
    return (
        <>
            <div className='dialog-mask' onClick={() => handleDialogClickOutside()}></div>
            <dialog open={showDialog}>
                <IconOnlyButton 
                    icon={<span>&times;</span>}
                    handleClick={() =>  handleDialogClick(null)}
                    ariaLabel="Close Dialog"
                    autofocus={true}
                    className='dialog-close'
                />
                <div className="dialog-content" data-testid='dialog-content'>
                    {dialogContent}
                </div>
            </dialog>
        </>
    )
}