import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '../../components/ui/button';
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";

export const TaskForm = ({ task = {}, projects = [], employees = [], onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        title: task.title || '',
        description: task.description || '',
        due_date: task.due_date ? new Date(task.due_date) : null,
        status: task.status || '',
        project_id: task.project_id || '',
        employee_id: task.employee_id || '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, due_date: date });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.due_date) newErrors.due_date = "Due date is required";
        if (!formData.status) newErrors.status = "Status is required";
        if (!formData.project_id) newErrors.project_id = "Project is required";
        if (!formData.employee_id) newErrors.employee_id = "Employee is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const url = task.id ? `/tasks/${task.id}` : '/tasks';
        const method = task.id ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({
                task: {
                    ...formData,
                    due_date: formData.due_date ? format(formData.due_date, 'yyyy-MM-dd') : null,
                }
            }),
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
                <CardTitle>{task.id ? 'Edit Task' : 'Create New Task'}</CardTitle>
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
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={errors.title ? "border-red-500" : ""}
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleInputChange}
                                className={errors.description ? "border-red-500" : ""}
                            />
                        </div>

                        <div>
                            <Label htmlFor="due_date">Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!formData.due_date && "text-muted-foreground"
                                            } ${errors.due_date ? "border-red-500" : ""}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.due_date ? format(formData.due_date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.due_date}
                                        onSelect={handleDateChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                name="status"
                                value={formData.status}
                                onValueChange={(value) => handleSelectChange("status", value)}
                            >
                                <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select task status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="project_id">Project</Label>
                            <Select
                                name="project_id"
                                value={formData.project_id}
                                onValueChange={(value) => handleSelectChange("project_id", value)}
                            >
                                <SelectTrigger className={errors.project_id ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select a project" />
                                </SelectTrigger>
                                <SelectContent>
                                    {projects.map((project) => (
                                        <SelectItem key={project.id} value={project.id.toString()}>
                                            {project.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="employee_id">Employee</Label>
                            <Select
                                name="employee_id"
                                value={formData.employee_id}
                                onValueChange={(value) => handleSelectChange("employee_id", value)}
                            >
                                <SelectTrigger className={errors.employee_id ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select an employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    {employees.map((employee) => (
                                        <SelectItem key={employee.id} value={employee.id.toString()}>
                                            {employee.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" onClick={handleSubmit} className="w-full">
                    {task.id ? 'Update Task' : 'Create Task'}
                </Button>
            </CardFooter>
        </Card>
    );
};

