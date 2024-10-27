import { CCol, CContainer } from "@coreui/react";
import { useEffect, useState } from "react";
import { useFilterPersonal, UseGetUsers } from "../../Hooks";
import { Paginations, Search, TableData } from "../../Components";
import axios from "../../service/httpService";
import Swal from "sweetalert2";
import { setUpdated } from "../../Store/Slices/updateSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface PersonalData {
  id: string;
  name: string;
  surName: string;
  documents: string;
}

export const Personal = () => {
  const [currentData, setCurrentData] = useState<PersonalData[]>([]);
  const itemsPerPage = 7;

  const {
    data: users,
    totalPages,
    page,
    setPage,
    loading,
  } = UseGetUsers<PersonalData>(itemsPerPage);
  const dispatch = useDispatch();

  const { searchTerm, filteredData, handleSearch, resetFilter } =
    useFilterPersonal();

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      setCurrentData(filteredData as PersonalData[]);
    } else {
      setCurrentData(users);
    }
  }, [filteredData, users]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleData = (personal: PersonalData) => {
    navigate(
      `/Dashboard/Personal/Data/${personal.id}/${personal.name}/${personal.surName}`
    );
  };

  const handleCreatePersonal = () => {
    navigate("/Dashboard/Personal/Crear");
  };
  const handleUpdate = (personal: PersonalData) => {
    navigate(`/Dashboard/Personal/Update/${personal.id}`);
  };
  const deleteUser = async (user: PersonalData) => {
    const userId = user.id;
    const URL_ENDPOINT = import.meta.env.VITE_USER_DELETE;
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás deshacer esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`${URL_ENDPOINT}/${userId}`);
        if (response.status === 204) {
          Swal.fire("¡Borrado!", "El usuario ha sido eliminado.", "success");
          dispatch(setUpdated(true));
        } else {
          Swal.fire("Error", "Hubo un problema al borrar el usuario.", "error");
        }
      }
    } catch (error) {
      console.error("Error al borrar el usuario:", error);
      Swal.fire("Error", "Hubo un error al procesar la solicitud.", "error");
    }
  };

  return (
    <CContainer>
      <Search
        value={searchTerm}
        onSearch={handleSearch}
        onReset={resetFilter}
        placeholder="Buscar por nombre"
        label="Buscar Personal"
        type="Create"
        createPersonal={handleCreatePersonal}
      />
      <TableData
        loading={loading}
        columnTitles={[
          "Nombre",
          "Apellido",
          "Documento",
          "Datos",
          "Borrar",
          "Editar",
        ]}
        data={currentData}
        title={"Datos del Personal"}
        onData={handleData}
        onDelete={deleteUser}
        onUpdate={handleUpdate}
      />
      <CCol md={12} className="d-flex justify-content-center pt-5">
        <Paginations
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CCol>
    </CContainer>
  );
};
