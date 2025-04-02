import { useState, useEffect } from "react";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = () => {
        if (!task || !dueDate) {
            alert("Please Fill all Fields");
            return;
        }
        const newTask = { id: Date.now(), task, dueDate, completed: false };
        setTasks([...tasks, newTask]);
        setTask("");
        setDueDate("");
    };

    const updateTask = () => {
        if (!task || !dueDate) {
            alert("Please Fill all Fields");
            return;
        }
        setTasks(tasks.map((t) => (t.id === editingId ? { ...t, task, dueDate } : t)));
        setTask("");
        setDueDate("");
        setEditingId(null);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
    };

    const markCompleted = (id) => {
        const updatedTasks = tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="container">
            <h2>To-Do List</h2>
            <h5>By: Josef and Jessica</h5>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                {editingId ? (
                    <button className="update-btn" onClick={updateTask}>Update Task</button>
                ) : (
                    <button className="add-btn" onClick={addTask}>Add Task</button>
                )}
            </div>

            <div className="task-grid">
                {tasks.map((t) => (
                    <div key={t.id} className={`task-card ${t.completed ? "completed" : ""}`}>
                        <h3 className="task-title">{t.task}</h3>
                        <p className="task-date"> {t.dueDate}</p>
                        {t.completed && <p className="completed-label">✔️ Completed</p>}
                        <div className="task-actions">
                            <button className="edit-btn" onClick={() => { setTask(t.task); setDueDate(t.dueDate); setEditingId(t.id); }}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteTask(t.id)}>Delete</button>
                            <button className="complete-btn" onClick={() => markCompleted(t.id)}>
                                {t.completed ? "Undo" : "Complete"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
