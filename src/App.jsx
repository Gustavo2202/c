import { PriorityOption } from "./Components/Button/priorityOption";
import { BlockNotes } from "./Components/BlockNotes/Notes";
import { useState, useEffect } from "react";
import { ApiBD } from "./services/api";

import "./Style/Global.css";

export function App() {
  const [selectValue, setSelectValue] = useState("all");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    getAllNotes();
  }, []);

  async function loadPriority(option) {
    const params = { priority: option };
    const res = await ApiBD.get("/Priorities/", {
      params,
    });
    if (res) {
      setAllNotes(res.data);
    }
  }

  async function handleChange(e) {
    setSelectValue(e.value);

    if (e.checked && e.value !== "all") {
      loadPriority(e.value);
    } else {
      getAllNotes();
    }
  }

  async function handleDelete(id) {
    const deletedNote = await ApiBD.delete(`/annotations/${id}`);

    if (deletedNote) {
      setAllNotes(allNotes.filter((note) => notes._id != id));
    }
  }

  async function handleChangePriority(id) {
    const priorityNotes = await ApiBD.post(`/Priorities/${id}`);
    if (priorityNotes && setSelectValue !== "all") {
     loadPriority(selectValue);
    }else if (priorityNotes) {
      getAllNotes();
    }
  }

  async function getAllNotes() {
    const res = await ApiBD.get("Annotations/");
    setAllNotes(res.data);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await ApiBD.post("/Annotations", {
      title,
      notes,
      priority: false,
    });

    setTitle("");
    setNotes("");

    if (selectValue !== "all") {
      getAllNotes();
    }else{
      
    setAllNotes([...allNotes, res.data]);
    }

  }

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById("btn_submit");

      if (btn) {
        btn.style.background = title && notes ? "#075985" : "#38bdf8";
        btn.style.color = title && notes ? "#fdf4ff" : "#bae6fd";
      }
    }

    enableSubmitButton();
  }, [title, notes]);

  return (
    <div id="App">
      <aside className="sidebar">
        <strong>Caderno de Nota</strong>

        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title"> Titulo da Anotação </label>
            <input
              type="text"
              value={title}
              onChange={(Event) => setTitle(Event.target.value)}
              maxLength={30}
            />
          </div>

          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
              value={notes}
              onChange={(Event) => setNotes(Event.target.value)}
            ></textarea>
          </div>
          <button id="btn_submit" type="submit">
            Salvar
          </button>
        </form>
        <PriorityOption
        selectValue={selectValue}
         handleChange={handleChange} />
      </aside>

      <main>
        <ul className="cardItens" om>
          {allNotes.map((data) => (
            <BlockNotes
              data={data}
              handleChangePriority={handleChangePriority}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}
