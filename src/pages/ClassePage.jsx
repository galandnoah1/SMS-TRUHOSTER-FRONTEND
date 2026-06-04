import { Layers, Plus, Trash2 } from "lucide-react";
import "./ClassePage.css";
import { classes, levels, lv2, repartitions, sections, series } from "../data/data";
import { useState } from "react";
import EmptyState from "../components/EmptyState";
import Badge from "../components/Badge";
import Modal from "../components/Modal";

export default function ClassePage() {
  const [section_, setSection] = useState("");

  const [confirm, setConfirm] = useState("");

  const [modal, setModal] = useState(false);

  const [classForm, setClassForm] = useState({
    niveau: "",
    serie: "",
    repartition: "",
    lv2: "",
    section: ""
  });

  const filteredClasses = classes.filter((classe) => classe.section !== "");

  const addClasse = () => {
    console.log(classForm);
    setModal(false)
  };

  return (
    <div className="classe-page">
      <header>
        <div>
          <h1 className="page-title">Gestion des classes</h1>
          <div className="page-sub">{classes.length} classes au total</div>
        </div>

        <button
          className="btn primary"
          onClick={() => {
            setModal(true);
          }}
        >
          <Plus size={15} />
          <span>Ajouter une classe</span>
        </button>
      </header>

      <main>
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

        <section className="card">
          <div className="table-wrap">
            {filteredClasses.length === 0 ? (
              <EmptyState
                icon={Layers}
                title="Aucune classe"
                sub="Aucune classe pour ce cycle"
              />
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Classe</th>
                    <th>Section</th>
                    <th>Effectif</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredClasses.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>
                          {c.nom}
                        </span>
                      </td>

                      <td>
                        <span>
                          {c.section.toUpperCase()}
                        </span>
                      </td>

                      <td>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {c.effectif}
                        </div>
                      </td>

                      <td>
                        <button
                          className="btn btn-danger btn-icon"
                          onClick={() => setConfirm(c.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <Modal
          open={modal}
          onClose={() => setModal(false)}
          title="Ajouter une classe"
          footer={
            <>
              <button className="btn secondary" onClick={() => setModal(false)}>
                Annuler
              </button>
              <button className="btn primary" onClick={addClasse}>
                <Plus size={15} />
                Ajouter
              </button>
            </>
          }
        >
           <>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Niveau</label>

                  <select
                    className="form-control"
                    value={classForm.niveau}
                    onChange={(e) =>
                      setClassForm((prev) => ({
                        ...prev,
                        niveau: e.target.value,
                      }))
                    }
                  >
                    {levels.map((level) => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Série</label>

                  <select
                    className="form-control"
                    value={classForm.serie}
                    onChange={(e) =>
                      setClassForm((prev) => ({
                        ...prev,
                        serie: e.target.value,
                      }))
                    }
                  >
                    {series.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">LV2</label>

                  <select
                    className="form-control"
                    value={classForm.lv2}
                    onChange={(e) =>
                      setClassForm((prev) => ({ ...prev, lv2: e.target.value }))
                    }
                  >
                    {lv2.map((lv) => (
                      <option key={lv}>{lv}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Section</label>

                  <select
                    className="form-control"
                    value={classForm.section}
                    onChange={(e) =>
                      setClassForm((prev) => ({ ...prev, section: e.target.value }))
                    }
                  >
                    {sections.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Repartition</label>

                  <select
                    className="form-control"
                    value={classForm.repartition}
                    onChange={(e) =>
                      setClassForm((prev) => ({ ...prev, repartition: e.target.value }))
                    }
                  >
                    {repartitions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
        </Modal>
      </main>
    </div>
  );
}
