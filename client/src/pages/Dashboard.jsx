import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

export default function Dashboard() {

  const [totalMembers, setTotalMembers] = useState(0);

  const [totalSavings, setTotalSavings] = useState(0);

  const [pendingLoan, setPendingLoan] = useState(0);

  const getDashboardData = async () => {

    const querySnapshot = await getDocs(
      collection(db, "members")
    );

    let members = 0;

    let savings = 0;

    let loan = 0;

    querySnapshot.forEach((doc) => {

      const data = doc.data();

      members++;

      savings += Number(data.totalSavings || 0);

      loan += Number(data.pendingLoan || 0);

    });

    setTotalMembers(members);

    setTotalSavings(savings);

    setPendingLoan(loan);

  };

  useEffect(() => {

    getDashboardData();

  }, []);

  return (
    <div className="flex bg-black text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-6xl text-red-500 font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-8">

          {/* TOTAL MEMBERS */}

          <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg shadow-red-500/30 hover:scale-105 duration-300">

            <h2 className="text-2xl mb-5">
              Total Members
            </h2>

            <p className="text-5xl font-bold text-white">
              {totalMembers}
            </p>

          </div>

          {/* TOTAL SAVINGS */}

          <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg shadow-red-500/30 hover:scale-105 duration-300">

            <h2 className="text-2xl mb-5">
              Total Savings
            </h2>

            <p className="text-5xl font-bold text-white">
              ₹{totalSavings}
            </p>

          </div>

          {/* PENDING LOAN */}

          <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg shadow-red-500/30 hover:scale-105 duration-300">

            <h2 className="text-2xl mb-5">
              Pending Loan
            </h2>

            <p className="text-5xl font-bold text-white">
              ₹{pendingLoan}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}