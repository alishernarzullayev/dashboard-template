import { DataGrid } from "@mui/x-data-grid";
import moment from "moment/moment";
import { useEffect, useState } from "react";
export default function Transfer({ allData, loading }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (allData.data) {
      setRows(
        allData.data.map((item) => {
          return {
            id: item.id,
            col1: item.id,
            col2: moment(item.createdAt).format("HH:mm LL"),
            col3: item.user.firstName + " " + item.user.lastName,
          };
        })
      );
    }
  }, [allData]);

  const columns = [
    { field: "col1", headerName: "ID", width: 150, sortable: false },
    { field: "col2", headerName: "Date & Time", width: 350, sortable: false },
    { field: "col3", headerName: "Created By", width: 250, sortable: false },
  ];

  return (
    <div
      style={{
        height: "75vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DataGrid
        disableColumnMenu
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
  );
}
