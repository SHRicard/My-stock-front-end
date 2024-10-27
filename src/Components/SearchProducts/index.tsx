import TextField from "@mui/material/TextField";
import { CCol, CRow } from "@coreui/react";
import { Btn } from "../index";
import { useState } from "react";
import { ToLowerCase } from "../../Utils";

interface SearchProps {
  createProduct?: () => void;
  onSearch: (query: string, type: "name" | "dimension") => void;
  onReset: () => void;
  type: "Search" | "Create";
}

export const SearchProducts: React.FC<SearchProps> = ({
  onSearch,
  onReset,
  type,
  createProduct,
}) => {
  const [searchName, setSearchName] = useState<string>("");
  const [searchDimension, setSearchDimension] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "name" | "dimension"
  ) => {
    const value = e.target.value;

    if (type === "name") {
      setSearchName(value);
      setSearchDimension("");
    } else {
      setSearchDimension(value);
      setSearchName("");
    }
  };

  const handleSearch = () => {
    if (searchName) {
      const nameToLower = ToLowerCase(searchName);
      onSearch(nameToLower, "name");
    } else if (searchDimension) {
      const dimensionToLower = ToLowerCase(searchDimension);
      onSearch(dimensionToLower, "dimension");
    }
  };

  // Resetear los valores de los inputs
  const clearData = () => {
    setSearchName("");
    setSearchDimension("");
    onReset();
  };

  return (
    <CRow className="d-flex justify-content-sm-start justify-content-md-center pb-3">
      {/* Input de búsqueda por dimensión */}
      <CCol className="col-12 col-sm-4 col-md-3 col-lg-auto d-flex align-items-end">
        <TextField
          id="search-dimension"
          label="Buscar por Dimensión"
          variant="standard"
          value={searchDimension}
          onChange={(e) => handleInputChange(e, "dimension")}
          disabled={!!searchName} // Desactivar si el campo de nombre tiene un valor
        />
      </CCol>

      {/* Input de búsqueda por nombre */}
      <CCol className="col-12 col-sm-4 col-md-3 col-lg-auto d-flex align-items-end">
        <TextField
          id="search-name"
          label="Buscar por Nombre"
          variant="standard"
          value={searchName}
          onChange={(e) => handleInputChange(e, "name")}
          disabled={!!searchDimension} // Desactivar si el campo de dimensión tiene un valor
        />
      </CCol>

      {/* Botón de búsqueda */}
      <CCol className="col-3 col-sm-2 col-md-auto d-flex align-items-end pt-3">
        <Btn text={"Buscar"} onClick={handleSearch} />
      </CCol>

      {/* Botón para resetear los filtros */}
      <CCol className="col-auto col-sm-3 col-md-auto d-flex align-items-end pt-3">
        <Btn onClick={clearData} text="Reset Filtro" />
      </CCol>

      {/* Opción para crear un producto */}
      {type === "Create" && createProduct && (
        <CCol className="col-auto col-sm-3 col-md-auto d-flex align-items-end pt-3">
          <Btn onClick={createProduct} text="Crear Producto" />
        </CCol>
      )}
    </CRow>
  );
};
