import { jsPDF } from "jspdf";
import dayjs from "dayjs";
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

export async function generatePDFKamar(data) {
    const doc = new jsPDF();
    doc.setProperties({
        title: "Daftar Kamar Santri",
    });

    doc.autoTable({
        body: [["Jumlah Kamar", data.length]],
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

export async function generatePDFIzinKeluar(data, dataSantri) {
    const doc = new jsPDF();
    const image = new Image();
    doc.setProperties({
        title: "Surat Izin Non-Pulang - " + dataSantri.nama,
    });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    image.src = "/KOP/KOP_SURAT_IZIN.png";
    const kopWidth = 180;
    const kopHeight = 40;
    doc.addImage(image, "png", 15, 5, kopWidth, kopHeight);

    const subHead = "SURAT IZIN NON-PULANG";
    const textWidth = doc.getTextWidth(subHead);
    const pageCenterX = pageWidth / 2;
    const lineStartX = pageCenterX - textWidth / 2 + 8;
    const lineEndX = pageCenterX + textWidth / 2 - 8; 
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(subHead, pageCenterX, 51, { align: "center" });
    doc.line(lineStartX, 52, lineEndX, 52);

    let currentY = 62;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    data.forEach((izin) => {
        doc.text(`Nama `, 15, currentY);
        doc.text(`: ${dataSantri.nama}`, 45, currentY);
        doc.text(`Kelas `, 15, currentY + 7);
        doc.text(`: ${dataSantri.kelas}`, 45, currentY + 7);
        doc.text(`Tujuan `, 15, currentY + 14);
        doc.text(`: ${izin.tujuan}`, 45, currentY + 14);
        doc.text(`Keperluan `, 15, currentY + 21);
        doc.text(`: ${izin.keperluan}`, 45, currentY + 21);
        doc.text(`Hari/Tanggal `, 15, currentY + 28);
        doc.text(`: ${dayjs(izin.tgl_izin).locale("id").format("dddd, DD MMMM YYYY")}`, 45, currentY + 28);
        doc.text(`Waktu Keluar `, 15, currentY + 35);
        doc.text(`: ${dayjs(izin.jam_keluar).locale("id").format("HH:mm A")}`, 45, currentY + 35);
        doc.text(`Waktu Kembali `, 15, currentY + 42);
        doc.text(`: ${dayjs(izin.jam_kembali).locale("id").format("HH:mm A")}`, 45, currentY + 42);
        doc.text(`PJ Perizinan `, 15, currentY + 49);
        doc.text(`: `, 45, currentY + 49);
    });

    doc.setFont("helvetica", "bold");
    doc.text("Catatan", 15, currentY + 58);
    doc.setLineDash([1, 1], 0);
    doc.line(15, currentY +  65, 195, currentY +  65);
    doc.line(15, currentY +  72, 195, currentY +  72);
    doc.line(15, currentY +  79, 195, currentY +  79);
    doc.line(15, currentY +  86, 195, currentY +  86);

    doc.setFont("helvetica", "normal");
    doc.text("Dengan ini, saya siap mematuhi seluruh ketentuan sebagaimana yang berlaku, dan menerima sanksi apabila melanggar.", 15, currentY + 93, { maxWidth: 180 });

    const footerY = pageHeight - 40;
    doc.setFont("helvetica", "bold");
    doc.text("Mengetahui,", 23, footerY - 5);
    doc.text("Pengasuh Santri", 20, footerY);
    doc.text(`..............., ${dayjs(data[0].tgl_izin).locale("id").format("DD MMMM YYYY")}`, 125, footerY - 5);
    doc.text("Dept. Keamanan", 150, footerY);

    doc.line(20, footerY + 20, 50, footerY + 20); 
    doc.line(150, footerY + 20, 185, footerY + 20); 

    doc.output("dataurlnewwindow", {
        filename: `Surat Izin Non-Pulang ${dataSantri.nama}.pdf`,
    });
}

export async function generatePDFIzinPulang(data, dataSantri) {
    const doc = new jsPDF();
    const image = new Image();
    doc.setProperties({
        title: "Surat Izin Pulang - " + dataSantri.nama,
    });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    image.src = "/KOP/KOP_SURAT_IZIN.png";
    const kopWidth = 180;
    const kopHeight = 40;
    doc.addImage(image, "png", 15, 5, kopWidth, kopHeight);

    const subHead = "SURAT IZIN PULANG";
    const textWidth = doc.getTextWidth(subHead);
    const pageCenterX = pageWidth / 2;
    const lineStartX = pageCenterX - textWidth / 2 + 6;
    const lineEndX = pageCenterX + textWidth / 2 - 6; 
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(subHead, pageCenterX, 51, { align: "center" });
    doc.line(lineStartX, 52, lineEndX, 52);

    let currentY = 62;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    data.forEach((izin) => {
        doc.text(`Nama `, 15, currentY);
        doc.text(`: ${dataSantri.nama}`, 45, currentY);
        doc.text(`Kelas `, 15, currentY + 7);
        doc.text(`: ${dataSantri.kelas}`, 45, currentY + 7);
        doc.text(`Keperluan `, 15, currentY + 14);
        doc.text(`: ${izin.keperluan}`, 45, currentY + 14);
        doc.text(`Waktu Izin `, 15, currentY + 21);
        doc.text(`: ${dayjs(izin.tgl_izin).locale("id").format("dddd, DD MMMM YYYY")}`, 45, currentY + 21);
        doc.text(`Waktu Kembali `, 15, currentY + 28);
        doc.text(`: ${dayjs(izin.tgl_kembali).locale("id").format("dddd, DD MMMM YYYY")}`, 45, currentY + 28);
        doc.text(`PJ Perizinan `, 15, currentY + 35);
        doc.text(`: `, 45, currentY + 35);
    });

    doc.setFont("helvetica", "bold");
    doc.text("Catatan", 15, currentY + 42);
    doc.setLineDash([1, 1], 0);
    doc.line(15, currentY +  49, 195, currentY +  49);
    doc.line(15, currentY +  56, 195, currentY +  56);
    doc.line(15, currentY +  63, 195, currentY +  63);
    doc.line(15, currentY +  70, 195, currentY +  70);

    doc.setFont("helvetica", "normal");
    doc.text("Dengan ini, saya siap mematuhi seluruh ketentuan sebagaimana yang berlaku, dan saya siap diberi sanksi apabila melanggar.", 15, currentY + 79, { maxWidth: 180 });

    const footerY = pageHeight - 40;
    doc.setFont("helvetica", "bold");
    doc.text("Mengetahui,", 23, footerY - 5);
    doc.text("Dewan Idharah", 20, footerY);
    doc.text("Pengasuh Santri", 90, footerY);
    doc.text(`..............., ${dayjs(data[0].tgl_izin).locale("id").format("DD MMMM YYYY")}`, 125, footerY - 5);
    doc.text("Dept. Keamanan", 150, footerY);

    doc.line(20, footerY + 20, 50, footerY + 20); 
    doc.line(90, footerY + 20, 125, footerY + 20); 
    doc.line(150, footerY + 20, 185, footerY + 20); 

    doc.output("dataurlnewwindow", {
        filename: `Surat Izin Pulang ${dataSantri.nama}.pdf`,
    });
}
