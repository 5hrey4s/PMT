import React from 'react'
import { useTable, useSortBy, useFilters, usePagination, useGlobalFilter } from 'react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from '../../../components/ui/button'
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, } from '../../../components/ui/card'




import { ArrowUpDown, Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

const ProjectTable = ({ projects }) => {
    const data = React.useMemo(() => projects, [projects])

    const getHealthIcon = (health) => {
        switch (health?.toLowerCase()) {
            case 'good':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'at risk':
                return <AlertTriangle className="w-4 h-4 text-red-500" />
            case 'warning':
                return <AlertTriangle className="w-4 h-4 text-yellow-500" />
            default:
                return <Clock className="w-4 h-4 text-muted-foreground" />
        }
    }

    const getHealthStyle = (health) => {
        switch (health?.toLowerCase()) {
            case 'good':
                return 'bg-green-50 text-green-700 border-green-200'
            case 'at risk':
                return 'bg-red-50 text-red-700 border-red-200'
            case 'warning':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200'
        }
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Project Name',
                accessor: 'name',
                Cell: ({ value }) => (
                    <div className="font-medium">{value}</div>
                ),
            },
            {
                Header: 'Health',
                accessor: 'health',
                Cell: ({ value }) => (
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getHealthStyle(value)}`}>
                        {getHealthIcon(value)}
                        <span className="ml-1.5">{value}</span>
                    </div>
                ),
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => (
                    <Badge variant="outline" className="font-medium">
                        {value}
                    </Badge>
                ),
            },
            {
                Header: 'Action',
                accessor: 'id',
                Cell: ({ value }) => (
                    <Button asChild variant="outline" size="sm">
                        <a href={`/projects/${value}`} className="font-medium">
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
        <div className="container mx-auto">
            <Card className="border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Projects Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between pb-6">
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search projects..."
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
                            Showing {page.length} of {data.length} projects
                        </p>
                        <Select
                            value={pageIndex + 1}
                            onValueChange={(value) => gotoPage(Number(value) - 1)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Go to page" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: pageOptions.length }, (_, i) => i + 1).map(page => (
                                    <SelectItem key={page} value={page}>
                                        Page {page}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


export default ProjectTable