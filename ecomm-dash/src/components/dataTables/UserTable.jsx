import React from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0e4bf1;
  color: #fff;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
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
  </>
);

const columns = [
  {
    name: "Nome",
    selector: (row) => row.nome,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Numero di telefono",
    selector: (row) => row.phone,
  },
  {
    name: "Membro dal...",
    selector: (row) => row.date,
  },
];

const data = [
  {
    id: 3,
    nome: "Prem Shahi",
    email: "premshahi@gmail.com",
    phone: "366 0000000",
    date: "20/04/2022",
  },
  {
    id: 4,
    nome: "Bikash Chand",
    email: "bikachand@gmail.com",
    phone: "366 00000000",
    date: "30/05/2022",
  },
];

function UserTable() {
  //Funzione per la ricerca

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = data.filter(
    (item) =>
      item.nome && item.nome.toLowerCase().includes(filterText.toLowerCase())
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
    <DataTable
      columns={columns}
      data={filteredItems}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      responsive
      striped
    />
  );
}
export default UserTable;
