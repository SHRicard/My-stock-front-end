import { useEffect, useState } from "react";
import { CBadge, CCol, CRow } from "@coreui/react";
import { Alert, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AccordionsUserData,
  BtnSmall,
  Loading,
  Paginations,
} from "../../../Components";
import { useParams } from "react-router-dom";
import { Capitalize, Months } from "../../../Utils";
import { UseWorkHours } from "../../../Hooks";

interface IWorkRecord {
  id: string;
  userId: string;
  profile: {
    id: string;
    name: string;
    surName: string;
    documents: string;
  };
  workDate: string;
  startTime: string;
  endTime: string;
  totalHours: string;
  description?: {
    date: string;
    details: string;
  }[];
  status: string;
}

export const Data = () => {
  const [currentData, setCurrentData] = useState<IWorkRecord[] | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTotalPage, setCurrentTotalPage] = useState<number>(1);
  const [currentLoading, setCurrentLoading] = useState(false);

  const theme = useTheme();
  const { userId, name, surName } = useParams<{
    userId: string;
    name: string;
    surName: string;
  }>();

  const { data, totalPages, loading, setPage, setSearchTerm, setUserId, page } =
    UseWorkHours<IWorkRecord>();
  useEffect(() => {
    if (userId) {
      setUserId(userId);
    }
  }, [userId]);

  useEffect(() => {
    setCurrentData(data);
    setCurrentPage(page);
    setCurrentTotalPage(totalPages);
    setCurrentLoading(loading);
  }, [data, page, totalPages, loading]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const searchMonths = (months: string, userId: string) => {
    setUserId(userId);
    setSearchTerm?.(months);
  };
  const resetFilters = () => {
    setSearchTerm?.("");
  };
  return (
    <CRow className="d-flex justify-content-center">
      <CCol md={12} className="text-center pb-3">
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ color: theme.palette.text.primary }}
        >
          Datos del Personal
        </Typography>
        <CBadge
          style={{
            backgroundColor: theme.palette.background.color.background,
            color: theme.palette.common.white,
            boxShadow:
              theme.palette.background.color.boxShadow ||
              "0px 4px 20px rgba(138, 43, 226, 0.5)",
          }}
        >
          {name?.length ? (
            <>
              {Capitalize(name || "")} {Capitalize(surName || "")}
            </>
          ) : (
            "Personal"
          )}
        </CBadge>
      </CCol>
      <CRow>
        <CCol md={6} className="text-center">
          {Months.slice(0, Months.length / 2).map((text, index) => (
            <BtnSmall
              key={index}
              text={text}
              onClick={() => searchMonths(text, userId!)}
            />
          ))}
        </CCol>
        <CCol md={6} className="text-center">
          {Months.slice(Months.length / 2).map((text, index) => (
            <BtnSmall
              key={index}
              text={text}
              onClick={() => searchMonths(text, userId!)}
            />
          ))}
        </CCol>
      </CRow>
      <CCol md={12} className="py-3">
        <Alert
          severity="info"
          sx={{
            backgroundColor: "transparent",
            boxShadow: theme.palette.background.color.boxShadow,
            border: `2px solid ${theme.palette.background.inputGrupColor?.focusBorder}`,
            color: theme.palette.background.alertPopup?.color,
          }}
        >
          ¡Atención! En esta sección verás únicamente los registros generados
          durante el mes en curso. Si deseas consultar registros de otro mes,
          por favor selecciona el botón correspondiente al mes deseado.
        </Alert>
      </CCol>
      <CCol md={12}>
        <BtnSmall text={"Reset Filtro"} onClick={() => resetFilters()} />
      </CCol>

      {currentLoading ? (
        <Loading />
      ) : (
        <>
          {currentData &&
            Array.isArray(currentData) &&
            currentData.length === 0 && (
              <CCol md={12} className="pt-3">
                <Alert severity="warning">
                  El personal aun no tiene documentos
                </Alert>
              </CCol>
            )}

          {currentData && typeof currentData[0] === "string" && (
            <CCol md={12} className="pt-3">
              <Alert severity="warning">{currentData[0]}</Alert>
            </CCol>
          )}

          {currentData &&
            Array.isArray(currentData) &&
            currentData.length > 0 &&
            typeof currentData[0] !== "string" && (
              <CRow>
                {currentData.map((documents) => (
                  <CCol md={6} key={documents.id}>
                    <AccordionsUserData documents={documents} />
                  </CCol>
                ))}
              </CRow>
            )}
        </>
      )}
      <CCol md={12} className="d-flex justify-content-center pt-5">
        <Paginations
          currentPage={currentPage}
          totalPages={currentTotalPage}
          onPageChange={handlePageChange}
        />
      </CCol>
    </CRow>
  );
};
