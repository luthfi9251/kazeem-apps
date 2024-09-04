import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import CardNamaPondok from "./_components/CardNamaPondok";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

function SettingHomepage() {
    return (
        <>
            <CardNamaPondok />
        </>
    );
}

export default withAuthAndGroupCheck(
    SettingHomepage,
    PAGE_NAME.SETTING_KEPONDOKAN
);
