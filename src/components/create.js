import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    units: "",
    professor: "",
    required: false,
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newClass = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClass),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", units: 0, professor: "", required: false });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Add Class</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="units">Units</label>
          <input
            type="number"
            className="form-control"
            id="units"
            min="0"
            value={form.units}
            onChange={(e) => updateForm({ units: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="professor">Professor</label>
          <input
            type="text"
            className="form-control"
            id="professor"
            value={form.professor}
            onChange={(e) => updateForm({ professor: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="classOptions"
              id="classRequired"
              value={form.required}
              checked={form.required}
              onChange={() => updateForm({ required: !form.required })}
            />
            <label htmlFor="classRequired" className="form-check-label">
              Major Requirement
            </label>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Add class" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
