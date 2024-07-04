import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";
import CreatePage from "./CreatePage";

function Page() {
    return <CreatePage />;
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEMADRASAHAN_TAHUN_AJAR);
