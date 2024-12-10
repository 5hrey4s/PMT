import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";

export const EmployeeForm = ({ employee = {}, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        name: employee.name || '',
        role: employee.role || '',
        email: employee.email || '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.role.trim()) newErrors.role = "Role is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const url = employee.id ? `/employees/${employee.id}` : '/employees';
        const method = employee.id ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({ employee: formData }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    onSubmitSuccess(data);
                }
            })
            .catch((err) => {
                console.error('Form submission error:', err);
                setErrors({ submit: 'An error occurred while submitting the form. Please try again.' });
            });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{employee.id ? 'Edit Employee' : 'Create New Employee'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertTitle>Errors</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-5">
                                    {Object.entries(errors).map(([field, errorMessage]) => (
                                        <li key={field}>{errorMessage}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? "border-red-500" : ""}
                            />
                        </div>

                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className={errors.role ? "border-red-500" : ""}
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={errors.email ? "border-red-500" : ""}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" onClick={handleSubmit} className="w-full">
                    {employee.id ? 'Update Employee' : 'Create Employee'}
                </Button>
            </CardFooter>
        </Card>
    );
};

