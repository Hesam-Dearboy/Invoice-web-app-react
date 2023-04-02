import React from 'react'

function DeleteModal({ invoiceId,onDeleteButtonClick, setIsDeleteModalOpen }) {
    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setIsDeleteModalOpen(false);
            }}
            className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex bg-[#000005be] ">
            {/* Delete Modal  */}

            <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl ">
                <h3 className=" font-bold text-red-500 text-xl  ">
                    Confirm Deletion
                </h3>

                <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
                    Are you sure you want to delete invoice {invoiceId}? This action cannot be undone.
                </p>

                <div className=" flex w-full mt-4 items-center justify-center space-x-4 ">
                    <button
                        onClick={onDeleteButtonClick}
                        className="w-full items-center text-white hover:opacity-75 bg-red-500 py-2 rounded-full"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="w-full items-center text-[#635fc7] dark:bg-white hover:opacity-75 bg-[#635fc71a]  py-2 rounded-full"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal