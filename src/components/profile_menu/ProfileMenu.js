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
            className={`absolute top-[120%] h-fit w-fit min-w-[250px] border bg-color2 z-20 rounded-2xl flex flex-col items-center justify-start p-5` + className}
        >
            <div className="w-full h-10 flex items-center justify-end">
                <button
                    onClick={() => setIsProfileMenu(false)}
                    className="h-8 w-8 mr-2 p-2 hover:bg-baseColor rounded-full"
                >
                    <img className="h-[60%] m-auto" src="/images/icons/exit-icon.svg" />
                </button>
            </div>
            {/* <div className="w-full flex flex-col justify-center items-center">
                <div className="rounded-full bg-purple-400 w-11 h-11 flex items-center justify-center mb-3">
                    <h1 className="font-bold">K</h1>
                </div>
                <h1>Kyle Revin</h1>
            </div> */}
            <div className="w-full flex flex-col items-stretch m-3">
                <button className="w-fit min-w-full hover:bg-baseColor p-3 text-sm flex items-center">
                    <img className="w-7 h-7 mr-1" src="/images/icons/settings-icon.svg" />
                    Settings
                </button>
                <button className="w-fit  min-w-full hover:bg-baseColor p-3 text-sm flex items-center">
                    <img className="w-7 h-7 mr-1" src="/images/icons/plus-icon.svg" />Add Account</button>
                <button className=" w-fit  min-w-full hover:bg-baseColor p-3 text-sm flex items-center">
                    <img className="w-7 h-7 mr-1" src="/images/icons/signout-icon.svg" />Sign Out</button>
            </div>

        </div>
    );
}

export default ProfileMenu;