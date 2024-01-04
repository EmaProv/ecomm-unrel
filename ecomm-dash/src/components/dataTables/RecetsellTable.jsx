import React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Nome",
    selector: (row) => row.nome,
  },
  {
    name: "Codice Acquisto",
    selector: (row) => row.buycode,
  },
  {
    name: "Pagato (€)",
    selector: (row) => row.paid,
  },
  {
    name: "Metodo",
    selector: (row) => row.method,
  },
];

const data = [
  {
    id: 3,
    nome: "Prem Shahi",
    buycode: "#000003",
    paid: "300",
    method: "PayPal",
  },
  {
    id: 4,
    nome: "Bikash Chand",
    buycode: "#000004",
    paid: "150",
    method: "Bitcoin",
  },
  {
    id: 5,
    nome: "Jhon Doe",
    buycode: "#000005",
    paid: "500",
    method: "Visa",
  },
  {
    id: 6,
    nome: "Jhon Doe",
    buycode: "#000005",
    paid: "500",
    method: "Visa",
  },
  {
    id: 7,
    nome: "Jhon Doe",
    buycode: "#000005",
    paid: "500",
    method: "Visa",
  },
  {
    id: 8,
    nome: "Jhon Doe",
    buycode: "#000005",
    paid: "500",
    method: "Visa",
  },
];
function RecenteellTable() {
  return <DataTable columns={columns} data={data} responsive striped />;
}
export default RecenteellTable;
