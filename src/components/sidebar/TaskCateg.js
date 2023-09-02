import { useState } from "react";

const TaskCateg = ({ name, index, isToday, removeCategory, isActive, setActiveCategoryIndex }) => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleClick = (e) => {
        setActiveCategoryIndex(index);
    };

    const themeProp = isActive ? 'bg-color2 border-opacity-100' : 'bg-baseColor border-opacity-0 border-baseColor';

    return (
        <div
            className={`TaskCateg h-fit m-1 p-3 flex flex-col justify-stretch hover:bg-color2 box-border cursor-pointer border rounded-md relative ${themeProp}`}
            onContextMenu={() => setIsMenuVisible(prev => !prev)}
            onClick={handleClick}
        >
            <div className="w-full flex items-center">
                <img
                    src={`/images/icons/${isToday ? 'today-icon.svg' : 'categ-icon.svg'}`}
                    className="mr-5"
                />
                <div className="flex justify-between items-center w-full">
                    <h1 className='text-xs'>{name}</h1>
                    {
                        !isMenuVisible && <span onClick={() => setIsMenuVisible(true)}>...</span>
                    }
                </div>
            </div>

            {
                isMenuVisible && (
                    <div className="top-[50%] left-[50%] h-10 my-2 bg-color2 z-20 flex items-center justify-around p-3 cursor-default">
                        <img className="h-full cursor-pointer" src="/images/icons/complete-icon.svg" />
                        <img className="h-full cursor-pointer" src="/images/icons/edit-icon.svg" />
                        <img className="h-full cursor-pointer" src="/images/icons/delete-icon.svg" onClick={() => removeCategory(index)} />
                    </div>
                )
            }
        </div>
    )
};

export default TaskCateg;