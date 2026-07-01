import React, { use, useState } from "react";
import { Button } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
  let [items, setItems] = useState([
    { id: 1, label: "HTML&CSS", checked: true },
    { id: 2, label: "JavaScript", checked: true },
    { id: 3, label: "React.Js", checked: false },
  ]);
  let [newItems, setNewItems] = useState("");
  let [isEditing, setEditing] = useState(false);
  let [currentElement, setCurrentElement] = useState(null);
  let handleChange = (id) => {
    let handleCheck = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(handleCheck);
  };

  let handleAddandSave = () => {
    if (isEditing) {
      let editSave = items.map((item) => {
        return item.id === currentElement ? { ...item, label: newItems } : item;
      });
      setItems(editSave);
      setCurrentElement(null);
      setNewItems("");
    } else {
      setItems([
        ...items,
        { id: items.length + 1, label: newItems, checked: false },
      ]);
      setNewItems("");
    }
  };

  let handleDelete = (id) => {
    let itemDelete = items
      .filter((item) => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setItems(itemDelete);
  };

  let handleEdit = (id) => {
    let handleEdit_label = items.find((item) => item.id === id);
    setNewItems(handleEdit_label.label);
    setEditing(true);
    setCurrentElement(id);
  };
  return (
    <center>
      <div className="div">
        <input
          type="text"
          placeholder="Enter Your Items"
          value={newItems}
          onChange={(e) => {
            setNewItems(e.target.value);
          }}
        />
        <button onClick={handleAddandSave}>{isEditing ? "Save" : "ADD"}</button>
        <ul style={{ listStyle: "none" }}>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {
                    handleChange(item.id);
                  }}
                />
                <label>{item.label}</label>
                <Button
                  onClick={() => {
                    handleEdit(item.id);
                  }}
                >
                 <FaRegEdit/>
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                 <MdDeleteForever/>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </center>
  );
};
export default Todo;
