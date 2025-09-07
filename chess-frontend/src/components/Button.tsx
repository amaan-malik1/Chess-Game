export const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
    return (
        <button
            onClick={onClick}
            className="
                bg-gradient-to-r from-teal-500 to-blue-500 
                text-white font-semibold 
                py-2 px-6 rounded-lg 
                shadow-md hover:scale-105 hover:from-blue-500 hover:to-teal-500
                active:scale-95 transition-all duration-200 
                focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2
            "
        >
            {children}
        </button>
    );
};
