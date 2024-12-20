import './Button.css';

interface ButtonProps {
    handleClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
    icon?: JSX.Element | null;
    text: string;
    className?: string;
    textCenter?: boolean;
    iconOnRight?: boolean;
    tabIndex?: number;
    type?: | "submit" | "reset" | "button" | undefined;
}

const Button = ({ 
    handleClick, 
    icon = null, 
    text, 
    className = '', 
    textCenter = false, 
    iconOnRight = false,
    tabIndex,
    type = 'button'
}: ButtonProps) => {
    
    const getClassNames = () => {
        const centerText = textCenter ? 'button--text-center' : '';
        const withIcon = icon ? 'button__with-icon' : '';
        const iconRight = iconOnRight ? 'icon-on-right' : '';
        const customClassName = className ? className : '';

        return `${centerText} ${withIcon} ${iconRight} ${customClassName}`;
    }

    return ( 
        <button 
            onClick={handleClick} 
            className={getClassNames()}
            aria-label={text}
            tabIndex={tabIndex}
            type={type}
        >
            {icon && icon} {text}
        </button>
    )
}

export default Button