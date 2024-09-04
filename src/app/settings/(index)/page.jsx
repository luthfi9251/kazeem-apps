import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

function Page() {
    return (
        <>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>
                        Silahkan reset password melalui form diawah
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-5">
                        <Input placeholder="Password Baru" type="password" />
                        <Input
                            placeholder="Konfirmasi Password Baru"
                            type="password"
                        />
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button className="bg-kazeem-primary">Reset</Button>
                </CardFooter>
            </Card>
        </>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.SETTING_AKUN_USER);
