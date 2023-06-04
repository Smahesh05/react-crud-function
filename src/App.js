import React, { useState } from "react";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  const addItem = () => {
    if (name.trim() === "") {
      return;
    }

    const newItem = {
      id: Date.now(),
      name: name.trim()
    };

    if (editItemId) {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === editItemId ? newItem : item))
      );
      setEditItemId(null);
    } else {
      setItems((prevItems) => [...prevItems, newItem]);
    }

    setName("");
  };

  const editItem = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    if (itemToEdit) {
      setName(itemToEdit.name);
      setEditItemId(itemId);
    }
  };

  const deleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
      />
      <button onClick={addItem}>{editItemId ? "Update" : "Add"}</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => editItem(item.id)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Example usage
const App = () => {
  return (
    <div>
      <h1>Item List</h1>
      <ItemList />
    </div>
  );
};

export default App;
