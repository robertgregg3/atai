import './IconOnlyButton.css';

interface IconOnlyButtonProps {
    handleClick: (e: React.FormEvent<HTMLButtonElement>) => void;
    icon: JSX.Element | null;
    className?: string;
    ariaLabel: string;
}

const IconOnlyButton = ({ handleClick, icon, className, ariaLabel} : IconOnlyButtonProps) => {
    const getClassNames = () => {
        return `icon-only-button ${className ? className : ''}`;
    }
  return ( 
    <button 
      onClick={handleClick} 
      className={getClassNames()}
      aria-label={ariaLabel}
    >
        {icon}
    </button>
  )
}

export default IconOnlyButton