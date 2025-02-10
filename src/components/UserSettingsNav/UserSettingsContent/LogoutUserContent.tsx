import { Button, useToast } from "@components/ui";
import { useHandleDialog } from "@components/ui/Dialog/hooks/useDialog";
import { useLogoutUser } from "@hooks/useLogoutUser";
import { TOAST_DURATION } from "@utils/constants";

export const LogoutContent = ({ navigate }: { navigate: (arg: string) => void}) => {
    const { addToast } = useToast();
    const { logoutUser } = useLogoutUser();
    const { handleDialogClick } = useHandleDialog();

    const handleLogout = () => {
        logoutUser();
        addToast({
          id: 1,
          message: 'Logout successful',
          position: 'bottom-right',
          status: 'info',
          duration: TOAST_DURATION
        })
        handleDialogClick(null)
        navigate('/login');
      }
    return (
        <>
            <p>Are you sure you want to logout?</p>
            <div className="button-container" data-testid='logout-content'>
                <Button
                    handleClick={handleLogout}
                    text="Logout"
                    className='user-settings-nav___logout'
                />
                <Button
                    handleClick={() => handleDialogClick(null)}
                    text="Cancel"
                    className='user-settings-nav___cancel'
                />
            </div>
        </>
    )
}