import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import SearchComponent from "./SearchComponent";
import { getAllSantriNameAndNIS } from "@/actions/santri";
import HeadSection from "./HeadSection";
import HafalanSummarySection from "./HafalanSummarySection";
import { PAGE_NAME } from "@/variables/page-name";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";

async function Page(props) {
    const santriId = props.params.santriId;
    let response = await getAllSantriNameAndNIS();

    if (response.isError) throw response.error;

    return (
        <div className="md:p-5 p-2 grid grid-cols-1 gap-4">
            <HeadSection dataSantri={response.data ?? []} />
            <HafalanSummarySection santriId={santriId} />
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KESANTRIAN_HAFALAN_SANTRI);
