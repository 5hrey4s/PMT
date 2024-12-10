import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from '../../components/ui/button'
import { Separator } from "../../components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { User, Mail, Briefcase, Phone, MapPin, Calendar, ArrowLeft, Edit2, Trash2 } from 'lucide-react'

export const EmployeeDetails = ({ employee, onDelete, onEdit, onBack }) => {
    if (!employee) {
        return (
            <div className="container max-w-4xl mx-auto p-6">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No employee data available</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto p-6">
            <Card className="border-none shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={employee.avatar || "/placeholder-avatar.jpg"} alt={employee.name} />
                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-3xl font-bold tracking-tight">
                                    {employee.name}
                                </CardTitle>
                                <p className="text-lg text-muted-foreground">
                                    {employee.role}
                                </p>
                            </div>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-2">
                            {employee.status || "Active"}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="grid gap-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Email</p>
                                    <p className="text-sm text-muted-foreground">{employee.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <Briefcase className="h-5 w-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Department</p>
                                    <p className="text-sm text-muted-foreground">{employee.department || "N/A"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Phone</p>
                                    <p className="text-sm text-muted-foreground">{employee.phone || "N/A"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Location</p>
                                    <p className="text-sm text-muted-foreground">{employee.location || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border">
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-4">Employee Details</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Employee ID</p>
                                            <p className="font-medium">{employee.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Hire Date</p>
                                            <p className="font-medium">{employee.hireDate || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Manager</p>
                                            <p className="font-medium">{employee.manager || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Team</p>
                                            <p className="font-medium">{employee.team || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={onBack}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Employees
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={onEdit}
                                className="flex items-center gap-2"
                            >
                                <Edit2 className="h-4 w-4" />
                                Edit Employee
                            </Button>
                            <Button
                                variant="destructive"
                                size="lg"
                                onClick={() => onDelete(employee.id)}
                                className="flex items-center gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Employee
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


