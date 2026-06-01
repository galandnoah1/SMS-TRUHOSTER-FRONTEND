import { Trash2 } from "lucide-react";


export default function Confirm({open, onClose, onConfirm, message="Voulez vous supprimer ce message ?"})
{
    if(!open)
    {
        return null
    }

    return (
        <div className="confirm-overlay">
            <div className="confirm-box">
                <div className="confirm-header">
                    <span><Trash2  size={21} color="red"/></span>
                    <span>Confirmation</span>
                </div>

                <div className="confirm-body">
                    {message}
                </div>

                <div className="confirm-footer">
                    <button
                        onClick={onClose}
                    >
                        Annuler
                    </button>

                    <button
                        onClick={onConfirm}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}