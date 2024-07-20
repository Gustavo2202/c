import { FaTrash } from "react-icons/fa6";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import "./Notes.css";
import "./NotesPriority.css";
import { ApiBD } from "../../services/api";
import { useState } from "react";

export function BlockNotes({ data, handleDelete, handleChangePriority }) {
  const [changedNotes, setChangedNotes] = useState("");

  
  function handleEdit(e, priority) {
    e.style.cursor = "text";
    e.style.borderRadius = "5px";
    if (priority) {
      e.style.boxShadow = "0 0  5px  green";
    } else {
      e.style.boxShadow = "0 0  5px  red";
    }
  }
  async function handleSave(e, notes) {
    e.style.boxShadow = "none";
    if (changedNotes && changedNotes != notes) {
      await ApiBD.post(`/Contents/${data._id}`, {
        notes: changedNotes,
      });
    }
  }

  return (
    <li className={data.priority ? "notepad-infos-priority" : "notepad-infos"}>
      <div className="title">
        <strong>{data.title}</strong>
        <div className="btnDelete">
          <FaTrash size={15} onClick={() => handleDelete(data._id)} />
        </div>
      </div>
      <textarea
        className="cardpriority cardNopriority"
        defaultValue={data.notes}
        onClick={(e) => handleEdit(e.target, data.priority)}
        onChange={(e) => setChangedNotes(e.target.value)}
        onBlur={(e) => handleSave(e.target, data.notes)}
      />
      <span
        className="notespriority 
      priority"
      >
        <AiOutlineExclamationCircle onClick={() => handleChangePriority(data._id)} size={25} />
      </span>
    </li>
  );
}
