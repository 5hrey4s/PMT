import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "../../../components/ui/alert";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "../../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";

export const ProjectForm = ({ project = {}, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        name: project.name || '',
        description: project.description || '',
        health: project.health || '',
        status: project.status || '',
        start_date: project.start_date ? new Date(project.start_date) : null,
        end_date: project.end_date ? new Date(project.end_date) : null,
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.health) newErrors.health = "Health is required";
        if (!formData.status) newErrors.status = "Status is required";
        if (!formData.start_date) newErrors.start_date = "Start date is required";
        if (!formData.end_date) newErrors.end_date = "End date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const url = project.id
            ? `/projects/${project.id}`
            : '/projects';
        const method = project.id ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({
                project: {
                    ...formData,
                    start_date: formData.start_date ? format(formData.start_date, 'yyyy-MM-dd') : null,
                    end_date: formData.end_date ? format(formData.end_date, 'yyyy-MM-dd') : null,
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
                <CardTitle>
                    {formData.id || project.id ? 'Edit Project' : 'Create New Project'}
                </CardTitle>
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
                            <Label htmlFor="health">Health</Label>
                            <Select
                                name="health"
                                value={formData.health}
                                onValueChange={(value) => handleSelectChange("health", value)}
                            >
                                <SelectTrigger className={errors.health ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select health status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Excellent">Excellent</SelectItem>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Fair">Fair</SelectItem>
                                    <SelectItem value="Poor">Poor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                name="status"
                                value={formData.status}
                                onValueChange={(value) => handleSelectChange("status", value)}
                            >
                                <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select project status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Not Started">Not Started</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="On Hold">On Hold</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="start_date">Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!formData.start_date && "text-muted-foreground"
                                            } ${errors.start_date ? "border-red-500" : ""}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.start_date ? format(formData.start_date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.start_date}
                                        onSelect={(date) => handleDateChange("start_date", date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <Label htmlFor="end_date">End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!formData.end_date && "text-muted-foreground"
                                            } ${errors.end_date ? "border-red-500" : ""}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.end_date ? format(formData.end_date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.end_date}
                                        onSelect={(date) => handleDateChange("end_date", date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" onClick={handleSubmit} className="w-full">
                    {formData.id || project.id ? 'Update Project' : 'Create Project'}
                </Button>
            </CardFooter>
        </Card>
    );
};
