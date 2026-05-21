import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaChartBar
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-72 h-screen bg-zinc-950 border-r border-red-600 p-5">

      <h1 className="text-3xl font-bold text-red-500 mb-10">
        Rajgandharv
      </h1>

      <div className="flex flex-col gap-5 text-lg">

        <Link
          to="/dashboard"
          className="hover:bg-red-600 duration-300 p-3 rounded-xl"
        >
          <FaHome className="inline mr-3"/>
          Dashboard
        </Link>

        <Link
          to="/members"
          className="hover:bg-red-600 duration-300 p-3 rounded-xl"
        >
          <FaUsers className="inline mr-3"/>
          Members
        </Link>

        <Link
          to="/add-member"
          className="hover:bg-red-600 duration-300 p-3 rounded-xl"
        >
          <FaUserPlus className="inline mr-3"/>
          Add Member
        </Link>

        <Link
          to="/reports"
          className="hover:bg-red-600 duration-300 p-3 rounded-xl"
        >
          <FaChartBar className="inline mr-3"/>
          Reports
        </Link>

      </div>

    </div>
  );
}