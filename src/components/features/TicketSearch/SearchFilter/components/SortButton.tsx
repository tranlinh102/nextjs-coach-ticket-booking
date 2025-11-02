interface SortButtonProps {
  text: string; 
  isSelected: boolean
  onClick: () => void;
}

export default function SortButton({
    text, 
    isSelected,
    onClick,
}: SortButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
            px-3 py-1 border rounded-lg transition-colors cursor-pointer
            ${
                isSelected
                ? `border-[var(--brand)] text-[var(--brand)] bg-[var(--brand-light)]`
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }
            `}
        >
            {text}
        </button>
    );
}
