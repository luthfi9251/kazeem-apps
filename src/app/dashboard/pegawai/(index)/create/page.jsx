import JabatanDataProvider from "../JabatanDataProvider";
import getAllJabatan from "../../_actions/getAllJabatan";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";
import PageCreatePegawai from "./CreatePage";

async function getData() {
    let jabatanData = await getAllJabatan();
    return jabatanData;
}

async function Page() {
    let listJabatan = await getData();
    
    return (
        <JabatanDataProvider data={[]}>
            <PageCreatePegawai listJabatan={listJabatan}/>
        </JabatanDataProvider>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEPEGAWAIAN_KELOLA_PEGAWAI);
