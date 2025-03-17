import { Link } from "@tanstack/react-router";
import { AlertTriangle, FileText, Settings, Shield } from "lucide-react";

export const NavbarTop = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Main Navigation */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8" />
          <h1 className="text-2xl font-bold">API Security Scanner</h1>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors "
            activeProps={{ className: "bg-white text-blue-600" }}
            inactiveProps={{ className: "text-white hover:bg-blue-700" }}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Scan
          </Link>
          <Link
            to="/results"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            activeProps={{ className: "bg-white text-blue-600" }}
            inactiveProps={{ className: "text-white hover:bg-blue-700" }}
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Results
          </Link>
          <Link
            to="/configuration/connectivity"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            activeProps={{ className: "bg-white text-blue-600" }}
            inactiveProps={{ className: "text-white hover:bg-blue-700" }}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Configuration
          </Link>
        </div>
      </div>
    </div>
  );
};
