"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import DebouncedInput from "@/components/DebouncedInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
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
    getSiswaByKelasAndTA,
    deleteSiswaFromKelas,
} from "../../_actions/kelas";
import SiswaDialogForm from "./SiswaDialogForm";
import PindahKelasDialogForm from "./PindahKelasDialogForm";

export function DataTable({ columns, dataTA, idKelas }) {
    const [taSelected, setTASelected] = useState(
        dataTA.find((item) => item.aktif)?.kode_ta || dataTA[0].kode_ta
    );
    const queryClient = useQueryClient();
    const [rowSelection, setRowSelection] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogPindahOpen, setDialogPindahOpen] = useState(false);
    const [selectedID, setSelectedID] = useState(null);

    let { data, isFetching, isError } = useQuery({
        queryKey: ["siswa", idKelas, taSelected],
        queryFn: () => getSiswaByKelasAndTA(idKelas, taSelected),
        initialData: [],
    });

    const deleteMutation = useMutation({
        mutationFn: (idKelasSantri) => {
            return deleteSiswaFromKelas(idKelasSantri);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["siswa", idKelas, taSelected],
            });
            queryClient.invalidateQueries({
                queryKey: ["santri", "notin", idKelas],
            });
        },
        onError: () => {
            toast.error("Gagal menghapus siswa!", {
                position: "bottom-right",
            });
        },
    });

    if (isError) throw new Error();

    const [globalFilter, setGlobalFilter] = useState();
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    // console.log(dataSiswa);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: {
            globalFilter,
            idKelas,
            rowSelection,
        },
        initialState: {
            sorting: [
                {
                    id: "no",
                    asc: true,
                },
            ],
        },
        meta: {
            deleteHandler: (id) => deleteMutation.mutate(id),
            openPindahDialog: (id) => {
                setSelectedID(id);
                setDialogPindahOpen(true);
            },
        },
    });
    const selectedRowId = useMemo(() => {
        return table.getSelectedRowModel().rows.map((item) => item.original.id);
    }, [rowSelection]);

    const pindahKelasMany = () => {
        setSelectedID(selectedRowId);
        setDialogPindahOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-end pb-4 flex-wrap">
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className=" max-w-sm"
                    placeholder="Search all columns..."
                />
                <div className="flex gap-2">
                    {selectedRowId.length > 0 && (
                        <SelectedRowDropdown
                            handlePindahKelas={pindahKelasMany}
                        >
                            <Button
                                variant="outline"
                                data-e2e="btn-select-dropdown"
                                onClick={pindahKelasMany}
                            >
                                Action
                            </Button>
                        </SelectedRowDropdown>
                    )}
                    <Button
                        data-e2e="btn-add-siswa"
                        className="bg-kazeem-secondary"
                        onClick={() => setDialogOpen(true)}
                    >
                        Tambah Siswa
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
                        {isFetching ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center relative"
                                >
                                    <LoaderCircle className="h-5 w-5 animate-spin m-auto" />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
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
            <SiswaDialogForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                idKelas={idKelas}
                kodeTA={taSelected}
            />
            <PindahKelasDialogForm
                open={dialogPindahOpen}
                onOpenChange={setDialogPindahOpen}
                id={selectedID}
                idKelas={idKelas}
                kodeTA={taSelected}
            />
        </div>
    );
}

function SelectedRowDropdown({ handlePindahKelas, children }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                    <p
                        className="w-full cursor-pointer"
                        data-e2e="btn-pindah"
                        onClick={handlePindahKelas}
                    >
                        Pindah Kelas
                    </p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
