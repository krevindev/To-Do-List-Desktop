import './NewListModal.css';
import { useContext, useEffect, useRef, useState } from "react";
import { addDoc, getAllDocs } from "../../../db/pouchUtils";
import { GlobalContext } from "../../../hooks/useGlobalContext";
import moment from "moment/moment";

const NewListModal = () => {

    const newInputRef = useRef(null);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isNotifVisible, setIsNotifVisible] = useState(false);
    const [notifState, setNotifState] = useState();

    const { updateCategs, setActiveCategoryID, setIsModalVisible } = useContext(GlobalContext);

    const handleClickOutside = e => {
        if (e.target.id == 'new-list-modal-container') {
            setIsModalVisible(false);
        }
    }

    const handleSaveCategory = async (e) => {
        if (isConfirmationVisible) {

            const newValue = {
                name: newInputRef.current.value,
                tasks: [],
                dateTimeCreated: moment().format('YYYY-MM-DD HH-mm-ss'),
            }

            setIsSaving(true);  // play the loading gif

            // add the new category to database
            addDoc(newValue).then(res => {

                // adds delay to show the loading gif
                setTimeout(() => {
                    setIsNotifVisible(true);
                    setIsSaving(false);

                    // delay for closing the NLM to show the success or error message
                    setTimeout(() => {
                        getAllDocs().then(doc => setActiveCategoryID(doc.length - 1));
                        setIsModalVisible(false);
                        updateCategs();
                    }, 2000);
                }, 600);
            }).catch(err => {
                console.log(err);
                setNotifState('error');
                setIsNotifVisible(true);
                setIsSaving(false);

                setTimeout(() => {
                    setIsNotifVisible(false);
                }, 1000);
            });
        }

    };

    const handleSubmit = e => {
        e.preventDefault();
        handleSaveCategory();
    }


    const handleCancel = e => {
        e.preventDefault();

        setIsModalVisible(false);
    };

    const handleInputChange = e => {
        setIsConfirmationVisible(e.target.value.length > 0 ? true : false)
    }
    return (
            <div className="bg-color2 rounded-lg min-w-[400px] h-fit p-3 flex flex-col relative">

                <form onSubmit={handleSubmit} className="flex flex-grow flex-col w-full items-stretch justify-around box-border p-4 relative">
                    <h3 className="text-2xl font-semibold">Add New Category</h3>

                    <input
                        onChange={handleInputChange}
                        ref={newInputRef}
                        className="bg-baseColor outline-none p-3 my-10 flex placeholder:text-gray-600"
                        placeholder="Category Name" />

                    <div className={`flex justify-around select-none bottom-0 }`}>
                        <div className={`confirm-btn ${isConfirmationVisible ? 'flex' : 'hidden'}`} onClick={handleSubmit}>
                            {
                                isSaving ? <img className="w-5" src="/images/gif/loading-gif.gif" /> :
                                    <img className=" h-[70%]" src="/images/icons/check-icon.svg" />
                            }
                            <button className="mx-2">Save</button>
                        </div>
                        <div className="confirm-btn flex" onClick={handleCancel}>
                            <img className=" h-[70%]" src="/images/icons/cancel-icon.svg" />
                            <button className="mx-2">Cancel</button>
                        </div>
                    </div>
                </form>
                {
                    isNotifVisible && <div id="success-new-categ"
                        className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.9)] flex items-center justify-center">
                        <div className="w-[80%] h-fit min-h-[50%] bg-color2 rounded-md flex flex-col justify-center items-center p-3 border">
                            <img src={`/images/gif/${notifState=='error'?'error':'done'}.gif`} />
                            <h3 className="text-xl font-bold">{notifState=='error'?'Error Saving':'Saved'}</h3>
                            <h1 className="text-xl font-bold">'{newInputRef.current.value}'</h1>
                        </div>
                    </div>
                }

            </div>
    );
}

export default NewListModal;