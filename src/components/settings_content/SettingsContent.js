import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { clearData } from "../../db/pouchUtils";
import { GlobalContext } from "../../hooks/useGlobalContext";

const SettingItem = ({ name }) => {
    return (
        <li className="w-full h-10  my-2 border flex items-center justify-center">{name ? name : "Item"}</li>
    )
}

const SettingsContent = () => {


    const [isConfirmationModal, setIsConfirmationModal] = useState(false);

    return (
        <div className="w-full h-full bg-baseColor flex flex-col items-stretch p-5 box-border relative">
            <header>
                <Link className="w-fit py-1 px-3 rounded-lg flex items-center" to="#" onClick={() => window.history.back()}>
                    <img className="w-8" src="/images/icons/arrow-icon.svg" />
                    <h1 className="text-3x mx-5">Exit</h1>
                </Link>
            </header>
            <div className="h-full  flex items-center justify-center">
                <div className="w-1/2 h-[80%] min-w-[330px]  bg-color2 rounded-lg flex flex-col items-center justify-center">
                    <ul className="w-full h-full flex flex-col justify-center">
                        <SettingItem />
                        <SettingItem />
                        <SettingItem />
                        <div className="w-full p-3">
                            <button onClick={() => setIsConfirmationModal(true)} className="bg-red-700 w-fit min-w-[30px] px-3 py-2 rounded-md">Clear All Data</button>
                        </div>
                    </ul>
                </div>
            </div>

            {
                isConfirmationModal && <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.9)] flex justify-center items-center">
                    <ClearConfirmModal setIsConfirmationModal={setIsConfirmationModal} />
                </div>
            }
        </div >
    );
};

function ClearConfirmModal({ setIsConfirmationModal }) {

    const thisRef = useRef(null);
    const { updateCategs } = useContext(GlobalContext);

    const handleDelete = () => {
        clearData().then(res => setIsConfirmationModal(false)).then(res => updateCategs());
    }

    useEffect(() => {
        const handleClickOutside = e => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setIsConfirmationModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={thisRef} className="bg-baseColor box-border pt-5 rounded-lg flex flex-col items-stretch">
            <h1 className="text-center">Are you sure you want to clear all data?</h1>
            <div className=" flex pt-5 p-2">
                <button className="flex items-center p-5 hover:bg-red-700 rounded-lg" onClick={handleDelete}>
                    <img className="w-5 mx-3" src="/images/icons/check-icon.svg" />
                    <span className="text-xs">Yes, I want to clear all data</span>
                </button>
                <button className="flex items-center p-5 hover:bg-color2 rounded-lg" onClick={() => setIsConfirmationModal(false)}>
                    <img className="w-5 mx-3" src="/images/icons/cancel-icon.svg" />
                    <span className="text-xs">Cancel</span>
                </button>
            </div>
        </div>
    )
}

export default SettingsContent;