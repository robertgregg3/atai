import './IconOnlyButton.css';

interface IconOnlyButtonProps {
    handleClick: (e: React.FormEvent<HTMLButtonElement>) => void;
    icon: JSX.Element | null;
    className?: string;
}

const IconOnlyButton = ({ handleClick, icon, className} : IconOnlyButtonProps) => {
    const getClassNames = () => {
        return `icon-only-button ${className ? className : ''}`;
    }
  return ( 
    <button onClick={handleClick} className={getClassNames()}>
        {icon}
    </button>
  )
}

export default IconOnlyButton