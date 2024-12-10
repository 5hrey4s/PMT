import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from '../../components/ui/button'
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { Calendar, CheckCircle, AlertTriangle, Clock, ArrowLeft, Edit2, Trash2, User, Briefcase } from 'lucide-react'

export const TaskDetails = ({ task, onDelete, onEdit, onBack }) => {
    if (!task) {
        return (
            <div className="container max-w-4xl mx-auto p-6">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No task data available</p>
                    </CardContent>
                </Card>
            </div>
        )
    }
    console.log(task)
    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />
            case 'overdue':
                return <AlertTriangle className="w-5 h-5 text-red-500" />
            default:
                return <Clock className="w-5 h-5 text-muted-foreground" />
        }
    }

    return (
        <div className="container max-w-4xl mx-auto p-6">
            <Card className="border-none shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle className="text-3xl font-bold tracking-tight">
                                {task.title}
                            </CardTitle>
                            <p className="text-lg text-muted-foreground mt-2">
                                {task.description}
                            </p>
                        </div>
                        <Badge variant="outline" className="text-base px-4 py-2">
                            <div className="flex items-center gap-2">
                                {getStatusIcon(task.status)}
                                {task.status}
                            </div>
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="grid gap-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Due Date</p>
                                    <p className="text-sm text-muted-foreground">{new Date(task.due_date).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <Briefcase className="h-5 w-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Project</p>
                                    <p className="text-sm text-muted-foreground">{task.project.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-lg border p-4">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Assigned To</p>
                                    <p className="text-sm text-muted-foreground">{task.employee.name}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border">
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-4">Task Details</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Task ID</p>
                                            <p className="font-medium">{task.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Created At</p>
                                            <p className="font-medium">{new Date(task.created_at).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Updated At</p>
                                            <p className="font-medium">{new Date(task.updated_at).toLocaleString()}</p>
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
                            Back to Tasks
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={onEdit}
                                className="flex items-center gap-2"
                            >
                                <Edit2 className="h-4 w-4" />
                                Edit Task
                            </Button>
                            <Button
                                variant="destructive"
                                size="lg"
                                onClick={() => onDelete(task.id)}
                                className="flex items-center gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Task
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

