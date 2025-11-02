import { CheckIcon } from "@/components/ui/Icon";

interface SortItemProps {
  label: string; 
  isSelected: boolean
  onChange: () => void;
}

export default function SortItem({
    label, 
    isSelected,
    onChange,
}: SortItemProps) {
    return (
        <label
            className="flex items-center gap-2 cursor-pointer select-none"
            >
            <input
                type="checkbox"
                className="peer sr-only"
                checked={isSelected}
                onChange={onChange}
            />
            <div
                className={`
                w-5 h-5 border rounded flex items-center justify-center 
                text-white transition-colors
                border-gray-300 
                peer-checked:bg-[var(--brand)] peer-checked:border-[var(--brand)]
                `}
            >
                <CheckIcon className="hidden peer-checked:block" />
            </div>
            <span
                className={`text-gray-700 peer-checked:text-[var(--brand)]`}
            >
                {label}
            </span>
            </label>
    );
}
