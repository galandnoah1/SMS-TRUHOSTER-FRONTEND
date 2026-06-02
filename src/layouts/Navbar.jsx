import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { pages_map } from "../data/data";
import { notifications as initialNotifications } from "../data/data";
import './Navbar.css'


export default function Navbar()
{
    const [notificationOpen, setNotificationOpen] = useState(false)
    
    const [notifications, setNotifications] = useState(initialNotifications)
    const [page, setPage] = useState(pages_map.HOME)

    const unreadNotificationCount = notifications.filter(notification => notification.read == false).length;

    const [unreadNotification, setUnreadNotification] = useState(unreadNotificationCount)
        

    const readNotification = (notificationId) => {
        console.log(notificationId);
    }

    const readAll = () => {
        setUnreadNotification(0);
    }

  

    return (
        <header className="navbar">
            <div className="notification-wrapper">

                <button
                    onClick={() => setNotificationOpen(prev => !prev)}
                    className="notification-btn"
                >
                    <Bell size={20}/>
                    {unreadNotification > 0 && <span className="notification-dot"/>}
                </button>

                {notificationOpen && 
                 <div className="notification-panel">
                  <div className="notification-panel-head">
                    <span>Notifications
                    {unreadNotification > 0 && 
                        <span style={{
                            backgroundColor: "#ef4444",
                            color: "#fff",
                            fontSize: 10,
                            borderRadius: 10,
                            padding: "2px 6px",
                            marginLeft: 6,

                        }}>
                            {unreadNotification}
                        </span>
                    }
                    </span>

                    {
                        unreadNotification > 0 &&
                        <button onClick={() => {
                            readAll();
                            setNotificationOpen(false);
                        }}
                        >
                            Tout marquer comme lu
                        </button>
                    }
                  </div>


                    <div className="notification-list">
                        {
                            notifications.length === 0 
                            ?
                            <div className="notifications-empty">
                                <Bell 
                                    size={28}
                                    style={{
                                        opacity: .3,
                                        display: "block",
                                        margin: "0 auto 8px"
                                    }}
                                />
                                <span>Aucune notification</span>
                            </div>   

                            :

                            notifications.map( notification => (
                            <div 
                                key={notification.id} 
                                className={`notifications-item${ notification.read ? "": " unread"}`}
                                onClick={() => {
                                    readNotification(notification.id);
                                }}    
                            >
                                <div className="notification-content">
                                    {notification.title}
                                </div>

                                {
                                    !notification.read && <div className="notification-unread-dot" />
                                }
                            </div>))
                        }
                    </div>
                </div>}
            </div>
        </header>
    );
}

