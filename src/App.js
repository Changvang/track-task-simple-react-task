import { React, useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTask = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };

        getTask();
    }, []);

    // Fetch tasks
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:8000/tasks");

        const data = await res.json();

        return data;
    };

    // Fetch 1 task by id
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:8000/tasks/${id}`);

        const data = await res.json();

        return data;
    };

    // function Add New Task
    const addNewTask = async (task) => {
        const res = await fetch("http://localhost:8000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });

        const newTask = await res.json();
        setTasks([...tasks, newTask]);
    };

    // function Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "DELETE",
        });
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    //function Toggle reminder for task
    const toggleReminder = async (id) => {
        const task = await fetchTask(id);
        await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...task, reminder: !task.reminder }),
        });
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: !task.reminder } : task
            )
        );
    };

    return (
        <BrowserRouter>
            <div className='container'>
                <Header addTask={addNewTask} />

                <Route
                    path='/'
                    exact
                    render={(props) => (
                        <>
                            <div className='body'>
                                {tasks.length > 0 ? (
                                    <Tasks
                                        tasks={tasks}
                                        onDelete={deleteTask}
                                        onToggle={toggleReminder}
                                    />
                                ) : (
                                    <h2>All task was done</h2>
                                )}
                            </div>
                        </>
                    )}
                />
                <Route path='/about' component={About} />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
