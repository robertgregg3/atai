import './IconOnlyButton.css';

export interface IconOnlyButtonProps {
    handleClick: (e: React.FormEvent<HTMLButtonElement>) => void;
    icon: JSX.Element | null;
    className?: string;
    ariaLabel: string;
    autofocus?: boolean;
}

export const IconOnlyButton = ({ handleClick, icon, className, ariaLabel, autofocus }: IconOnlyButtonProps) => {
    const getClassNames = () => {
        return `icon-only-button ${className ? className : ''}`;
    }
  return ( 
    <button 
      onClick={handleClick} 
      className={getClassNames()}
      aria-label={ariaLabel}
      autoFocus={autofocus ?? false}
    >
        {icon}
    </button>
  )
}
