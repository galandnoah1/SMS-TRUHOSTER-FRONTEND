import { useRef, useState } from "react";
import { classes, students } from "../data/data";
import {
  Users,
  Trash2,
  Edit3,
  Search,
  UserPlus2,
  Save,
  AlertCircle,
} from "lucide-react";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import { sections } from "../data/data";
import Modal from "../components/Modal";
import "./StudentPage.css";

export default function StudentPage() {
  const [modal, setModal] = useState(false);
  const [section_, setSection] = useState("");
  const [search, setSearch] = useState("");
  const [edit, openEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [filterClass, setFilterClass] = useState("");
  const [editData, setEditData] = useState(true);
  const [signUpForm, setSignUpForm] = useState({
    prenom: "",
    nom: "",
    classe: "",
    montant: "",
  });

  const [errors, setErrors] = useState({
    nom: "Le nom est obligatoire",
    prenom: "Le prenom est obligatoire",
    classe: "La classe est obligatoire",
    montant: "Le montant est obligatoire",
    sexe: "Le sexe est obligatoire",
  });

  const saveStudent = () => {
    setSignUpForm(signUpForm)
    setModal(false)
  };
  const selectRef = useRef(null);
  let filtered = students.filter(
    (s) =>
      filterClass == "" || s.classe.toLowerCase() === filterClass.toLowerCase(),
  );

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
                className={`btn small${section_ == section ? " active" : ""} ${section === "anglophone" ? " anglophone" : section != "" ? " fracophone" : ""}`}
                key={section}
                onClick={() => setSection(section)}
              >
                <span>{section === "" ? "Tout" : section}</span>
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
                console.log(filterClass);
              }}
            >
              <option>Toutes</option>
              {classes
                .filter((c) => section_ === "" || c.section === section_)
                .map((c) => (
                  <option key={c.id}>{c.nom}</option>
                ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
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
                {filtered.map((s, i) => (
                  <tr key={s.id}>
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
                            background: s.sexe === "F" ? "#fce7f3" : "#dbeafe",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            color: s.sexe === "F" ? "#9d174d" : "#1e40af",
                            flexShrink: 0,
                          }}
                        >
                          {s.prenom[0]}
                          {s.nom[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13.5 }}>
                            {s.prenom} {s.nom}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span>{s.matricule}</span>
                    </td>
                    <td>
                      <span>{s.classe.toUpperCase()}</span>
                    </td>
                    <td>
                      <span>{s.sexe}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-ghost btn-icon"
                          onClick={() => openEdit(s)}
                          title="Modifier"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          className="btn btn-danger btn-icon"
                          onClick={() => setConfirm(s.id)}
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
          title={editData ? "Modifier l'élève" : "Inscrire un élève"}
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
                value={signUpForm.nom}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, nom: e.target.value }))
                }
              />
              {errors.nom && (
                <div className="form-error">
                  {errors.nom}
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Prenom(s)</label>
              <input
                className="form-control"
                placeholder="Prenom de l'eleve"
                value={signUpForm.prenom}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, prenom: e.target.value }))
                }
              />
              {errors.prenom && (
                <div className="form-error">
                  {errors.prenom}
                </div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Sexe</label>
              <select
                className="form-control"
                value={signUpForm.sexe}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, sexe: e.target.value }))
                }
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Classe</label>
            <select
              className="form-control"
              value={signUpForm.classe}
              onChange={(e) =>
                setSignUpForm((f) => ({ ...f, classe: e.target.value }))
              }
            >
              {classes.map((c) => (
                <option key={c.id}>{c.nom}</option>
              ))}
            </select>
          </div>
           <div className="form-group">
              <label className="form-label">Montant</label>
              <input
                className="form-control"
                placeholder="Montant de l'inscription"
                value={signUpForm.montant}
                type="number"
                style={{
                    appearance: "none"
                }}
                onChange={(e) =>
                  setSignUpForm((f) => ({ ...f, montant: e.target.value }))
                }
              />
              {
                errors.montant && (
                <div className="form-error">
                  {errors.montant}
                </div>
                )
              }
            </div>
        </Modal>
      </main>
    </div>
  );
}
