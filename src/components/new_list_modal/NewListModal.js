const NewListModal = ({ setIsNLMVisible }) => {

    const handleClickOutside = e => {
        if (e.target.id == 'new-list-modal-container') {
            setIsNLMVisible(false);
        }
    }

    return (
        <div
            onClick={handleClickOutside}
            id="new-list-modal-container"
            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60"
        >
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-color2 rounded-lg min-w-[400px] h-fit min-h-[400px] p-3">
                <h3>New Category</h3>

                <form className="bg-blue-400 h-full w-full flex flex-col items-center justify-around">
                    <input placeholder="New Category" />
                    <div className="rounded-full w-10 h-10 bg-violet-500">
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewListModal;