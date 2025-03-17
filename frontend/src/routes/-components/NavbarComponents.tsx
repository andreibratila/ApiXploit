import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart2, BookOpen, Database, List, Wifi } from "lucide-react";

export const NavbarComponents = () => {
  const { location } = useRouterState();
  const isInConfiguration = location.pathname.startsWith("/configuration");

  // Si no estamos en una subruta de /configuration, no mostramos la navbar
  if (!isInConfiguration) return null;
  return (
    <div className="max-w-7xl mx-auto bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex space-x-4">
          <Link
            to="/configuration/connectivity"
            className="px-3 py-2 text-sm font-medium rounded-md transition-colors "
            activeProps={{ className: "bg-blue-100 text-blue-600" }}
            inactiveProps={{ className: "text-gray-600 hover:bg-gray-100" }}
          >
            <Wifi className="w-4 h-4 inline mr-2" />
            Connectivity
          </Link>
          <Link
            to="/configuration/stats"
            className="px-3 py-2 text-sm font-medium rounded-md transition-colors "
            activeProps={{ className: "bg-blue-100 text-blue-600" }}
            inactiveProps={{ className: "text-gray-600 hover:bg-gray-100" }}
          >
            <BarChart2 className="w-4 h-4 inline mr-2" />
            Stats
          </Link>
          <Link
            to="/configuration/log"
            className="px-3 py-2 text-sm font-medium rounded-md transition-colors "
            activeProps={{ className: "bg-blue-100 text-blue-600" }}
            inactiveProps={{ className: "text-gray-600 hover:bg-gray-100" }}
          >
            <List className="w-4 h-4 inline mr-2" />
            Log
          </Link>
          <Link
            to="/configuration/dictionary/$document"
            params={{ document: "fuzzing" }}
            className="px-3 py-2 text-sm font-medium rounded-md transition-colors "
            activeProps={{ className: "bg-blue-100 text-blue-600" }}
            inactiveProps={{ className: "text-gray-600 hover:bg-gray-100" }}
          >
            <Database className="w-4 h-4 inline mr-2" />
            Dictionary
          </Link>
          <Link
            to="/configuration/documentation"
            className="px-3 py-2 text-sm font-medium rounded-md transition-colors "
            activeProps={{ className: "bg-blue-100 text-blue-600" }}
            inactiveProps={{ className: "text-gray-600 hover:bg-gray-100" }}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
};
