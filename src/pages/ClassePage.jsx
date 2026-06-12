import { Layers, Plus, Trash2 } from "lucide-react";
import "./ClassePage.css";
import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import { classroomApi } from "../api/client";

export default function ClassePage() {
  const [section_, setSection] = useState("");

  const [confirm, setConfirm] = useState("");

  const [modal, setModal] = useState(false);

  const [classForm, setClassForm] = useState({
    name: "",
    sectionId: 0,
    levelId: 0,
    studentCount: 0,
    repartitionId: 0,
    lv2_id: 0,
    specialityId: 0,
  });

  // From the server
  const [errors, setErrors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [series, setSeries] = useState([]);
  const [repartitions, setRepartitions] = useState([]);
  const [lv2s, setLv2s] = useState([]);
  const [sections, setSections] = useState([]);

  const fetchClassrooms = async () => {
    try {
      const response = await classroomApi.getClassrooms();
      setClasses(response.data.data);
    } catch (error) {
      setErrors((e) => [...e, error.message]);
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await classroomApi.getLevels();
      setLevels(response.data.data);
 
      
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
  }

    const fetchLv2s = async () => {
      try {
        const response = await classroomApi.getLv2s();
        setLv2s(response.data.data);
      } catch (error) {
        setErrors((e) => [...e, error.message]);
      }
    };

    const fetchRepartitions = async () => {
      try {
        const response = await classroomApi.getRepartitions();
        setRepartitions(response.data.data);
      } catch (error) {
        setErrors((e) => [...e, error.message]);
      }
    };

    const fetchSpecialities = async () => {
      try {
        const response = await classroomApi.getSpecialities();
        setSeries(response.data.data);
      } catch (error) {
        setErrors((e) => [...e, error.message]);
      }
    };
  

useEffect(() => {
    fetchClassrooms()
    fetchLevels();
    fetchSections();
    fetchSpecialities();
    fetchLv2s();
    fetchRepartitions();
}, []);

  const filteredClasses = classes.filter((classe) => classe.section !== "");

  const addClasse = () => {
    console.log(classForm);
    setModal(false);
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
              className={`btn small${section_.toLowerCase() == section.name.toLowerCase() ? " active" : ""} ${section.name.toLowerCase() === "anglophone" ? " anglophone" : " fracophone"}`}
              key={section.id}
              onClick={() => setSection(section.name.toLowerCase())}
            >
              <span>{section.name.toLowerCase()}</span>
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
                  </tr>
                </thead>

                <tbody>
                  {filteredClasses.map((classe) => (
                    <tr key={classe.id}>
                      <td>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>
                          {classe.name}
                        </span>
                      </td>

                      <td>
                        <span>{classe.section.toUpperCase()}</span>
                      </td>

                      <td>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {classe.studentCount}
                        </div>
                      </td>

                      <td>
                        <button
                          className="btn btn-danger btn-icon"
                          onClick={() => setConfirm(classe.id)}
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
                  value={classForm.levelId}
                  onChange={(e) =>
                    setClassForm((prev) => ({
                      ...prev,
                      levelId: e.target.value,
                    }))
                  }
                >
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Serie</label>

                <select
                  className="form-control"
                  value={classForm.specialityId}
                  onChange={(e) =>
                    setClassForm((prev) => ({
                      ...prev,
                      specialityId: e.target.value,
                    }))
                  }
                >
                  <option>  </option>
                  {series.map((serie) => (
                    <option key={serie.id} value={serie.name}>
                      {serie.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">LV2</label>

                <select
                  className="form-control"
                  value={classForm.lv2_id}
                  onChange={(e) =>
                    setClassForm((prev) => ({
                      ...prev,
                      lv2_id: e.target.value,
                    }))
                  }
                >
                  <option>  </option>
                  {lv2s.map((lv2) => (
                    <option key={lv2.id} value={lv2.id}>
                      {lv2.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Section</label>

                <select
                  className="form-control"
                  value={classForm.sectionId}
                  onChange={(e) =>
                    setClassForm((prev) => ({
                      ...prev,
                      sectionId: e.target.value,
                    }))
                  }
                >
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Repartition</label>

                <select
                  className="form-control"
                  value={classForm.repartitionId}
                  onChange={(e) =>
                    setClassForm((prev) => ({
                      ...prev,
                      repartitionId: e.target.value,
                    }))
                  }
                >
                  <option>  </option>
                  {repartitions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
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
