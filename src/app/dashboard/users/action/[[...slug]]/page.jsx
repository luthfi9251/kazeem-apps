import ActionPage from "./ActionPage";
import getUserById from "../_actions/getUserById";
import getAllAvailableGroups from "../_actions/getAllAvailableGroups";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

async function getData(id) {
    let getUserData = getUserById(id);
    let getAllGroups = getAllAvailableGroups();

    return Promise.all([getUserData, getAllGroups]);
}

async function Page({ params }) {
    let data = await getData(params.slug ? params.slug[0] : false);
    return (
        <>
            <ActionPage data={data} />
        </>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.USER_HOME);
