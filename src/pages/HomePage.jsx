
import {  GraduationCap,  History,  School,  Users2 } from "lucide-react";
import { classes, history, students, teachers } from "../data/data";
import './HomePage.css'

export default function HomePage()
{
    const statistques = [
        {
            icon: Users2,
            color: "#22C55E",
            label: "Total eleves",
            value: students.length
        },
        {
            icon: School,
            color: "#8B5CF6",
            label: "Classes",
            value: classes.length
        },
        {
            icon: GraduationCap,
            color: "#F97316",
            label: "Enseignants",
            value: teachers.length
        },
    ]

    return (
       <div className="home-page">
         <header>
            <div>
                <h1 className="page-title">Tableau de bord</h1>
                <p className="page-sub">Vue d'ensemble de l'etablissement</p>
            </div>
         </header>


         <main>
            <section>
                <h2 className="page-title">Statisques</h2>

                <div className="stats-grid">
                    {
                        statistques.map(stat => (
                        <div className="stat-card" key={stat.label}>
                            <stat.icon  className="stat-icon" color={stat.color}/>
                          <div className="stat-info">
                            <div className="stat-label">
                                {stat.label}
                            </div>
                            <div className="stat-value">
                                {stat.value}
                            </div>
                          </div>
                        </div>))
                    }
                </div>
            </section>

            <section>
                <h2 className="page-title">
                    <span>Historique</span>
                    <History size={18}/>
                </h2>
                <div className="history">
                    {
                        history.map(h => (
                        <div className="history-item">

                           <div>
                                <h3 className="history-label">
                                    {h.title}
                                </h3>
                                <div className="user">
                                    <span className="user-name">
                                        {h.user.nom}.
                                    </span>
                                    <span className="user-role">
                                        {h.user.role}
                                    </span>
                                </div>
                           </div>

                            <div className="history-time">
                               <span> {h.time}</span>
                                <span>{h.date}</span>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </section>
         </main>

      
       </div>
    );
}