import React, { useState, useEffect } from 'react';
import close from "../img/close-bold-svgrepo-com.svg";

function PopupWindow({ details, isOpen, onClose, onConfirm }) {
    const [symbol, setSymbol] = useState(details.symbol || '');
    const [orderSide, setOrderSide] = useState(details.order_side || 'buy');
    const [qty, setQty] = useState(details.qty || '');
    const [unitPrice, setUnitPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // prices for symbols
        if(symbol === 'APPL') setUnitPrice(172.67);
        else if(symbol === 'ADBE') setUnitPrice(558.20);
        else if(symbol === 'ADI') setUnitPrice(164.38);
        else if(symbol === 'KDP') setUnitPrice(30.86);
        else setUnitPrice(180.00);
 
        // Calculate the total price when "qty" or "unitPrice" changes
        const parsedQty = parseFloat(qty);
        const parsedUnitPrice = parseFloat(unitPrice);

        if (!isNaN(parsedQty) && !isNaN(parsedUnitPrice)) {
            const calculatedTotalPrice = parsedQty * parsedUnitPrice;
            setTotalPrice(calculatedTotalPrice.toFixed(2));
        }
    }, [qty, unitPrice]);

    const handleConfirm = () => {
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

                    <div className="popup-fields">
                        <div className="popup-field">
                            <label>
                                Symbol:
                                <input
                                    type="text"
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="popup-field">
                            <label>
                                Order Side:
                                <select
                                    value={orderSide}
                                    onChange={(e) => setOrderSide(e.target.value)}
                                >
                                    <option value="buy">Buy</option>
                                    <option value="sell">Sell</option>
                                </select>
                            </label>
                        </div>

                        <div className="popup-field">
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="popup-field">
                            <label>
                                Unit Price:
                                <input
                                    type="number"
                                    value={unitPrice}
                                    disabled
                                />
                            </label>
                        </div>

                        <div className="popup-field">
                            <label>
                                Total Price:
                                <input
                                    type="number"
                                    value={totalPrice}
                                    disabled
                                />
                            </label>
                        </div>
                    </div>

                    <div className="popup-buttons">
                        <button className='popup-confirm-btn' onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        )
    );
}

export default PopupWindow;
