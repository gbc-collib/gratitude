import LeftSideBar from "./_components/LeftSideBar";
import SideNav from "~/components/ui/side-nav";





export default async function HomePage() {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <SideNav />
            <div className="flex flex-col justify-center">
                        </div>
            <LeftSideBar />
        </div>
    );
}
