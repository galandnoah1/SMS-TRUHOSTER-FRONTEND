import {
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  Layers,
  LayoutDashboardIcon,
  LogOut,
  Megaphone,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { pages_map, users } from "../data/data";
// import { useApp } from "../context/AppProvider";
// import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

export default function SideBar() {

  const nav_items = [
    {
      key: pages_map.HOME,
      icon: LayoutDashboardIcon,
      label: "Acceuil",
      section: "MENU",
    },
    {
      key: pages_map.STUDENTS,
      icon: Users,
      label: "Eleves",
      section: "",
    },
    {
      key: pages_map.CLASSES,
      icon: Layers,
      label: "Classes",
      section: "",
    },
    {
      key: pages_map.GRADES,
      icon: ClipboardList,
      label: "Notes",
      section: "",
    },
    {
      key: pages_map.BULLETINS,
      icon: FileText,
      label: "Bulletins",
      section: "",
    },
    {
      key: pages_map.ANNOUNCES,
      icon: Megaphone,
      label: "Annonces",
      section: "",
    },
    {
      key: pages_map.FRAIS,
      icon: CreditCard,
      label: "Scolarite",
      section: "",
    },
    {
      key: pages_map.TEACHERS,
      icon: GraduationCap,
      label: "Enseignants",
      section: "ADMIN",
    },
    { 
        key: pages_map.USERS, 
        icon: Shield, 
        label: "Utilisateurs", 
        section: "" 
    },
    { 
        key: pages_map.SETTINGS, 
        icon: Settings, 
        label: "Parametres", 
        section: "" 
    },
  ];

//   const [page, setPage, collapsed] = useApp();

//   const [user, logout] = useAuth()

    let collapsed = false
    const [user, setUser] = useState(users[0])

    const [page, setPage] = useState(pages_map.HOME)

    const logout = ()=>{
        setUser(null)
    }


    const user_initials = user ? user.nom.split(" ").map((word) => word[0]).join("").toUpperCase() : "AD"

  


  return (
    <div className={`sidebar ${ collapsed ? " collapsed": ""}`}>

        <div className="sibebar-head">
            <div className="sidebar-logo"></div>
            <div className="sidebar-title">
                <span>SMS-TRUHOSTER</span>
                <span>MD Bilingual College</span>
            </div>
        </div>

        <div className="sidebar-nav">
            {
                nav_items.map((item, i) => {
                    const prev = i > 0 ? nav_items[i-1] : null
                    const showSection = item.section && item !== (prev?.section || "")
                    return (
                        <div key={item.key}>
                            {showSection && <div className="sidebar-section-label">{item.section}</div>}

                            <button 
                                className={`sidebar-item ${page === item.page ? " active": ""}`}
                                onClick={() => setPage(item.key)}
                            >
                                <item.icon size={18}/>
                                <span>{item.label}</span>
                            </button>

                        </div>
                    )
                })
            }
        </div>

        <div className="sidebar-foot">

            <div className="sidebar-user">
                <div className="sidebar-avatar">{user_initials}</div>
                <div className="sidebar-user-info">
                    <span>{user?.nom || "Administrateur"}</span>
                    <span>{user.role || "Admin"}</span>
                </div>
            </div>

            <button 
                className="sidebar-item logout"
                onClick={() => logout}
                style={{
                    marginTop: 6
                }}
            >
                <LogOut size={18} />
                <span>Deconnexion</span>
            </button>

        </div>


    </div>
  );
}
