import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../redux/store";
import { getLastCop, getProducts } from "../../../redux/api/user-zero-api";

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
];

function LightWarehouseTable() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    try {
      getLastCop(dispatch);
      console.log("called light");
    } catch (err) {
      console.log(err);
    }
    setData(store.getState().product.lastCop);
  }, []);

  return (
    <DataTable
      columns={columns}
      data={data}
      responsive
      striped
      highlightOnHover
    />
  );
}
export default LightWarehouseTable;
