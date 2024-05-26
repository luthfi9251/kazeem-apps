import CreatePage from "./CreatePage";
import KelasDataProvider from "./KelasDataProvider";
export default function Page() {
    return (
        <KelasDataProvider>
            <CreatePage />
        </KelasDataProvider>
    );
}
