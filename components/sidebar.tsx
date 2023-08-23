import MainNav from "./main-nav";

export default function SideBar() {
  return (
    <aside className="fixed top-0 left-0 hidden sm:block w-64 h-screen">
      <div className="h-full px-3 py-12 overflow-auto border-r">
        <MainNav />
      </div>
    </aside>
  );
}
