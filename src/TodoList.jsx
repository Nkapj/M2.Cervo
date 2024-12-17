
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";




function TodoList () {

    const [inputValue, setInputValue] = useState('')

    const addTask = (e) => {
        setInputValue(e.target.value);
    };


    const [task,setTask] = useState ([])


    const handleClick = (e) => {
        e.preventDefault();
        if(inputValue.trim() === "") {
        setTask((prev) => [...prev, 
            {Error: "le champ est vide, veuillez rentrer un élément"},
        ]); 
        
    } else {
        setTask((prev) => [...prev, { text:inputValue}]);
    }
        
        setInputValue('');

            }

    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState ('');
        




    
    const deleteTask = async (id) => {
        await fetch (`http://localhost:3000/todos/${id}`, {
            method: "DELETE",
        });
            setTask((task) => task.filter((item) => item.id !== id));
    
};





    const inputEdit = (indexEdit) => {
        setEditIndex(indexEdit);
        setEditValue(task[indexEdit].text) 
    }; 




    
    const saveEdit = async () => {
        const updatedTask = {text: editValue};

        await fetch(`http://localhost:3000/todos/${editIndex}`, {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: json.stringify(updatedTask),

        });

    //     setTask(task => task.map((item,index) => 
    //     index === editIndex ? {text: editValue}: item
    // ));

    setEditValue(null);
    setEditIndex('');

    }












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

        {/* Liste des tâches */}
        <ul className="list" style={{ listStyle: "none" }}>
        {task.map((item, index) => (
            <li
            key={index}
            style={{ color: item.error ? "red" : "black" }}
            >

              {/* Mode édition */}
            {editIndex === index ? (
            <>
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="input"
                />
                <button onClick={saveEdit}>Enregistrer</button>
                </>
            ) : (

                <div className="image">
                  {/* Affichage normal */}
                {item.error || item.text}
                <button onClick={() => inputEdit(index)}><MdOutlineEdit /></button>
                <button onClick={() => deleteTask(index)}> <FaTrashAlt /> </button>
                
                </div>
                )}
                    </li>
                ))}
            </ul>
        </>
    );
}





export default TodoList;