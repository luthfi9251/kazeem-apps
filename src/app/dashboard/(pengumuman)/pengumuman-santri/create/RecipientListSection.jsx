import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DataTable from "./TableRecipient";
import { RecipientStoreProvider } from "@/providers/pengumumanRecipientProviders";

export default function RecipientList() {
    return <DataTable />;
}
