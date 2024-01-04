import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { store } from "../../redux/store";
import { getProducts } from "../../redux/api/user-zero-api";

import { UilEye, UilEdit } from "@iconscout/react-unicons";
import DataTable from "react-data-table-component";
import DeleteBtnWH from "./tableBtn/DeleteBtnWH";

const TextField = styled.input`
  hheight: 32px;
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
        placeholder="Filtra per nome"
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
    name: "Modello",
    selector: (row) => row.model,
  },
  {
    name: "Colorway",
    selector: (row) => row.colorway,
  },
  {
    name: "Brand",
    selector: (row) => row.brand,
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "InStock",
    selector: (row) => row.in_stock,
  },
  ,
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
      <Link to={`/edit-prod/` + row._id} className="table-link">
        <UilEdit />
      </Link>
    ),
    allowOverflow: true,
    button: true,
  },
  {
    cell: (row) => (
      <DeleteBtnWH id={row._id} brand={row.brand} colorway={row.colorway} />
    ),
    allowOverflow: true,
    button: true,
  },
];

function WarehouseTable() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  //ascolto continuo dello stato
  /* useEffect(() => {
		const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []); */

  useEffect(() => {
    try {
      getProducts(dispatch);
      console.log("called");
    } catch (err) {
      console.log(err);
    }
    setData(store.getState().product.products);
  }, []);

  const filteredItems = data.filter(
    (item) =>
      item.model && item.model.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
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

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      responsive
      striped
      highlightOnHover
    />
  );
}
export default WarehouseTable;
