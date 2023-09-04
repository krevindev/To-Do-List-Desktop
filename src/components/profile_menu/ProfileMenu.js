import { useEffect, useRef } from "react";

const ProfileMenu = ({ className, setIsProfileMenu }) => {
    const profileMenuRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = e => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setIsProfileMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div
            ref={profileMenuRef}
            id="profile-menu"
            className={`absolute top-[120%] h-fit w-[250px] border bg-color2 z-20 rounded-2xl flex flex-col items-center justify-start p-3 box-border` + className}
        >
            <div className="w-full h-10 flex items-center justify-end">
                <button
                    onClick={() => setIsProfileMenu(false)}
                    className="h-8 w-8 mr-2 p-2 hover:bg-baseColor rounded-full"
                >
                    <img className="h-[60%] m-auto" src="/images/icons/exit-icon.svg" />
                </button>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="rounded-full bg-purple-400 w-11 h-11 flex items-center justify-center mb-3">
                    <h1 className="font-bold">K</h1>
                </div>
                <h1>Kyle Revin</h1>
            </div>

            <div className="w-full h-10 flex items-center justify-around my-5">
                <button className="w-1/2 hover:bg-blue-500 p-3 text-sm">Add Account</button>
                <button className="w-1/2 hover:bg-violet-500 p-3 text-sm">Sign Out</button>
            </div>

        </div>
    );
}

export default ProfileMenu;