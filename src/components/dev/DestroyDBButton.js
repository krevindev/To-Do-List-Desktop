import { useContext } from "react";
import { destroyDB } from "../../db/pouchUtils";
import { GlobalContext } from "../../hooks/useGlobalContext";

const DestroyDBButton = () => {

    const { updateCategs } = useContext(GlobalContext);

    return (
        <div
            onClick={() => {
                try{
                    destroyDB().then(res => updateCategs()).catch(err => console.error(err));
                }catch(err){
                    console.error(err)
                }
            }}
            className="fixed right-0 top-0 bg-red-700 py-1 px-3 rounded-md cursor-pointer hover:animate-pulse">
            Destroy Database
        </div >
    );
}

export default DestroyDBButton;