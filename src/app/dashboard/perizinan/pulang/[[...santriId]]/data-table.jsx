"use client";
import DebouncedInput from "@/components/DebouncedInput";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/DataTableHeader";
import { Badge } from "@/components/ui/badge";
import MenuItemDeleteAction from "@/components/MenuItemDeleteAction";
import { toast } from "react-toastify";
import CreateModal from "./CreateModal";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { generatePDFIzinPulang } from "@/lib/generate-pdf";
import DetailEditModal from "./DetailEditModal";
import ConfirmationStatusModal from "./ConfirmationStatusModal";
import { deleteIzinPulangSantri } from "@/actions/izin";

const columns = [
    {
        id: "no",
        header: "No.",
        cell: ({ row }) => {
            return <span className="capitalize ">{row.index + 1}</span>;
        },
    },
    {
        accessorKey: "tgl_izin",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tgl Izin" />
        ),
        cell: ({ row }) => {
            return dayjs(row.original.tgl_izin)
                .locale("id")
                .format("DD MMMM YYYY");
        },
    },
    {
        accessorKey: "tgl_kembali",
        filterFn: "equalsString",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tgl Kembali" />
        ),
        cell: ({ row }) => {
            const tglKembali = row.original.tgl_kembali;
            return tglKembali 
                ? dayjs(tglKembali).locale("id").format("DD MMMM YYYY")
                : "-";
        },
    },
    {
        accessorKey: "keperluan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keperluan" />
        ),
    },
    {
        accessorKey: "statusIzin",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.statusIzin;
    
          const statusMap = {
            SEDANG_BERLANGSUNG: (
              <Badge variant="outline" className="bg-green-200 text-green-800">
                Berlangsung
              </Badge>
            ),
            DISPENSASI_TERLAMBAT: (
                <Badge variant="outline" className="bg-yellow-200 text-yellow-800">
                  Dispensasi
                </Badge>
            ),
            MELEBIHI_BATAS_WAKTU: (
              <Badge variant="outline" className="bg-red-200 text-red-800">
                Terlambat
              </Badge>
            ),
            TELAH_SELESAI: (
              <Badge variant="outline" className="bg-blue-200 text-blue-800">
                Selesai
              </Badge>
              ),
          };
    
          return statusMap[status] || "Tidak Diketahui";
        },
      },
      {
        accessorKey: "keterangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keterangan" />
        ),
        cell: ({ row }) => {
            return row.original.keterangan || "-"},
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row, table }) => {
            const [open, setOpen] = useState(false);
            const dataOriginal = row.original;
            const namaPondok = table.options.meta?.namaPondok || "Nama Pondok";
            const alamatPondok = table.options.meta?.alamatPondok || "Alamat Pondok";
            const tableState = table.getState();
            const showEditDetailModal = tableState.setIsModalEditOpen;
            const showConfirmationStatusModal = tableState.setIsModalStatusOpen;
            const setSelected = tableState.setSelectedData;
            const setIsEditMode = tableState.setIsEditMode;
            const handleDelete = () => {
                toast.promise(
                    () =>
                        deleteIzinPulangSantri(
                            dataOriginal.id,
                            dataOriginal.Santri.id
                        ),
                    {
                        pending: "Menghapus data",
                        success: {
                            render({ data }) {
                                if (data.isError) {
                                    throw data.error;
                                }
                                return "Data berhasil dihapus";
                            },
                        },
                        error: {
                            render({ data }) {
                                return `${data}`;
                            },
                        },
                    },
                    {
                        position: "bottom-right",
                    }
                );
            };

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                data-e2e="btn-dropdown"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                                <p
                                    className="w-full"
                                    onClick={() => {
                                        showEditDetailModal(true);
                                        setSelected(dataOriginal);
                                        setIsEditMode(false);
                                    }}
                                >
                                    Detail
                                </p>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <p
                                    className="w-full"
                                    onClick={() => {
                                        showEditDetailModal(true);
                                        setSelected(dataOriginal);
                                        setIsEditMode(true);
                                    }}
                                >
                                    Edit
                                </p>
                            </DropdownMenuItem>
                            {dataOriginal.tgl_kembali !== null && (
                            <>
                            <DropdownMenuItem className="cursor-pointer">
                                <p
                                    className="w-full"
                                    onClick={() => {
                                        const dataRow = [dataOriginal]; 
                                        const dataSantri = {
                                            nama: dataOriginal.Santri.nama_lengkap || "kosong",
                                            nis : dataOriginal.Santri.nis || "kosong",
                                            kelas: dataOriginal.Santri.KelasSantri?.[0]?.Kelas?.nama_kelas || "kosong",
                                        };
                                        generatePDFIzinPulang(dataRow, dataSantri);
                                    }} 
                                >
                                    Export
                                </p>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <p
                                    className="text-green-300 w-full"
                                    onClick={() => {
                                        showConfirmationStatusModal(true);
                                        setSelected(dataOriginal);
                                        setIsEditMode(true);
                                    }}
                                >
                                    Konfirmasi
                                </p>
                            </DropdownMenuItem>
                            </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <p
                                    className="text-red-500 cursor-pointer w-full"
                                    onClick={() => setOpen(true)}
                                >
                                    Hapus
                                </p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <MenuItemDeleteAction
                        open={open}
                        onOpenChange={setOpen}
                        onDeletehandle={handleDelete}
                    />
                </>
            );
        },
    },
];

export default function DataTable({ data, santriId}) {
    const filterSheetState = useState(false);
    const [globalFilter, setGlobalFilter] = useState();
    const [columnFilters, setColumnFilters] = useState([]);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter,
            columnFilters,
            setIsModalEditOpen,
            setIsModalStatusOpen,
            setSelectedData,
            setIsEditMode,
        },
        onColumnFiltersChange: setColumnFilters,
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
        <>
            <div>
                <div className="grid grid-cols-1 gap-2 md:gap-0 md:grid-cols-2 py-4">
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className=" max-w-sm"
                        placeholder="Search all columns..."
                    />
                    <div className="flex w-full justify-end gap-1">
                        <Button
                            className="grow max-w-[150px] w-full  bg-kazeem-secondary "
                            id="tambah-santri"
                            data-e2e="btn-tambah"
                            onClick={() => setIsModalCreateOpen(true)}
                        >
                            Tambah
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
                                                          header.column
                                                              .columnDef.header,
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
            </div>
            <CreateModal
                santriId={santriId}
                open={isModalCreateOpen}
                onOpenChange={setIsModalCreateOpen}
            />
            <DetailEditModal
                edit={isEditMode}
                data={selectedData}
                santriId={santriId}
                open={isModalEditOpen}
                onOpenChange={setIsModalEditOpen}
            />
            <ConfirmationStatusModal
                data={selectedData}
                santriId={santriId}
                open={isModalStatusOpen}
                onOpenChange={setIsModalStatusOpen}
            />
        </>
    );
}
