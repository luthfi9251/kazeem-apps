import { DataTable } from "./data-table";

export default function Pelanggaran({ dataPelanggaran }) {
    return (
        <div>
            <DataTable data={dataPelanggaran} />
        </div>
    );
}
