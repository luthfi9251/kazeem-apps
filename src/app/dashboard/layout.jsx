import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div>
            <Sidebar>{children}</Sidebar>
        </div>
    );
}
