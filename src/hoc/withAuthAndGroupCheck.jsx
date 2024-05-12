import withAuth from "./withAuth";
import withGroupCheck from "./withGroupCheck";

export default function withAuthAndGroupCheck(Component, page_name) {
    let hoc = withAuth(withGroupCheck(Component, page_name));
    return hoc;
}
