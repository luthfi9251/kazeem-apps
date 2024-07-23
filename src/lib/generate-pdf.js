import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default async function generatePDFKelas(data, dataKelas, ta) {
    const doc = new jsPDF();
    doc.setProperties({
        title: "Daftar Siswa Kelas " + dataKelas.nama_kelas + " " + ta,
    });

    doc.autoTable({
        body: [
            ["Nama Kelas", dataKelas.nama_kelas],
            ["Tingkatan", dataKelas.Tingkat.nama_tingkatan],
            ["Tahun Ajar", ta],
            ["Jumlah Siswa", data.length],
        ],
    });

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        columns: [
            { dataKey: "id", header: "No." },
            { dataKey: "nis", header: "NIS" },
            { dataKey: "nama_lengkap", header: "Nama lengkap" },
            { dataKey: "status", header: "Status" },
            { dataKey: "kode_ta", header: "TA" },
        ],
        body: data,
        theme: "plain",
        headStyles: {
            fillColor: [69, 96, 131],
            fontSize: 10,
            textColor: "#ffffff",
        },
        willDrawCell: (data) => {
            if (data.column.dataKey === "id" && data.section === "body") {
                console.log(data);
                data.cell.text = [data.row.index + 1 + ""];
            }
        },
        didDrawPage: function (data) {
            // Footer
            doc.setFontSize(7);

            // jsPDF 1.4+ uses getHeight, <1.4 uses .height
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height
                ? pageSize.height
                : pageSize.getHeight();
            doc.text(
                `Generated at ${new Date().toLocaleString("id")} by Kazeem`,
                data.settings.margin.left,
                pageHeight - 10
            );
        },
    });

    doc.output("dataurlnewwindow", {
        filename: `Daftar Siswa Kelas ${dataKelas.nama_kelas} (${ta}).pdf`,
    });
    console.log(data);
    return;
}
