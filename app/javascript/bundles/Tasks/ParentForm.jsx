import { TaskForm } from "./TaskForm";
import { useState } from "react";
import React from "react";

export const ParentFormForTasks = ({ task }) => {
    const [tasks, setTasks] = useState([]);

    const handleFormSubmitSuccess = (newtask) => {
        // Add the newly created/updated project to the list of projects
        setTasks((prevtasks) => [
            ...prevtasks.filter((p) => p.id !== newtask.id),
            newtask,
        ]);
        window.location.href = "/tasks";
        // Optionally redirect or show a success message
        // For example, redirect to the list of projects or show a toast notification
    };

    return (
        <div>
            <TaskForm task={task} onSubmitSuccess={handleFormSubmitSuccess} />
            {/* Render list of projects here if needed */}
        </div>
    );
};