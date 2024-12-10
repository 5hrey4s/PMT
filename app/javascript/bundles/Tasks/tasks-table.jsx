import React from 'react'
import { useTable, useSortBy, useFilters, usePagination, useGlobalFilter } from 'react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from '../../components/ui/button'
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { ArrowUpDown, Search, Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

const TasksTable = ({ tasks }) => {
    const data = React.useMemo(() => tasks, [tasks])

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-500" />
            case 'overdue':
                return <AlertTriangle className="w-4 h-4 text-red-500" />
            default:
                return <Clock className="w-4 h-4 text-muted-foreground" />
        }
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
                Cell: ({ value }) => (
                    <div className="font-medium">{value}</div>
                ),
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({ value }) => (
                    <div className="truncate max-w-xs">{value}</div>
                ),
            },
            {
                Header: 'Due Date',
                accessor: 'due_date',
                Cell: ({ value }) => (
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{new Date(value).toLocaleDateString()}</span>
                    </div>
                ),
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => (
                    <Badge variant="outline" className="font-medium">
                        <div className="flex items-center gap-1">
                            {getStatusIcon(value)}
                            {value}
                        </div>
                    </Badge>
                ),
            },
            {
                Header: 'Project',
                accessor: 'project.name',
                Cell: ({ value }) => (
                    <div className="font-medium">{value}</div>
                ),
            },
            {
                Header: 'Assigned To',
                accessor: 'employee.name',
                Cell: ({ value }) => (
                    <div className="font-medium">{value}</div>
                ),
            },
            {
                Header: 'Action',
                accessor: 'id',
                Cell: ({ value }) => (
                    <Button asChild variant="outline" size="sm">
                        <a href={`/tasks/${value}`} className="font-medium">
                            View Details
                        </a>
                    </Button>
                ),
                disableFilters: true,
                disableSortBy: true,
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    return (
        <div className="container mx-auto py-10">
            <Card className="border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Tasks Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between pb-6">
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search tasks..."
                                value={globalFilter || ''}
                                onChange={e => setGlobalFilter(e.target.value)}
                                className="max-w-sm"
                            />
                        </div>
                        <Select
                            value={pageSize}
                            onValueChange={(value) => setPageSize(Number(value))}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a size" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 20, 30, 40, 50].map(size => (
                                    <SelectItem key={size} value={size}>
                                        Show {size} per page
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="rounded-md border">
                        <Table {...getTableProps()}>
                            <TableHeader>
                                {headerGroups.map(headerGroup => (
                                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <TableHead {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                <div className="flex items-center gap-2">
                                                    {column.render('Header')}
                                                    {column.canSort && (
                                                        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody {...getTableBodyProps()}>
                                {page.map(row => {
                                    prepareRow(row)
                                    return (
                                        <TableRow {...row.getRowProps()}>
                                            {row.cells.map(cell => (
                                                <TableCell {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {page.length} of {data.length} tasks
                        </p>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                Next
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page{' '}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{' '}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default TasksTable

