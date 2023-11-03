import React, { useState } from 'react';
import close from "../img/close-bold-svgrepo-com.svg";

function PopupWindow({ isOpen, onClose, onConfirm }) {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');

    const handleConfirm = () => {
        // Handle the confirmation action, e.g., save data
        onConfirm({ field1, field2 });
        onClose();
    };

    return (
        isOpen && (
            <div className="popup-overlay">
                <div className="popup-content">
                    <div className="popup-header">
                        <h3>Order Ticket</h3>
                        <img className='btn-close' src={close} alt="Close Icon" onClick={onClose} />
                    </div>

                    <div>
                        <label>
                            Action:
                            <input
                                type="text"
                                value={field1}
                                onChange={(e) => setField1(e.target.value)}
                            />
                        </label>
                        <label>
                            Quantity:
                            <input
                                type="text"
                                value={field2}
                                onChange={(e) => setField2(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="popup-buttons">
                        <button onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        )
    );
}

export default PopupWindow;
