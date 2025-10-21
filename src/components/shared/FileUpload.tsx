import { useRef } from "react";

interface FileUploadProps {
    uploadFunction?: (file: File) => void;
}

export default function FileUpload({ uploadFunction }: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (uploadFunction && file) {
            console.log("Running")
            uploadFunction(file);
        }
    }

    return (
        <>
            <button 
                type="button" 
                className="cursor-pointer bg-cordovan px-6 py-3 rounded-full min-w-max lg:w-1/3 text-white transform transition duration-300 hover:scale-[1.02] mt-2 lg:mt-0" 
                onClick={handleClick}
            >
                Upload File
            </button>
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleChange}
            />
        </>
    );
}