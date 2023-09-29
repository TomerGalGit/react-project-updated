import React from "react";
import '../cards/Cards.css'

function ConfirmationDialog({ isOpen, onConfirm, onCancel, message }) {
  return (
    isOpen && (
      <div className="confirmation">
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    )
  );
}

export default ConfirmationDialog;