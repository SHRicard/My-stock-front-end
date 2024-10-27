import TextField from "@mui/material/TextField";
import { CCol, CRow } from "@coreui/react";
import { Btn } from "../index";
import { useState } from "react";
import { ToLowerCase } from "../../Utils";

interface SearchProps {
  value: string;
  onSearch: (query: string) => void;
  onReset: () => void;
  placeholder: string;
  label: string;
  type: "Search" | "Create";
  createPersonal?: () => void;
}

export const Search: React.FC<SearchProps> = ({
  value,
  onSearch,
  onReset,
  label,
  placeholder,
  type,
  createPersonal,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(value);

  const handleSearch = () => {
    const toLow = ToLowerCase(searchTerm);
    onSearch(toLow);
  };

  const clearData = () => {
    setSearchTerm(""); // Limpia el término de búsqueda
    onReset(); // Llama a la función de resetear el filtro
  };

  return (
    <CRow className="d-flex justify-content-sm-start justify-content-md-center pb-1">
      <CCol className="col-12 col-sm-4 col-md-3 col-lg-auto d-flex align-items-end">
        <TextField
          id="standard-multiline-flexible"
          label={label}
          multiline
          variant="standard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.replace(/\s+/g, ""))}
          placeholder={placeholder}
        />
      </CCol>

      <CCol className="col-3 col-sm-2 col-md-auto d-flex align-items-end pt-3">
        <Btn text={"Buscar"} onClick={handleSearch} />
      </CCol>

      <CCol className="col-auto col-sm-3 col-md-auto d-flex align-items-end pt-3">
        <Btn onClick={clearData} text="Reset Filtro" />
      </CCol>

      {type === "Create" && createPersonal && (
        <CCol className="col-auto col-sm-3 col-md-auto d-flex align-items-end pt-3">
          <Btn onClick={createPersonal} text="Crear Personal" />
        </CCol>
      )}
    </CRow>
  );
};
