import JabatanDataProvider from "../JabatanDataProvider";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";
import PageCreatePegawai from "./CreatePage";
async function Page() {
    return (
        <JabatanDataProvider data={[]}>
            <PageCreatePegawai />
        </JabatanDataProvider>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEPEGAWAIAN_KELOLA_PEGAWAI);
