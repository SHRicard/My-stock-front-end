import { CCol, CContainer, CForm, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useAllDocuments, useFilterPersonal } from "../../Hooks";
import {
  Paginations,
  Search,
  DateInput,
  BtnSubmit,
  TableService,
} from "../../Components";

import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import moment from "moment";
import axios from "../../service/httpService";
import { IWorkRecord, IPersonalData } from "../../interface";
import { Alert } from "@mui/material";
import { API_URLS } from "../../service/apiConfig";

interface IFormInput {
  startBackup: string;
  endBackup: string;
}
export const Dashboard = () => {
  const [currentData, setCurrentData] = useState<
    IPersonalData[] | IWorkRecord[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTotalPages, setCurrentTotalPages] = useState<number>(1);
  const [currentLoading, setCurrentLoading] = useState(true);
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const itemsPerPage = 7;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { data, totalPages, page, setPage, loading } =
    useAllDocuments(itemsPerPage);

  const {
    searchTerm,
    filteredData,
    handleSearch,
    resetFilter,
    filterTotalPages,
    filterPage,
    filterLoading,
  } = useFilterPersonal();

  const reset = () => {
    resetFilter();
    setCurrentData([]);
  };
  useEffect(() => {
    if (searchTerm) {
      setIsFilter(true);
      setCurrentData(filteredData as IPersonalData[]);
      setCurrentPage(filterPage);
      setCurrentTotalPages(filterTotalPages);
      setCurrentLoading(filterLoading);
    } else {
      setIsFilter(false);
      setCurrentData(data as IWorkRecord[]);
      setCurrentPage(page);
      setCurrentTotalPages(totalPages);
      setCurrentLoading(loading);
    }
  }, [filteredData, data]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const title = isFilter
    ? ["Nombre", "Iniciar Act.", "Finalizar Act.", "Agregar Nota"]
    : ["Nombre", "Inicio", "Tiempo", "Finalizar", "Agregar Nota"];

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const startBackup = data.startBackup;
    const endBackup = data.endBackup;
    const URL_ENDPOINT = API_URLS.BACKUP;

    Swal.fire({
      title: "Generando backup...",
      text: "Por favor espera mientras se genera el archivo.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(
        URL_ENDPOINT,
        {
          startBackup,
          endBackup,
        },
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;

          let fileName = `backup-${moment().format("YYYY-MM-DD-HH-mm-ss")}.json`;

          const contentDisposition = response.headers["content-disposition"];
          if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            if (fileNameMatch && fileNameMatch.length === 2) {
              fileName = fileNameMatch[1];
            }
          }

          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();

          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Backup generado",
            text: `El backup se ha generado exitosamente entre ${startBackup} y ${endBackup}`,
            confirmButtonText: "OK",
          });
        }, 8000);
      } else {
        throw new Error("Error generando el backup");
      }
    } catch (error) {
      console.error("Error en la solicitud del backup:", error);

      setTimeout(() => {
        Swal.close();

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema generando el backup. Inténtalo nuevamente.",
          confirmButtonText: "OK",
        });
      }, 8000);
    }
  };
  return (
    <CContainer>
      <Search
        value={searchTerm}
        onSearch={handleSearch}
        onReset={reset}
        placeholder="Buscar por nombre"
        label="Buscar Personal"
        type="Search"
      />
      <CCol md={12} className="pt-3">
        {currentLoading ? (
          <Alert severity="warning">Cargando Datos</Alert>
        ) : (
          <TableService data={currentData} title={title} reset={reset} />
        )}
      </CCol>

      <CCol md={12} className="d-flex justify-content-center py-3">
        <Paginations
          currentPage={currentPage}
          totalPages={currentTotalPages}
          onPageChange={() => handlePageChange}
        />
      </CCol>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CRow>
          <CCol md={4} className="d-flex justify-content-center py-3">
            <DateInput
              label="Backup Desde"
              placeholder="Selecciona una fecha"
              helperText="inicio del Backup"
              register={register("startBackup", {
                required: "La fecha es requerida",
              })}
              error={!!errors.startBackup}
              errorMessage={errors.startBackup?.message}
            />
          </CCol>
          <CCol md={4} className="d-flex justify-content-center py-3">
            <DateInput
              label="Backup Desde"
              placeholder="Selecciona una fecha"
              helperText="fin del Backup"
              register={register("endBackup", {
                required: "La fecha es requerida",
              })}
              error={!!errors.endBackup}
              errorMessage={errors.endBackup?.message}
            />
          </CCol>
          <CCol md={4} className="pt-4">
            <BtnSubmit text="Backup Productos" />
          </CCol>
        </CRow>
      </CForm>
    </CContainer>
  );
};
