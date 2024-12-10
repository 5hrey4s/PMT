import React from 'react'
import { useTable, useSortBy, useFilters, usePagination, useGlobalFilter } from 'react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from '../../components/ui/button'
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ArrowUpDown, Search, User, Mail, Briefcase } from 'lucide-react'

const EmployeeTable = ({ employees }) => {
    const data = React.useMemo(() => employees, [employees])
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                Cell: ({ value }) => (
                    <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{value}</span>
                    </div>
                ),
            },
            {
                Header: 'Role',
                accessor: 'role',
                Cell: ({ value }) => (
                    <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Badge variant="outline" className="font-medium">
                            {value}
                        </Badge>
                    </div>
                ),
            },
            {
                Header: 'Email',
                accessor: 'email',
                Cell: ({ value }) => (
                    <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{value}</span>
                    </div>
                ),
            },
            {
                Header: 'Action',
                accessor: 'id',
                Cell: ({ value }) => (
                    <Button asChild variant="outline" size="sm">
                        <a href={`/employees/${value}`} className="font-medium">
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
                    <CardTitle className="text-2xl font-bold">Employees Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between pb-6">
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search employees..."
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
                            Showing {page.length} of {data.length} employees
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

export default EmployeeTable
