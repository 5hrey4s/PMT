import { EmployeeForm } from "./EmployeeForm";
import { useState } from "react";
import React from "react";
export const ParentFormForEmployee = ({ employee }) => {
    const [projects, setProjects] = useState([]);

    const handleFormSubmitSuccess = (newEmployee) => {
        // Add the newly created/updated project to the list of projects
        setProjects((prevEmployees) => [
            ...prevEmployees.filter((p) => p.id !== newEmployee.id),
            newEmployee,
        ]);
        window.location.href = "/employees";
        // Optionally redirect or show a success message
        // For example, redirect to the list of projects or show a toast notification
    };

    return (
        <div>
            <EmployeeForm employee={employee} onSubmitSuccess={handleFormSubmitSuccess} />
            {/* Render list of projects here if needed */}
        </div>
    );
};