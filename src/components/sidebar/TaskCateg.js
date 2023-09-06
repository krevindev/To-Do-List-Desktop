import { useContext, useState } from "react";
import CircularProgress from '../circular_progress/CircularProgress';
import { deleteDoc, getAllDocs } from "../../db/pouchUtils";
import { GlobalContext } from "../../hooks/useGlobalContext";


const TaskCateg = ({ id, key, tasksLeft, name, isActive, setActiveCategoryID, progress }) => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { updateCategs, setIsModalVisible, displayModal } = useContext(GlobalContext);
    const [isEditable, setIsEditable] = useState(false);

    const handleClick = (e) => {
        setActiveCategoryID(id);
    };

    const handleDelete = () => {
        deleteDoc(String(id)).then(res => {
            updateCategs();
            setActiveCategoryID('')
        }).catch(err => err);
    }

    const themeProp = isActive ? 'bg-color2 border-opacity-100' : 'bg-baseColor border-opacity-0 border-baseColor';

    return (
        <div
            key={key}
            className={`TaskCateg h-fit m-1 p-3 flex flex-col justify-stretch hover:bg-color2 box-border cursor-pointer border rounded-md relative ${themeProp}`}
            onContextMenu={() => setIsMenuVisible(prev => !prev)}
            onClick={handleClick}
        >
            <div className="w-full flex items-center">
                <CircularProgress percentage={progress} className="w-5 mr-3" size={7} strokeWidth={2} />
                {/* <img
                    src={`/images/icons/${isToday ? 'today-icon.svg' : 'categ-icon.svg'}`}
                    className="mr-5"
                /> */}
                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col justify-center">
                        {/* <h1 className='text-sm'>{name}</h1> */}
                        <input className="w-full bg-[rgba(0,0,0,0)] outline-none placeholder:text-white cursor-pointer" placeholder={name} readOnly></input>
                        <p className=" text-[10px] text-gray-400 m-1">{tasksLeft} Tasks Left</p>
                    </div>
                    {
                        !isMenuVisible && <span onClick={() => setIsMenuVisible(true)}>...</span>
                    }
                </div>
            </div>

            {
                isMenuVisible && (
                    <div className="top-[50%] left-[50%] h-10 my-2 bg-color2 z-20 flex items-center justify-around p-3 cursor-default">
                        <img title="Mark as Complete" className="h-full cursor-pointer" src="/images/icons/complete-icon.svg" />
                        <img title="Rename" className="h-full cursor-pointer" src="/images/icons/edit-icon.svg" />
                        <img title="Delete Category" onClick={() => displayModal('confirm-delete-modal')} className="h-full cursor-pointer hover:saturate-[300%]" src="/images/icons/delete-icon.svg" />
                    </div>
                )
            }
        </div>
    )
};


export default TaskCateg;