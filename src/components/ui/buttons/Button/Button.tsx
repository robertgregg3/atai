import './Button.css';

interface ButtonProps {
    handleClick: (e: React.FormEvent<HTMLButtonElement>) => void;
    icon?: JSX.Element | null;
    text: string;
    className?: string;
    textCenter?: boolean;
}

const Button = ({ handleClick, icon, text, className, textCenter} : ButtonProps) => {
    const getClassNames = () => {
        return `
            ${textCenter ? 'button--text-center' : ''} 
            ${icon ? 'button__with-icon' : ''} 
            ${className ? className : ''} 
        `;
    }
  return ( 
    <button 
        onClick={handleClick} 
        className={getClassNames()}
    >
        {icon && icon}
        {icon ? <span>{text}</span> : text}
    </button>
  )
}

export default Button