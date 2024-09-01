import { DataTable } from "./data-table";

export default function Kesehatan({ dataKesehatan }) {
    return (
        <div>
            <DataTable data={dataKesehatan} />
        </div>
    );
}
