import Sidebar from "../components/Sidebar";

import { useState } from "react";

import {
  collection,
  addDoc
} from "firebase/firestore";

import { db } from "../firebase";

export default function AddMember() {

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [village, setVillage] = useState("");
  const [monthlySaving, setMonthlySaving] = useState("");
  const [loan, setLoan] = useState("");

  const [fine, setFine] = useState("");
  const [totalSavings, setTotalSavings] = useState("");
  const [loanPaid, setLoanPaid] = useState("");
  const [interest, setInterest] = useState("");
  const [pendingLoan, setPendingLoan] = useState("");
  const [notes, setNotes] = useState("");

  const [date, setDate] = useState("");

  const saveMember = async () => {

    try {

      await addDoc(collection(db, "members"), {

        name: name,
        mobile: mobile,
        village: village,
        monthlySaving: monthlySaving,
        loan: loan,
        fine: fine,
        totalSavings: totalSavings,
        loanPaid: loanPaid,
        interest: interest,
        pendingLoan: pendingLoan,
        notes: notes,
        date: date

      });

      alert("Member Saved Successfully");

      setName("");
      setMobile("");
      setVillage("");
      setMonthlySaving("");
      setLoan("");
      setFine("");
      setTotalSavings("");
      setLoanPaid("");
      setInterest("");
      setPendingLoan("");
      setNotes("");
      setDate("");

    } catch (error) {

      console.log(error);

      alert("Save Failed");

    }

  };

  return (
    <div className="flex bg-black text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl text-red-500 font-bold mb-10">
          Add Member
        </h1>

        <div className="bg-zinc-900 p-10 rounded-3xl w-[600px]">

          <input
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="text"
            placeholder="Village"
            value={village}
            onChange={(e)=>setVillage(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="number"
            placeholder="Monthly Saving"
            value={monthlySaving}
            onChange={(e)=>setMonthlySaving(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="number"
            placeholder="Fine"
            value={fine}
            onChange={(e)=>setFine(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="number"
            placeholder="Total Savings"
            value={totalSavings}
            onChange={(e)=>setTotalSavings(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="number"
            placeholder="Loan Amount"
            value={loan}
            onChange={(e)=>setLoan(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="number"
            placeholder="Loan Paid"
            value={loanPaid}
            onChange={(e)=>setLoanPaid(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="number"
            placeholder="Interest"
            value={interest}
            onChange={(e)=>setInterest(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <input
            type="number"
            placeholder="Pending Loan"
            value={pendingLoan}
            onChange={(e)=>setPendingLoan(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e)=>setNotes(e.target.value)}
            className="w-full p-4 rounded-xl bg-black mb-5 outline-none"
          />

          <button
            onClick={saveMember}
            className="w-full bg-red-600 p-4 rounded-xl hover:bg-red-700 duration-300"
          >
            Save Member
          </button>

        </div>

      </div>

    </div>
  );
}