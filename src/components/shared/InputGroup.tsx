interface InputGroupProps {
    className?: string;
    type?: string;
    placeholder?: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // <-- add this
}

export default function InputGroup({
    name, className = "", type="text", placeholder="", value="", required=false, disabled=false, onChange
}: InputGroupProps) {
    return (
        <div className="flex flex-col gap-y-2">
            <label className="text-left" htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            <input 
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                value={value}
                onChange={onChange}
                className={`text-heading-3 font-normal text-base md:text-lg lg:text-xl p-2 border-b-3 min-w-max ${disabled? "rounded-t-lg bg-platinum" : "outline-none" }${className}`}
            />
        </div>
    );
};