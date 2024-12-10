import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { Separator } from '../../../components/ui/separator'
import { Progress } from '../../../components/ui/progress'


import { Calendar, Clock, AlertTriangle, CheckCircle, XCircle, Edit2, Trash2, ArrowLeft, AlertCircle } from 'lucide-react'

export const ProjectDetails = ({ project, onDelete, onEdit, onBack }) => {
    if (!project) {
        return (
            <div className="container max-w-4xl mx-auto p-6">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No project data available</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' }
            case 'on hold':
                return { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-50' }
            case 'at risk':
                return { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' }
            default:
                return { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' }
        }
    }

    const StatusIcon = getStatusInfo(project.status).icon

    return (
        <div className="container max-w-4xl mx-auto p-6">
            <Card className="border-none shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-1">
                            <CardTitle className="text-3xl font-bold tracking-tight">
                                {project.name}
                            </CardTitle>
                            <p className="text-lg text-muted-foreground">
                                {project.description}
                            </p>
                        </div>
                        <div className={`${getStatusInfo(project.status).bg} px-4 py-2 rounded-lg flex items-center gap-2`}>
                            <StatusIcon className={`h-5 w-5 ${getStatusInfo(project.status).color}`} />
                            <span className="font-medium">{project.status}</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Project Progress</h3>
                            <Progress value={0} className="h-2" />
                            <p className="text-sm text-muted-foreground">Project is in initial phase</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-start gap-4 rounded-lg border p-4">
                                <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Start Date</p>
                                    <p className="text-sm text-muted-foreground">{project.start_date}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-lg border p-4">
                                <Clock className="h-5 w-5 text-muted-foreground mt-1" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">End Date</p>
                                    <p className="text-sm text-muted-foreground">{project.end_date}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border">
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-4">Project Details</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Project ID</p>
                                            <p className="font-medium">{project.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Created</p>
                                            <p className="font-medium">{project.created}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Last Updated</p>
                                            <p className="font-medium">{project.updated}</p>
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
                            Back to Projects
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={onEdit}
                                className="flex items-center gap-2"
                            >
                                <Edit2 className="h-4 w-4" />
                                Edit Project
                            </Button>
                            <Button
                                variant="destructive"
                                size="lg"
                                onClick={() => onDelete(project.id)}
                                className="flex items-center gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Project
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

