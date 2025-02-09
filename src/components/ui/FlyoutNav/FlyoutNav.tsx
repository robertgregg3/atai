import './FlyoutNav.css';

type FlyoutFromTypes = 'left' | 'right' | 'top' | 'bottom';

interface FlyoutNavProps {
    children: React.ReactNode;
    showNav: boolean;
    flyoutFrom: FlyoutFromTypes
}

export const FlyoutNav = ({ children, showNav, flyoutFrom = 'right' }: FlyoutNavProps) => {
    return (
        <div 
            className={`flyout-nav ${flyoutFrom} ${showNav ? 'flyout-nav--visible' : ''}`}
            tabIndex={-1}
        >
            {children}
        </div>
    )
}