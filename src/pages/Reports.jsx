import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

export default function Reports() {

  const [members, setMembers] = useState([]);

  const [totalMembers, setTotalMembers] = useState(0);

  const [totalSavings, setTotalSavings] = useState(0);

  const [pendingLoan, setPendingLoan] = useState(0);

  const getReports = async () => {

    const querySnapshot = await getDocs(
      collection(db, "members")
    );

    const data = [];

    let savings = 0;

    let loan = 0;

    querySnapshot.forEach((doc) => {

      const member = {
        id: doc.id,
        ...doc.data()
      };

      data.push(member);

      savings += Number(member.totalSavings || 0);

      loan += Number(member.pendingLoan || 0);

    });

    setMembers(data);

    setTotalMembers(data.length);

    setTotalSavings(savings);

    setPendingLoan(loan);

  };

  useEffect(() => {

    getReports();

  }, []);

  // PDF DOWNLOAD

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Rajgandharv Mahila Bachat Gat Report",
      14,
      15
    );

    autoTable(doc, {

      startY: 25,

      head: [[
        "Date",
        "Name",
        "Mobile",
        "Village",
        "Savings",
        "Fine",
        "Loan",
        "Pending Loan"
      ]],

      body: members.map((m) => [

        m.date,
        m.name,
        m.mobile,
        m.village,
        m.monthlySaving,
        m.fine,
        m.loan,
        m.pendingLoan

      ])

    });

    doc.save("Rajgandharv-Report.pdf");

  };

  // EXCEL DOWNLOAD

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(members);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Members"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array"
      }
    );

    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
      }
    );

    saveAs(
      fileData,
      "Rajgandharv-Report.xlsx"
    );

  };

  return (
    <div className="flex bg-black text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-6xl text-red-500 font-bold mb-10">
          Reports
        </h1>

        {/* REPORT CARDS */}

        <div className="grid grid-cols-3 gap-8 mb-10">

          <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg shadow-red-500/30">

            <h2 className="text-2xl mb-5">
              Total Members
            </h2>

            <p className="text-5xl font-bold">
              {totalMembers}
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg shadow-red-500/30">

            <h2 className="text-2xl mb-5">
              Total Savings
            </h2>

            <p className="text-5xl font-bold">
              ₹{totalSavings}
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg shadow-red-500/30">

            <h2 className="text-2xl mb-5">
              Pending Loan
            </h2>

            <p className="text-5xl font-bold">
              ₹{pendingLoan}
            </p>

          </div>

        </div>

        {/* DOWNLOAD BUTTONS */}

        <div className="flex gap-5">

          <button
            onClick={downloadPDF}
            className="bg-red-600 px-8 py-4 rounded-2xl hover:bg-red-700 duration-300"
          >
            Download PDF
          </button>

          <button
            onClick={downloadExcel}
            className="bg-green-600 px-8 py-4 rounded-2xl hover:bg-green-700 duration-300"
          >
            Download Excel
          </button>

        </div>

      </div>

    </div>
  );
}