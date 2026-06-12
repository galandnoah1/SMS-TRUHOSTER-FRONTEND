import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8082",
    withCredentials: true,
    headers: "*",
    timeout: 15000
})


export const getAcademicyears = () => api.get("/api/v1/academicyears")

export const classroomApi = {
    getLevels: () => api.get("/api/v1/classrooms/levels"),
    getSections: () => api.get("/api/v1/sections"),
    getSpecialities: () => api.get("/api/v1/classrooms/specialities"),
    getLv2s: () => api.get("/api/v1/classrooms/lv2s"),
    getRepartitions: () => api.get("/api/v1/classrooms/repartitions"),
    postClassroom: (data) => api.post("/api/v1/classrooms", data),
    getClassrooms: () => api.get("/api/v1/classrooms")
}

export const studentApi = {
    getStudents: () => api.get("/api/v1/students"),
    postStudent: (data) => api.post("/api/v1/students", data),
    deleteStudent: (id) => api.delete(`/api/v1/students/${id}`)
}