"use client";

import { useState } from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

function DialogFormJabatan({ open, openChange, context }) {
    let [dataJabatan, setJabatanGroup] = context;
    let user = false;
    const form = useForm({
        defaultValues: {
            nama_jabatan: "",
        },
    });

    let onSubmit = (data) => {};
    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogContent className=" w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Jabatan</DialogTitle>
                    <DialogDescription>
                        Silahkan tambah data jabatan.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        id="form-jabatan"
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="nama_jabatan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Nama Jabatan</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Tambah Jabatan</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export function DataTable({ columns, data }) {
    let [isOpen, setIsOpen] = useState(false);
    const [columnFilters, setColumnFilters] = useState();
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
        },
        initialState: {
            sorting: [
                {
                    id: "no",
                    asc: true,
                },
            ],
        },
    });

    return (
        <div>
            <div className="grid grid-cols-2 py-4">
                <Input
                    placeholder="Cari Nama Jabatan..."
                    value={
                        table.getColumn("nama_jabatan")?.getFilterValue() ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("nama_jabatan")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex w-full justify-end">
                    <Button
                        className="self-end bg-kazeem-secondary "
                        id="tambah-pegawi"
                        onClick={() => setIsOpen(true)}
                    >
                        Tambah Jabatan
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-kazeem-primary ">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="hover:bg-kazeem-peimary"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-white"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <p className="text-sm text-slate-500">
                    {table.getState().pagination.pageIndex + 1} dari{" "}
                    {table.getPageCount()}
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
            <DialogFormJabatan
                open={isOpen}
                openChange={setIsOpen}
                context={[0, 1]}
                setJabatanGroup={() => {}}
                disabled={false}
            />
        </div>
    );
}
