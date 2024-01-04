import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";

import { UilEye, UilEdit } from "@iconscout/react-unicons";

import { useDispatch, useSelector } from "react-redux";
import { store } from "../../redux/store";
import { getAdmins } from "../../redux/api/user-zero-api";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utils";
import DeleteBtn from "./tableBtn/DeleteBtn";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border: none;
  padding: 0 10px 0 10px;
  background-color: transparent;

  :focus {
    outline: none;
  }
`;

const ClearButton = styled.button`
  border: none;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  cursor: pointer;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <div className="table-txt-form">
      <TextField
        id="search"
        type="text"
        placeholder="Filtra per username"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        X
      </ClearButton>
    </div>
  </>
);

const columns = [
  {
    name: "Username",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row) => (row.isMgr ? "mgr" : "adm"),
    sortable: true,
  },
  {
    name: "Data creazione",
    selector: (row) => formatDate(row.createdAt),
  },
  {
    cell: (row) => (
      <Link to={`/product/` + row._id} className="table-link">
        <UilEye />
      </Link>
    ),
    allowOverflow: true,
    button: true,
  },
];

const columnsMgr = [
  {
    name: "Username",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row) => (row.isMgr ? "mgr" : "adm"),
    sortable: true,
  },
  {
    name: "Data creazione",
    selector: (row) => formatDate(row.createdAt),
  },
  {
    cell: (row) => (
      <Link to={`/product/` + row._id} className="table-link">
        <UilEye />
      </Link>
    ),
    allowOverflow: true,
    button: true,
  },
  {
    cell: (row) => (
      <Link to={`/edit-admin/` + row._id} className="table-link">
        <UilEdit />
      </Link>
    ),
    allowOverflow: true,
    button: true,
  },
  {
    cell: (row) => <DeleteBtn id={row._id} />,
    allowOverflow: true,
    button: true,
  },
];

function AdminTable({ mgr }) {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      getAdmins(dispatch);
      console.log("called admin");
    } catch (err) {
      console.log(err);
    }
    setFetchedUsers(store.getState().admin.admins);
  }, []);

  console.log(fetchedUsers);

  const filteredAdmins = fetchedUsers.filter(
    (admin) =>
      admin.username &&
      admin.username.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  //Datatable
  return (
    <>
      <DataTable
        columns={mgr ? columnsMgr : columns}
        data={filteredAdmins}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        responsive
        striped
        highlightOnHover
      />
    </>
  );
}
export default AdminTable;
