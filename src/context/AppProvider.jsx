import { createContext, useContext, useState } from "react"
import { classes, pages_map, payments, students, teachers, users } from "../data/data"


const AppContext = createContext(null)

function AppProvider({children})
{
    //students 
    const [students, setStudents] = useState(students);

    //classes 
    const [classes, setClasses] = useState(classes);

    //teachers 
    const [teachers, setTeachers] = useState(teachers)

    //users 
    const [users, setUsers] = useState(users)

    //grades
    const [grades, setGrades] = useState({})

    //fees payments
    const [payment, setPayment] = useState(payments)

    //pages 
    const [page, setPage] = useState(pages_map.HOME)

    //sidebar collapsed
    const[collapsed, setCollapsed] = useState(false)


    //Global fonctions
    
   
    const addPayment = (p) => {
        
        setPayment((prev) => [...prev, p])
    }

    const updatePayment = (paymentId, newPayment)=> {

         setPayment((prev) => prev.map((p) => p.id === paymentId ? {...p ,...newPayment}: p ))
    }

    const addStudent = (s) => {

        setStudents((prev) => [...prev, s])
    }

    const updateStudent = (studentId, newStudent) => {

        setStudents(prev => prev.map(st => st.id === studentId ? {...st, ...newStudent}: st ))
    }

    const addClass = (classe) => {

        setClasses(prev => [...prev, classe])
    }

    const deleteClass = (classId) =>{

        setClasses(prev => prev.filter(classe => classe.id != classId))
    }

    const addUser = (user) => {
        
        setUsers(prev => [...prev, user])
    }

    const saveGrades = (key, data) => setGrades(prev => ({ ...prev, [key]: data }));




    return <AppContext.Provider value={{
        addPayment,
        addClass,
        addStudent, 
        addUser, 
        updatePayment, 
        updateStudent, 
        deleteClass, 
        saveGrades,
        setPage,
        setCollapsed,
        students,
        classes,
        payment,
        teachers,
        grades,
        page,
        collapsed,
        users
    }} >
        {children}
    </AppContext.Provider>
}

export const useApp = () => useContext(AppContext);
