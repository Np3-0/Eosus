import Button from "./Button";

interface ModalProps {
    postData: {
        title: string;
        content: string;
        type: string;
        subType: string;
        image: string | null;
        lat: number;
        long: number;
        townName: string | null;
    };
    isOpen: boolean;
    onClose: () => void;
    data: Array<{ lat: number; long: number; name: string }>;
    changeHandler: (updatedData: ModalProps["postData"]) => void;
}

export default function Modal({ isOpen, onClose, data, changeHandler, postData }: ModalProps) {
    return (
        <>
            <div
                id="select-modal"
                tabIndex={-1}
                aria-hidden={!isOpen}
                className={`${isOpen ? "" : "hidden"} fixed inset-0 z-50 flex items-center justify-center overflow-hidden w-full h-full`}
            >
                <div className="relative p-4 w-full max-w-lg max-h-full">
                    <div className="relative rounded-lg shadow-sm bg-platinum">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                            <div className="flex-1 flex justify-center">
                                <h3 className="text-lg font-semibold text-heading-1 text-center">
                                    Multiple Locations Found
                                </h3>
                            </div>
                        </div>
                        <div className="p-4 md:p-5">
                            <p className="text-heading-2 mb-4">Please select the correct one:</p>
                            <ul className="space-y-4 mb-4">
                                {data.map((item, index) => (
                                    
                                    <li key={index}>
                                        <input
                                            type="radio"
                                            id={`place-${index}`}
                                            name="job" value={`place-${index}`}
                                            className="hidden peer"
                                            required
                                            onClick={() => {
                                                changeHandler({
                                                    ...postData,
                                                    lat: item.lat,
                                                    long: item.long,
                                                    townName: item.name
                                                });
                                            }} />
                                        <label
                                            htmlFor={`place-${index}`}
                                            className="inline-flex items-center justify-between w-full p-5 text-heading-1
                                                        rounded-lg cursor-pointer bg-box-bg border-2 border-gray-300
                                                        peer-checked:border-cordovan transform transition hover:scale-[1.05]"
                                        >
                                            <div className="block">
                                                <div className="w-full text-lg font-semibold">{item.name}</div>
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-center">
                                <Button 
                                    className="text-white font-semibold text-lg transform transition hover:scale-[1.05]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!postData.lat || !postData.long || !postData.townName) {
                                            alert("Please select a location.");
                                            return;
                                        }
                                        onClose();
                                    }}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};
