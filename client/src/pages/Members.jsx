import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase";

import {
  FaTrash,
  FaEdit
} from "react-icons/fa";

export default function Members() {

  const [members, setMembers] = useState([]);

  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    date: "",
    name: "",
    mobile: "",
    village: "",
    monthlySaving: "",
    fine: "",
    totalSavings: "",
    loan: "",
    loanPaid: "",
    interest: "",
    pendingLoan: "",
    notes: ""
  });

  // GET MEMBERS

  const getMembers = async () => {

    const querySnapshot = await getDocs(
      collection(db, "members")
    );

    const data = [];

    querySnapshot.forEach((docu) => {

      data.push({
        id: docu.id,
        ...docu.data()
      });

    });

    setMembers(data);

  };

  useEffect(() => {

    getMembers();

  }, []);

  // DELETE MEMBER

  const deleteMember = async (id) => {

    await deleteDoc(doc(db, "members", id));

    alert("Member Deleted");

    getMembers();

  };

  // START EDIT

  const startEdit = (member) => {

    setEditId(member.id);

    setEditData({
      date: member.date || "",
      name: member.name || "",
      mobile: member.mobile || "",
      village: member.village || "",
      monthlySaving: member.monthlySaving || "",
      fine: member.fine || "",
      totalSavings: member.totalSavings || "",
      loan: member.loan || "",
      loanPaid: member.loanPaid || "",
      interest: member.interest || "",
      pendingLoan: member.pendingLoan || "",
      notes: member.notes || ""
    });

  };

  // UPDATE MEMBER

  const updateMember = async () => {

    try {

      const memberRef = doc(db, "members", editId);

      await updateDoc(memberRef, {
        ...editData
      });

      alert("Member Updated Successfully");

      setEditId(null);

      getMembers();

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }

  };

  return (
    <div className="flex bg-black text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl text-red-500 font-bold mb-10">
          Members List
        </h1>

        {/* TABLE */}

        <div className="bg-zinc-900 rounded-3xl p-5 overflow-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-700 text-red-500">

                <th className="p-4">Date</th>
                <th className="p-4">Name</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Village</th>
                <th className="p-4">Savings</th>
                <th className="p-4">Fine</th>
                <th className="p-4">Total Savings</th>
                <th className="p-4">Loan</th>
                <th className="p-4">Loan Paid</th>
                <th className="p-4">Interest</th>
                <th className="p-4">Pending Loan</th>
                <th className="p-4">Notes</th>
                <th className="p-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {members.map((member) => (

                <tr
                  key={member.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800 duration-300"
                >

                  <td className="p-4">{member.date}</td>

                  <td className="p-4">{member.name}</td>

                  <td className="p-4">{member.mobile}</td>

                  <td className="p-4">{member.village}</td>

                  <td className="p-4">
                    ₹{member.monthlySaving}
                  </td>

                  <td className="p-4">
                    ₹{member.fine}
                  </td>

                  <td className="p-4">
                    ₹{member.totalSavings}
                  </td>

                  <td className="p-4">
                    ₹{member.loan}
                  </td>

                  <td className="p-4">
                    ₹{member.loanPaid}
                  </td>

                  <td className="p-4">
                    ₹{member.interest}
                  </td>

                  <td className="p-4">
                    ₹{member.pendingLoan}
                  </td>

                  <td className="p-4">
                    {member.notes}
                  </td>

                  <td className="p-4 flex gap-3">

                    {/* EDIT */}

                    <button
                      onClick={() => startEdit(member)}
                      className="bg-yellow-500 p-3 rounded-xl hover:scale-110 duration-300"
                    >
                      <FaEdit />
                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() => deleteMember(member.id)}
                      className="bg-red-600 p-3 rounded-xl hover:scale-110 duration-300"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EDIT FORM */}

        {editId && (

          <div className="bg-zinc-900 p-10 rounded-3xl mt-10">

            <h2 className="text-4xl text-red-500 mb-8">
              Edit Member
            </h2>

            <div className="grid grid-cols-2 gap-5">

              <input
                type="date"
                value={editData.date}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    date:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="text"
                placeholder="Name"
                value={editData.name}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    name:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="text"
                placeholder="Mobile"
                value={editData.mobile}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    mobile:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="text"
                placeholder="Village"
                value={editData.village}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    village:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="number"
                placeholder="Savings"
                value={editData.monthlySaving}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    monthlySaving:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="number"
                placeholder="Fine"
                value={editData.fine}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    fine:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="number"
                placeholder="Total Savings"
                value={editData.totalSavings}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    totalSavings:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="number"
                placeholder="Loan"
                value={editData.loan}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    loan:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="number"
                placeholder="Loan Paid"
                value={editData.loanPaid}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    loanPaid:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="number"
                placeholder="Interest"
                value={editData.interest}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    interest:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="number"
                placeholder="Pending Loan"
                value={editData.pendingLoan}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    pendingLoan:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

              <input
                type="text"
                placeholder="Notes"
                value={editData.notes}
                onChange={(e)=>
                  setEditData({
                    ...editData,
                    notes:e.target.value
                  })
                }
                className="p-4 bg-black rounded-xl"
              />

            </div>

            <button
              onClick={updateMember}
              className="mt-8 bg-red-600 px-10 py-4 rounded-xl hover:bg-red-700 duration-300"
            >
              Update Member
            </button>

          </div>

        )}

      </div>

    </div>
  );
}