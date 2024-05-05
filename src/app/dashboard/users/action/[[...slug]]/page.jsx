import ActionPage from "./ActionPage";
import getUserById from "../_actions/getUserById";
import getAllAvailableGroups from "../_actions/getAllAvailableGroups";

async function getData(id) {
    let getUserData = getUserById(id);
    let getAllGroups = getAllAvailableGroups();

    return Promise.all([getUserData, getAllGroups]);
}

export default async function Page({ params }) {
    let data = await getData(params.slug ? params.slug[0] : false);
    return (
        <>
            <ActionPage data={data} />
        </>
    );
}
