import { getMataPelajaranById } from "@/actions/pelajaran";
import EditPage from "./EditPage";

async function page({ params }) {
    let data = await getMataPelajaranById(params.idMapel);

    if (data.isError) throw data.error;

    return <EditPage data={data.data} id={params.idMapel} />;
}

export default page;
