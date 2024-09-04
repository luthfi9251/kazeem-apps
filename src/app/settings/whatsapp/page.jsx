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
import CardWhatsappAPI from "./_components/CardWhatsappAPI";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

function SettingWhatsapp() {
    return (
        <>
            <CardWhatsappAPI />
        </>
    );
}

export default withAuthAndGroupCheck(
    SettingWhatsapp,
    PAGE_NAME.SETTING_WHATSAPP_API
);
