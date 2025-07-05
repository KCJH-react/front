interface ButtonProps {
  children: string;
  className?: string;
}

const Button = ({ children, className = '' }: ButtonProps) => {
  return (
    <button
      className={`
        rounded-sm
        bg-[#A9D18E] //00EA5E B2C8B2 A8C3A0 C2D6A4 A9D18E D2E4C4 
        text-white
        px-4 py-2
        transition
        duration-300
        hover:bg-green-500
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
