import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert } from "@mui/material";
import { CBadge, CCol } from "@coreui/react";
import { BtnMini } from "../../Buttons";
import { Capitalize, FormatTime, recordType } from "../../../Utils";
import { IWorkRecord, IPersonalData } from "../../../interface";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../service/httpService";
import { useDispatch } from "react-redux";
import { setUpdated } from "../../../Store/Slices/updateSlice";
import { Loading } from "../../Loading";
import { Popup } from "../../Popup";
import { TimeTracker } from "../../TimeTracker";
import { API_URLS } from "../../../service/apiConfig";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: theme.spacing(1),
    maxWidth: "50px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  height: "auto",
  "& td, & th": {
    padding: theme.spacing(1),
  },
}));

interface TablesProps {
  title: string[];
  data: IWorkRecord[] | IPersonalData[];
  reset: () => void;
}
interface ErrorWithResponse {
  response?: {
    data: string;
  };
  message: string;
}

export const TableService: React.FC<TablesProps> = ({ title, data, reset }) => {
  const [workRecord, setWorkRecord] = useState<IWorkRecord[]>([]);
  const [personalData, setPersonalData] = useState<IPersonalData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const dispatch = useDispatch();
  const record = recordType(data);

  useEffect(() => {
    setLoading(true);
    if (record === "PersonalData") {
      setPersonalData(data as IPersonalData[]);
      setLoading(false);
    }
    if (record === "WorkRecord") {
      setWorkRecord(data as IWorkRecord[]);
      setLoading(false);
    }
  }, [data, record]);

  const handleClose = () => setOpen(false);

  const onWorker = (personal: IPersonalData) => {
    const URL_ENDPOINT = API_URLS.WORK_RECORDS_START;
    const documents = {
      profile: {
        id: personal.id,
        name: personal.name,
        surName: personal.surName,
        documents: personal.documents,
      },
      status: "activo",
    };
    Swal.fire({
      title: "¿Iniciar jornada de trabajo?",
      text: `¿Estás seguro de que deseas iniciar la jornada de trabajo para ${personal.name} ${personal.surName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, iniciar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Iniciando trabajo...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          const response = await axios.post(URL_ENDPOINT, documents);

          if (response.status === 200) {
            dispatch(setUpdated(true));
            reset();
            Swal.fire({
              icon: "success",
              title: "Trabajo iniciado",
              text: `El trabajo para ${personal.name} ${personal.surName} ha comenzado exitosamente.`,
              confirmButtonText: "OK",
            });
          } else {
            throw new Error("Error en la creación del registro");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al iniciar el trabajo. Inténtalo nuevamente.",
            confirmButtonText: "OK",
          });
          console.error("Error al crear el registro de trabajo:", error);
        }
      }
    });
  };

  const offWorker = (personal: IPersonalData) => {
    const URL_ENDPOINT = API_URLS.WORK_RECORDS_END;

    const documents = {
      id: personal.id,
    };
    Swal.fire({
      title: "¿Finalizar jornada de trabajo?",
      text: `¿Estás seguro de que deseas finalizar la jornada de trabajo para ${personal.name} ${personal.surName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Finalizando trabajo...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const response = await axios.post(URL_ENDPOINT, documents);

          if (response.status === 204) {
            dispatch(setUpdated(true));
            reset();
            Swal.fire({
              icon: "success",
              title: "Trabajo finalizado",
              text: `El Documento para ${personal.name} ${personal.surName} se ha generado exitosamente.`,
              confirmButtonText: "OK",
            });
          } else {
            throw new Error("Error al finalizar el registro");
          }
        } catch (error) {
          const err = error as ErrorWithResponse;
          const errorMessage = err.response ? err.response.data : err.message;

          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const closeRecord = (record: IWorkRecord) => {
    const URL_ENDPOINT = API_URLS.WORK_CLOSE_RECORDS;

    const documents = {
      recordId: record.id,
      userId: record.profile.id,
    };
    Swal.fire({
      title: "¿Finalizar jornada de trabajo?",
      text: `¿Estás seguro de que deseas finalizar la jornada de trabajo para ${record.profile.name} ${record.profile.surName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Finalizando trabajo...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const response = await axios.post(URL_ENDPOINT, documents);

          if (response.status === 204) {
            dispatch(setUpdated(true));
            reset();
            Swal.fire({
              icon: "success",
              title: "Trabajo finalizado",
              text: `El Documento para ${record.profile.name} ${record.profile.surName} se ha generado exitosamente.`,
              confirmButtonText: "OK",
            });
          } else {
            throw new Error("Error al finalizar el registro");
          }
        } catch (error) {
          const err = error as ErrorWithResponse;
          const errorMessage = err.response ? err.response.data : err.message;

          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const addNote = () => {
    setOpen(true);
  };

  return (
    <CCol md={12} className="d-flex justify-content-center pt-3">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 500, tableLayout: "fixed" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {title.map((title) => (
                <StyledTableCell key={title}>{title}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data && data?.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={title.length}>
                  <Alert severity="warning">
                    No hay datos del personal ACTIVO
                  </Alert>
                </TableCell>
              </TableRow>
            )}
            {record === "WorkRecord" &&
              workRecord?.map((record: IWorkRecord) => (
                <>
                  {loading ? (
                    <Loading />
                  ) : (
                    <StyledTableRow key={record.id}>
                      <StyledTableCell>
                        {Capitalize(record.profile.name)}{" "}
                        {Capitalize(record.profile.surName)}
                      </StyledTableCell>
                      <StyledTableCell>
                        <CBadge
                          style={{
                            fontSize: "15px",
                            backgroundColor:
                              theme.palette.background.color.background,
                            color: theme.palette.common.white,
                            boxShadow:
                              theme.palette.background.color.boxShadow ||
                              "0px 4px 20px rgba(138, 43, 226, 0.5)",
                          }}
                        >
                          {FormatTime(record.startTime)}
                        </CBadge>
                      </StyledTableCell>
                      <StyledTableCell>
                        <CBadge
                          style={{
                            fontSize: "15px",
                            backgroundColor:
                              theme.palette.background.color.background,
                            color: theme.palette.common.white,
                            boxShadow:
                              theme.palette.background.color.boxShadow ||
                              "0px 4px 20px rgba(138, 43, 226, 0.5)",
                          }}
                        >
                          <TimeTracker startTime={record.startTime} />
                        </CBadge>
                      </StyledTableCell>
                      <StyledTableCell>
                        <BtnMini
                          type="offWorker"
                          onClick={() => closeRecord(record)}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <BtnMini
                          type="addData"
                          onClick={() => addNote()}
                          disabled={false}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </>
              ))}
            {record === "PersonalData" &&
              personalData?.map((record: IPersonalData) => (
                <>
                  {loading ? (
                    <Loading />
                  ) : (
                    <StyledTableRow key={record.id}>
                      <StyledTableCell>
                        {Capitalize(record.name)}
                      </StyledTableCell>
                      <StyledTableCell>
                        <BtnMini
                          type="onWorker"
                          disabled={record.isActive}
                          onClick={() => onWorker(record as IPersonalData)}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <BtnMini
                          type="offWorker"
                          disabled={!record.isActive}
                          onClick={() => offWorker(record as IPersonalData)}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <BtnMini
                          type="addData"
                          onClick={() => addNote()}
                          disabled={!record.isActive}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CCol>
        <Popup
          open={open}
          onClose={handleClose}
          currentUser={workRecord[0]! as IWorkRecord}
          isReset={reset}
        />
      </CCol>
    </CCol>
  );
};
