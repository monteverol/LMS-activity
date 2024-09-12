import React from 'react';

const AddBookModal = () => {
    return(
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box max-w-[95%] p-0 flex flex-col">
                <div className="bg-[#467DB6] w-full px-8 py-4 rounded-xl shadow-md">
                    <h1 className="text-white text-4xl font-bold"> Book Details </h1>
                </div>
                <div className="flex flex-row p-8 gap-8">
                    <div className="bg-[#E2ECF5] h-[25rem] w-[25rem] rounded-xl flex items-center justify-center">
                        <h1 className="text-[#6D6D6D] font-bold text-4xl">PHOTO</h1>
                    </div>
                    <div className="h-[25rem] flex flex-col items-end justify-between w-full">
                        {/* TITLE INPUT */}
                        <div className="bg-[#E2ECF5] flex flex-row w-full rounded-2xl shadow-md">
                            <div className="bg-[#D2E0ED] flex items-center justify-center w-60 h-24 rounded-2xl shadow-md">
                                <h1 className="text-[#1E456D] font-bold text-2xl">Title</h1>
                            </div>
                            <input className="px-8 py-4 text-4xl font-bold w-full outline-none bg-transparent" type="text" />
                        </div>
                        {/* END OF TITLE INPUT */}
                        
                        {/* AUTHOR INPUT */}
                        <div className="bg-[#E2ECF5] flex flex-row w-full rounded-2xl shadow-md">
                            <div className="bg-[#D2E0ED] flex items-center justify-center w-60 h-24 rounded-2xl shadow-md">
                                <h1 className="text-[#1E456D] font-bold text-2xl">Author</h1>
                            </div>
                            <input className="px-8 py-4 text-4xl font-bold w-full outline-none bg-transparent" type="text" />
                        </div>
                        {/* END OF AUTHOR INPUT */}

                        {/* ADD BUTTON */}
                        <div className="bg-[#467DB6] px-16 py-8 flex items-center justify-center rounded-2xl shadow-md cursor-pointer">
                            <h1 className="text-white font-bold text-4xl">Add Book</h1>
                        </div>
                        {/* END OF ADD BUTTON */}
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default AddBookModal;