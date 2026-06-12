import { useEffect, useRef, useState } from "react";
import { Users, Trash2, Edit3, Search, UserPlus2, Save } from "lucide-react";
import { classroomApi, getAcademicyears, studentApi } from "../api/client";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import "./StudentPage.css";

export default function StudentPage() {
  const [modal, setModal] = useState(false);

  const [section_, setSection] = useState("");

  const [search, setSearch] = useState("");

  const [edit, openEdit] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [filterClass, setFilterClass] = useState("");

  const [editData, setEditData] = useState(false);

  const [signUpForm, setSignUpForm] = useState({
    firstname: "",
    lastname: "",
    matricule: "",
    birthDate: "",
    birthPlace: "",
    sex: "",
    phone1: "",
    address: "",
    classId: "",
    redoublant: "",
    academicYearId: "",
  });

  const selectRef = useRef(null);

  // From the server
  const [errors, setErrors] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [academicyears, setAcademicyears] = useState([]);

  const deleteStudent = async (id) => {
    try {
      
      const response = await studentApi.deleteStudent(id)

      if(response.data.success)
      {
        console.log(`Suppression de l'eleve reussi`);
        
      }
      else
      {
        setErrors(e => [...e, response.data])
      }

    } catch (error) {
      console.log(error.message);
      
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await studentApi.getStudents();
      setStudents(response.data.data);
    } catch (error) {
      setErrors((e) => [...e, error.message]);
    }
  };

  const fetchAcademicYears = async () => {
    try {
      const response = await getAcademicyears();
      setAcademicyears(response.data);
    } catch (error) {
      setErrors((e) => [...e, error.message]);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const response = await classroomApi.getClassrooms();
      setClasses(response.data.data);
    } catch (error) {
      setErrors((e) => [...e, error.message]);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await classroomApi.getSections();
      setSections(response.data.data);
    } catch (error) {
      setErrors((e) => [...e, error.message]);
    }
  };

  const saveStudent = async () => {
    try {
      console.log(signUpForm);

      const response = await studentApi.postStudent(signUpForm);

      if (response.data.success) {
        fetchStudents();
      } else {
        console.log(response.data);
      }

      setModal(false);
    } catch (error) {
      setErrors((e) => [...e, error.message]);
    }
  };

  useEffect(() => {
    fetchClassrooms();
    fetchStudents();
    fetchSections();
    fetchAcademicYears();
  }, []);

  return (
    <div className="student-page">
      <header>
        <div>
          <h1 className="page-title">Gestion des eleves</h1>
          <div className="page-sub">{students.length} eleves au total</div>
        </div>

        <button
          className="btn primary"
          onClick={() => {
            setModal(true);
          }}
        >
          <UserPlus2 size={15} />
          <span>Inscrire un eleve</span>
        </button>
      </header>

      <main className="card">
        <div className="card-body" style={{ paddingBottom: 0 }}>
          <div className="section-tabs">
            {sections.map((section) => (
              <button
                className={`btn small${section_ == section.name ? " active" : ""} ${section.name.toLowerCase() === "anglophone" ? " anglophone" : section.name.toLowerCase() != "" ? " fracophone" : ""}`}
                key={section.id}
                onClick={() => setSection(section.name)}
              >
                <span>{section.name === "" ? "Tout" : section.name}</span>
              </button>
            ))}
          </div>

          <div className="toolbar">
            <div className="toolbar-search">
              <Search size={15} className="toolbar-search-icon" />
              <input
                placeholder="Rechercher un élève..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="toolbar-select"
              value={filterClass}
              ref={selectRef}
              onChange={(e) => {
                setFilterClass(
                  e.target.value === "Toutes" ? "" : e.target.value,
                );
              }}
            >
              <option>Toutes</option>
              {classes.map((classe) => (
                <option key={classe.id} value={classe.id}>
                  {classe.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {students.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Aucun eleve trouve"
            sub="Ajustez les filtres ou inscrivez un nouvel eleve"
          />
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Nom complet</th>
                  <th>Matricule</th>
                  <th>Classe</th>
                  <th>Sexe</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, i) => (
                  <tr key={student.id}>
                    <td style={{ color: "#94a3b8", fontSize: 12 }}>{i + 1}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background:
                              student.sex === "F" ? "#fce7f3" : "#dbeafe",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            color: student.sex === "F" ? "#9d174d" : "#1e40af",
                          }}
                        ></div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                            {student.lastname.toUpperCase()}{" "}
                            {student.firstname.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span>{student.matricule}</span>
                    </td>
                    <td>
                      <span>{student.classname}</span>
                    </td>
                    <td>
                      <span>{student.sex}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-ghost btn-icon"
                          onClick={() => openEdit(student)}
                          title="Modifier"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          className="btn btn-danger btn-icon"
                          onClick={() => {deleteStudent(student.id)}}
                          title="Supprimer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal
          open={modal}
          onClose={() => setModal(false)}
          title={
            editData
              ? "Modifier les informations de l'eleve"
              : "Ajouter un eleve"
          }
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setModal(false)}
              >
                Annuler
              </button>
              <button className="btn btn-primary" onClick={saveStudent}>
                <Save size={15} />
                {editData ? "Enregistrer" : "Inscrire"}
              </button>
            </>
          }
        >
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nom</label>
              <input
                className="form-control"
                placeholder="Nom de l'eleve"
                value={signUpForm.lastname}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, lastname: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label className="form-label">Prenom</label>
              <input
                className="form-control"
                placeholder="Prenom de l'eleve"
                value={signUpForm.firstname}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, firstname: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Sexe</label>
              <select
                className="form-control"
                value={signUpForm.sex}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, sex: e.target.value }))
                }
              >
                <option value=""></option>
                <option value="M">Masculin</option>
                <option value="F">Feminin</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Classe</label>
              <select
                className="form-control"
                value={signUpForm.classId}
                onChange={(e) => {
                  setSignUpForm((f) => ({ ...f, classId: e.target.value }));
                }}
              >
                <option value=""></option>
                {classes.map((classe) => (
                  <option key={classe.id} value={classe.id}>
                    {classe.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Redoublant</label>
              <select
                className="form-control"
                value={signUpForm.redoublant}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, redoublant: e.target.value }))
                }
              >
                <option value=""></option>
                <option value={false}>Non</option>
                <option value={true}>Oui</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Annee academique</label>
              <select
                className="form-control"
                value={signUpForm.academicYearId}
                onChange={(e) => {
                  setSignUpForm((f) => ({
                    ...f,
                    academicYearId: e.target.value,
                  }));
                }}
              >
                <option value=""></option>
                {academicyears.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Numero du pere/tuteur ou de la mere/tutrice
              </label>
              <input
                className="form-control"
                placeholder="Numero du pere/tuteur ou de la mere/tutrice"
                value={signUpForm.phone1}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, phone1: e.target.value }))
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lieu de residence</label>
              <input
                className="form-control"
                placeholder="Lieu de residence"
                value={signUpForm.address}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, address: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date de naissance</label>
              <input
                className="form-control"
                placeholder="Date de naissance"
                type="date"
                value={signUpForm.birthDate}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, birthDate: e.target.value }))
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lieu de naissance</label>
              <input
                className="form-control"
                placeholder="Lieu de naissance"
                value={signUpForm.birthPlace}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, birthPlace: e.target.value }))
                }
              />
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}
