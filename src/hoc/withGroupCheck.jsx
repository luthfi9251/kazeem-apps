import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROLE, PAGE_ACCESS_CONFIG } from "@/security-config";

export default function withGroupCheck(Component, page_name) {
    return async function withGroupCheck(props) {
        const session = props.session.user;

        if (!session) return;

        let config = PAGE_ACCESS_CONFIG.find((item) => item.name === page_name);

        if (!config) {
            throw Error(
                "Page name tidak ditemukan, harap definisikan di security-config.js"
            );
        }

        // let checkUserhasGroup = config.allowedGroup.findIndex((item) =>
        //     session.groups.includes(item)
        // );

        let checkUserisAllowed = config.allowedGroup.every((role) =>
            session.groups.includes(role)
        );

        if (!checkUserisAllowed) {
            redirect("/login?alert=forbidden");
            return null;
        }

        return <Component {...props} />;
    };
}
