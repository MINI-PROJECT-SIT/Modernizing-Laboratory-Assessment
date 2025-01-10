import { Menu } from "lucide-react";

export function TestHeader({ toggleSidebar, isSidebarOpen }) {
  return (
    <div className="flex items-center justify-between p-4 bg-green-600 text-white h-16">
      <div className="flex justify-center items-center">
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 left-4 p-2 rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-64" : "translate-x-0"
          }`}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className="text-lg font-semibold">Timer</div>
    </div>
  );
}
