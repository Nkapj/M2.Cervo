import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

function TodoList() {

    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([]); 
    const [editIndex, setEditIndex] = useState(null); 
    const [editValue, setEditValue] = useState(""); 
    const [error, setError] = useState(""); 

    
    useEffect(() => {
        fetchTodos();
    }, []);

// test
    const fetchTodos = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            const data = await response.json();
            setTask(data);
        } catch (error) {
            console.log("Erreur lors du chargement :", error);
        }
    };

    
    const addTask = (e) => {
        setInputValue(e.target.value);
    };

    
    const handleClick = async (e) => {
        e.preventDefault();

        if (inputValue.trim() === "") {
            setError("Le champ est vide, veuillez rentrer un élément");
            return;
        }

        setError(""); 

        try {
            const response = await fetch(`http://localhost:3000/todos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputValue }),
            });

            const newTask = await response.json();
            setTask((prev) => [...prev, newTask]); 
            setInputValue(""); 
        } catch (error) {
            console.log("Erreur lors de l'ajout :", error);
        }
    };

    
    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE",
            });

            setTask((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.log("Erreur lors de la suppression :", error);
        }
    };

    
    const inputEdit = (id) => {
        const taskToEdit = task.find((item) => item.id === id);
        setEditIndex(id);
        setEditValue(taskToEdit.text);
    };

    
    const saveEdit = async () => {
        try {
            const updatedTask = { text: editValue };

            const response = await fetch(`http://localhost:3000/todos/${editIndex}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });

            const editedTask = await response.json();

            setTask((prev) =>
                prev.map((item) => (item.id === editIndex ? editedTask : item))
            );

            setEditValue(""); 
            setEditIndex(null); 
        } catch (error) {
            console.log("Erreur lors de la modification :", error);
        }
    };

    return (
        <>
            
            <div className="champ">
                <input
                    type="text"
                    placeholder="Add a task"
                    onChange={addTask}
                    value={inputValue}
                />
                <button type="button" onClick={handleClick} className="btn">
                    ADD
                </button>
            </div>

            
            {error && <p style={{ color: "red" }}>{error}</p>}

            
            <ul className="list" style={{ listStyle: "none" }}>
                {task.map((item) => (
                    <li
                        key={item.id}
                        style={{ color: item.error ? "red" : "black" }}
                    >
                        
                        {editIndex === item.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) =>
                                        setEditValue(e.target.value)
                                    }
                                    className="input"
                                />
                                <button onClick={saveEdit}>Save</button>
                            </>
                        ) : (
                            <>
                                
                                {item.text}
                                <button
                                    onClick={() => inputEdit(item.id)}
                                    title="Modifier"
                                >
                                    <MdOutlineEdit />
                                </button>
                                <button
                                    onClick={() => deleteTask(item.id)} 
                                    title="Supprimer"
                                >
                                    <FaTrashAlt />
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TodoList;