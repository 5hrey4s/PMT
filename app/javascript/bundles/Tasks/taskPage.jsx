import React from 'react';
import { TaskDetails } from './task-details';

export const TaskPage = ({ task }) => {

    // Handle editing the task details
    const handleEdit = () => {
        window.location.href = `/tasks/${task.id}/edit`;
    };

    // Handle going back to the tasks list
    const handleBack = () => {
        window.location.href = `/tasks`;
    };

    // Handle deleting the task
    const handleDelete = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            // Get CSRF token from the DOM or meta tag
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            fetch(`/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken, // Include CSRF token in headers
                },
            })
                .then((response) => {
                    if (response.ok) {
                        window.location.href = `/tasks`; // Redirect to the tasks list page
                    } else {
                        return response.json().then((data) => {
                            alert(`Error: ${data.errors ? data.errors.join(", ") : "Something went wrong."}`);
                        });
                    }
                })
                .catch((error) => {
                    alert("Error deleting the task.");
                });
        }
    };

    return (
        <TaskDetails task={task}
            onEdit={handleEdit}
            onBack={handleBack}
            onDelete={handleDelete} />
    );
};
