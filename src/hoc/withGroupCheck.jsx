import { redirect } from "next/navigation";

export default function withGroupCheck(Component, page_name) {
    return async function withGroupCheck(props) {
        const session = props.session;

        if (session) {
            let isAllowedToPage = session.user.accessPage.includes(page_name);
            if (isAllowedToPage) {
                return <Component {...props} />;
            } else {
                redirect("/dashboard/forbidden");
            }
        } else {
            redirect("/");
        }

        return;
    };
}
