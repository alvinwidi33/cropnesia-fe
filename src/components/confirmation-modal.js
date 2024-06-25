import React from 'react';

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-[#055C5B]">Konfirmasi</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-[#EFF5F5] text-black py-2 px-4 rounded-md hover:bg-[#75C4B5] active:bg-[#EFF5F5] transition"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-[#055C5B] text-white py-2 px-4 rounded-md hover:bg-[#2DB296] transition active:bg-[#055C5B]"
                    >
                        Konfirmasi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
