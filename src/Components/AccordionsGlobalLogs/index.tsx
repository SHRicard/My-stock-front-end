import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material";
import { FormatDate } from "../../Utils";

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
  nameUser?: string;
}

export const AccordionsGlobalLogs = ({ data }: { data: IGlobalLogs }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const theme = useTheme();
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      key={data.id}
      sx={{
        m: 1,
        border: "1px solid",
        fontSize: "12px",
        color: theme.palette.text.primary,
        borderColor: theme.palette.background.btnGrupColor?.outlineBorder,
        "&:hover": {
          borderColor: theme.palette.background.btnGrupColor?.hoverBorder,
          backgroundColor: theme.palette.background.btnGrupColor?.hoverBg,
        },
      }}
      expanded={expanded === data.id}
      onChange={handleChange(data.id || "")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${data.id}-content`}
        id={`${data.id}-header`}
      >
        <Typography sx={{ display: "flex", flexDirection: "column" }}>
          <span>{data.module}</span>
          <Typography
            variant="caption"
            sx={{ mt: 0.5, color: theme.palette.text.primary }}
          >
            {FormatDate(data.date)}
          </Typography>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1">
          <strong>Operacion:</strong> {data.operation}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Entidad:</strong> {data.entityId}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Mensaje:</strong> {data.changes.message}
        </Typography>
        <Typography variant="subtitle1">
          <strong>ID de Usuario:</strong> {data.userId || "N/A"}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Acción Realizada por:</strong> {data.nameUser}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Fecha de Registro:</strong> {FormatDate(data.date)}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
