import CreatePage from "./CreatePage";
import KelasDataProvider from "./KelasDataProvider";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";
import { getAllKelasName } from "@/actions/kelas";

async function Page() {
    let allNamaKelas = await getAllKelasName();
    return (
        <KelasDataProvider
            allNamaKelas={allNamaKelas.map((item) => item.nama_kelas)}
        >
            <CreatePage />
        </KelasDataProvider>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEMADRASAHAN_KELOLA_KELAS);
