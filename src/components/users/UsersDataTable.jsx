import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ActionCell from "./ActionCell";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const UsersDataTable = ({ items, loading = false }) => {
  //   // Row Data: The data to be displayed.
  // const [rowData, setRowData] = useState([
  //   {
  //     first_name: "Alice",
  //     last_name: "Johnson",
  //     email: "alice@example.com",
  //     is_staff: true,
  //     is_active: true,
  //     role: "manager",
  //   },
  //   {
  //     first_name: "Bob",
  //     last_name: "Smith",
  //     email: "bob@example.com",
  //     is_staff: false,
  //     is_active: true,
  //     role: "editor",
  //   },
  //   {
  //     first_name: "Charlie",
  //     last_name: "Brown",
  //     email: "charlie@example.com",
  //     is_staff: true,
  //     is_active: false,
  //     role: "viewer",
  //   },
  // ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    {
      field: "first_name",
      headerName: "First Name",
      sortable: true,
      filter: true,

      //   width: 134.57,
      headerClass: "ag-header-center",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      sortable: true,
      filter: true,
      //   width: 134.57,
      headerClass: "ag-header-center",
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      filter: true,
      //   width: 134.57,
      headerClass: "ag-header-center",
    },
    {
      field: "is_staff",
      headerName: "Staff",
      sortable: true,
      filter: true,
      //   width: 134.57,
      headerClass: "ag-header-center",
      cellRenderer: (params) => (params?.value ? "Yes" : "No"),
    },
    {
      field: "is_active",
      headerName: "Active",
      sortable: true,
      filter: true,
      //   width: 134.57,
      headerClass: "ag-header-center",
      cellRenderer: (params) => (params?.value ? "✅" : "❌"),
    },
    {
      field: "role",
      headerName: "Role",
      sortable: true,
      filter: true,
      //   width: 134.57,
      headerClass: "ag-header-center",
      cellRenderer: (params) => params?.value?.name.toUpperCase(),
    },
    {
      headerName: "Actions",
      field: "actions",
      //   width: 134.57,
      headerClass: "ag-header-center",
      cellRenderer: ActionCell,
    },
  ]);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-200/20 rounded-[2px] animate-pulse"></div>
    );
  } else {
    return (
      // Data Grid will fill the size of the parent container
      <div
        className="ag-theme-alpine my-custom-grid overflow-hidden"
        style={{
          width: "100%",
          // height: "100%", // or any desired height
          height: "400px", // or any desired height
        }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          rowData={items || []}
          columnDefs={colDefs}
          rowHeight={36}
          headerHeight={46}
          getRowStyle={() => ({
            backgroundColor: "#313159",
            color: "white",
            fontSize: "12px",
          })}
          defaultColDef={{
            resizable: true,
            flex: 1, // makes columns fill available space proportionally
            minWidth: 100,
            cellStyle: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            sortable: false,
          }}
          // rowStyle={{
          //   fontSize: "14px",
          //   height: "36px",
          //   lineHeight: "36px",
          //   backgroundColor: "#313159", // optional
          //   textAlign: "center",
          //   //   padding: "4px 2px",
          //   display: "flex",
          //   alignItems: "center",
          //   color: "white",
          //   //   border: "0.5px solid white",
          // }}
          // domLayout="autoHeight" // or "normal" for full height scroll
          domLayout="full" // or "normal" for full height scroll
          // suppressHorizontalScroll={false}
        />
      </div>
    );
  }
};

export default UsersDataTable;
