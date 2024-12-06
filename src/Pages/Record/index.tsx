import {
  AccordionsGlobalLogs,
  BtnSmall,
  Loading,
  Paginations,
} from "../../Components";
import { CBadge, CCol, CContainer, CRow } from "@coreui/react";
import { UseGlobalLogs } from "../../Hooks";
import { Alert, Typography, useTheme } from "@mui/material";
import { Months } from "../../Utils";

export interface IGlobalLogs {
  id?: string;
  module: string;
  operation: string;
  entityId: string;
  changes: {
    message: string;
    data: unknown;
  };
  date: string;
  userId?: string;
}

export const Record = () => {
  const theme = useTheme();
  const itemsPerPage = 20;

  const {
    data: logs,
    totalPages,
    page,
    setPage,
    setSearchTerm,
    resetFilter,
    loading,
  } = UseGlobalLogs<IGlobalLogs>(itemsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const searchMonths = (months: string) => {
    setSearchTerm(months);
  };
  return (
    <CContainer>
      <CCol md={12} className="text-center pb-3">
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ color: theme.palette.text.primary }}
        >
          Datos Generales
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
          Datos
        </CBadge>
      </CCol>
      <CRow>
        <CCol md={6} className="text-center">
          {Months.slice(0, Months.length / 2).map((text, index) => (
            <BtnSmall
              key={index}
              text={text}
              onClick={() => searchMonths(text)}
            />
          ))}
        </CCol>
        <CCol md={6} className="text-center">
          {Months.slice(Months.length / 2).map((text, index) => (
            <BtnSmall
              key={index}
              text={text}
              onClick={() => searchMonths(text)}
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
      <CCol>
        <BtnSmall text={"Reset Filtro"} onClick={() => resetFilter()} />
      </CCol>
      {loading === true ? (
        <Loading />
      ) : (
        <CRow>
          {logs && logs.length > 0 ? (
            logs.map((log) => (
              <CCol md={6}>
                <AccordionsGlobalLogs key={log.id} data={log!} />
              </CCol>
            ))
          ) : (
            <CCol md={12} className="pt-3">
              <Alert
                severity="error"
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  minHeight: "80px",
                  display: "flex",
                  boxShadow: theme.palette.background.color.boxShadow,
                  alignItems: "center",
                  border: `2px solid ${theme.palette.background.alertPopup?.Error}`,
                  color: theme.palette.background.alertPopup?.color,
                }}
              >
                No se encontraron registros de acciones realizadas para el mes
                seleccionado.
              </Alert>
            </CCol>
          )}
        </CRow>
      )}
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
