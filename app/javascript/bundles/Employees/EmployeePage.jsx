import React from 'react'
import { EmployeeDetails } from './employee-details';

export const EmployeePage = ({ employee }) => {

    // Handle editing the employee details
    const handleEdit = () => {
        window.location.href = `/employees/${employee.id}/edit`;
    };

    // Handle going back to the employees list
    const handleBack = () => {
        window.location.href = `/employees`;
    };

    // Handle deleting the employee
    const handleDelete = (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            // Get CSRF token from the DOM or meta tag
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            fetch(`/employees/${employeeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken, // Include CSRF token in headers
                },
            })
                .then((response) => {
                    if (response.ok) {
                        window.location.href = `/employees`; // Redirect to the employees list page
                    } else {
                        return response.json().then((data) => {
                            alert(`Error: ${data.errors ? data.errors.join(", ") : "Something went wrong."}`);
                        });
                    }
                })
                .catch((error) => {
                    alert("Error deleting the employee.");
                });
        }
    };

    return (
        <EmployeeDetails employee={employee}
            onEdit={handleEdit}
            onBack={handleBack}
            onDelete={handleDelete} />
    );
};

