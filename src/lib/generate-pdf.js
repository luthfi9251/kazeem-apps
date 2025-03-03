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

    return;
}

export async function generatePDFKesehatan(data, namaKelas, ta) {
    const doc = new jsPDF();
    doc.setProperties({
        title: "Data Kesehatan Santri" + namaKelas + " " + ta,
    });

    doc.autoTable({
        body: [
            ["Nama Kelas", namaKelas],
            ["Tahun Ajar", ta],
            ["Jumlah data kesehatan", data.length],
        ],
    });

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        columns: [
            { dataKey: "id", header: "No." },
            { dataKey: "nis", header: "NIS" },
            { dataKey: "nama_lengkap", header: "Nama Santri" },
            { dataKey: "nama_penyakit", header: "Sakit" },
            { dataKey: "tgl_masuk", header: "Tgl Masuk" },
            { dataKey: "tgl_keluar", header: "Tgl Keluar" },
            { dataKey: "status", header: "Status" },
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
        filename: `Data Kesehatan Santri ${namaKelas} (${ta}).pdf`,
    });
}

export async function generatePDFPresensi(data) {
    const doc = new jsPDF();
    doc.setProperties({
        title: "Data Presensi Pegawai",
    });

    doc.autoTable({
        body: [["Jumlah data pegawai", data.length]],
    });
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        columns: [
            { dataKey: "id", header: "No." },
            { dataKey: "id_pegawai", header: "ID Pegawai" },
            { dataKey: "nama_pegawai", header: "Nama Lengkap" },
            { dataKey: "jabatan", header: "Jabatan" },
            { dataKey: "tgl_presensi", header: "Tgl Presensi" },
            { dataKey: "status", header: "Status" },
            { dataKey: "keterangan", header: "Keterangan" },
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
        filename: `Data Presensi Pegawai ${new Date()}.pdf`,
    });
}

export async function generatePDFPelanggaran(data, namaKelas, ta) {
    const doc = new jsPDF();
    doc.setProperties({
        title: "Daftar Pelanggaran Santri " + namaKelas + " " + ta,
    });

    doc.autoTable({
        body: [
            ["Nama Kelas", namaKelas],
            ["Tahun Ajar", ta],
            ["Jumlah Pelanggaran", data.length],
        ],
    });

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        columns: [
            { dataKey: "id", header: "No." },
            { dataKey: "tanggal", header: "Tanggal" },
            { dataKey: "nis", header: "NIS" },
            { dataKey: "nama_santri", header: "Nama Santri" },
            { dataKey: "kelas", header: "Kelas" },
            { dataKey: "kode_ta", header: "TA" },
            { dataKey: "nama_pelanggaran", header: "Pelanggaran" },
            { dataKey: "jenis_pelanggaran", header: "Departemen" },
            { dataKey: "poin", header: "Poin" },
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
        filename: `Daftar Pelanggaran Santri ${namaKelas} (${ta}).pdf`,
    });
}

export async function generatePDFPelanggaranSummary(data, namaSantri) {
    const doc = new jsPDF();
    doc.setProperties({
        title: "Daftar Pelanggaran Santri " + namaSantri,
    });

    doc.autoTable({
        body: [
            ["Nama Santri", namaSantri],
            ["Jumlah Pelanggaran", data.length],
        ],
    });

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        columns: [
            { dataKey: "id", header: "ID" },
            { dataKey: "nama_santri", header: "Nama Santri" },
            { dataKey: "created_at", header: "Tanggal" },
            { dataKey: "nama_kelas", header: "Kelas" },
            { dataKey: "kode_ta", header: "TA" },
            { dataKey: "nama_pelanggaran", header: "Pelanggaran" },
            { dataKey: "jenis", header: "Departemen" },
            { dataKey: "poin", header: "Poin" },
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
        filename: `Daftar Pelanggaran Santri ${namaSantri}.pdf`,
    });
}

export async function generatePDFKamar(data, infoKamar) {
    const doc = new jsPDF();
    doc.setProperties({
        title: "Daftar Kamar Santri",
    });

    doc.autoTable({
        body: [
            ["Nama Kamar", infoKamar.nama_kamar],
            ["Lokasi", infoKamar.lokasi],
            ["Kapasitas", infoKamar.kapasitas],
            ["Deskripsi", infoKamar.deskripsi],
            ["Jumlah Santri", data.length],
        ],
    });

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        columns: [
            { dataKey: "id", header: "No." },
            { dataKey: "nis", header: "NIS" },
            { dataKey: "nama_lengkap", header: "Nama Santri" },
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
        filename: `Daftar Kamar Santri.pdf`,
    });
}

export async function generatePDFKamarDetail(data, info) {
    const doc = new jsPDF();
    doc.setProperties({
        title: "Daftar Kamar Santri " + info.nama_kamar,
    });

    doc.autoTable({
        body: [
            ["Nama Kamar", info.nama_kamar],
            ["Lokasi", info.lokasi],
            ["Kapasitas", info.kapasitas],
            ["Deskripsi", info.deskripsi],
            ["Jumlah Santri", data.length],
        ],
    });

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        columns: [
            { dataKey: "id", header: "No." },
            { dataKey: "nama_kamar", header: "Nama Kamar" },
            { dataKey: "lokasi", header: "Lokasi" },
            { dataKey: "kapasitas", header: "Kapasitas" },
            { dataKey: "deskripsi", header: "Deskripsi" },
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
        filename: `Daftar Kamar Santri - ${info.nama_kamar}.pdf`,
    });
}
