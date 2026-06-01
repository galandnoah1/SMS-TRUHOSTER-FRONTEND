import {X} from 'lucide-react'


export default function Modal({open, onClose, title, children, size="", footer})
{
    if(!open)
    {
        return null
    }

    return (
        <div className="modal-overlay"
            onClick={e => {
                if(e.target === e.currentTarget)
                {
                    onClose();
                }
            }}
        >
            <div className={`modal ${size}`}>
                <div className="modal-header">
                    <span className="modal-title">{title}</span>
                    <button className="modal-close"
                        onClick={()=> {
                            onClose()
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>

                {footer && <div className="modal-footer">
                        {footer}
                    </div>
                }
            </div>

        </div>
    );
}