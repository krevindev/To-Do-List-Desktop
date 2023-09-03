import { useContext, useEffect, useRef, useState } from "react";
import { addDoc, getAllDocs } from "../../db/pouchUtils";
import { GlobalContext } from "../../hooks/useGlobalContext";

const NewListModal = ({ setIsNLMVisible }) => {

    const newInputRef = useRef(null);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isNotifVisible, setIsNotifVisible] = useState(false);

    const { updateCategs, setActiveCategoryID } = useContext(GlobalContext);

    const handleClickOutside = e => {
        if (e.target.id == 'new-list-modal-container') {
            setIsNLMVisible(false);
        }
    }

    const handleSaveCategory = async (e) => {
        const newValue = {
            name: newInputRef.current.value,
            count: 20,
            progress: 60
        }

        setIsSaving(true);
        addDoc(newValue).then(res => {
            setTimeout(() => {
                setIsNotifVisible(true);
                setIsSaving(false);
                setTimeout(() => {
                    setIsNLMVisible(false);
                    updateCategs();

                    // getAllDocs().then(doc => setActiveCategoryID(doc.length-1));
                    
                }, 1000);
            }, 1000);
        }).then(err => console.log(err));

    };

    const handleSubmit = e => {
        e.preventDefault();
        handleSaveCategory();
    }


    const handleCancel = e => {
        e.preventDefault();

        setIsNLMVisible(false);
    };

    const handleInputChange = e => {
        setIsConfirmationVisible(e.target.value.length > 0 ? true : false)
    }
    return (
        <div
            onClick={handleClickOutside}
            id="new-list-modal-container"
            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center"
        >
            <div className="bg-color2 rounded-lg min-w-[400px] h-fit min-h-[400px] p-3 flex flex-col relative">
                <h3>New Category</h3>

                <form onSubmit={handleSubmit} className="flex flex-grow flex-col items-stretch justify-between box-border p-4">
                    <input
                        onChange={handleInputChange}
                        ref={newInputRef}
                        className="bg-baseColor outline-none p-3"
                        placeholder="New Category" />

                    <div className="flex select-none">
                        {
                            isConfirmationVisible && <>
                                <div className="flex items-center cursor-pointer mr-7 filter brightness-50 hover:brightness-100">
                                    {
                                        isSaving ? <img className="w-5" src="/images/gif/loading-gif.gif" /> :
                                            <img className=" h-[70%]" src="/images/icons/check-icon.svg" />
                                    }
                                    <button className="mx-2">Save</button>
                                </div>
                                <div className="flex items-center cursor-pointer brightness-50 hover:brightness-100" onClick={handleCancel}>
                                    <img className=" h-[70%]" src="/images/icons/cancel-icon.svg" />
                                    <button className="mx-2">Cancel</button>
                                </div>
                            </>
                        }
                    </div>
                </form>
                {
                    isNotifVisible && <div id="success-new-categ"
                        className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.9)] flex items-center justify-center">
                        <div className="w-[80%] h-[50%] bg-color2 rounded-md flex flex-col justify-center items-center">
                            <img src="/images/gif/done.gif" />
                            <h1 className="text-xl font-bold">Saved</h1>
                        </div>
                    </div>
                }

            </div>

        </div>
    );
}

export default NewListModal;