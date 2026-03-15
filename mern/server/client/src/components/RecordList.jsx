import { useEffect, useState } from "react";

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/record", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(setRecords);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Records</h2>
      <ul>
        {records.map((r) => (
          <li key={r.id}>{r.name}</li>
        ))}
      </ul>
    </div>
  );
}
