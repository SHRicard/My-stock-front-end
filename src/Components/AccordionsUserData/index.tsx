import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material";
import { FormatDate, FormatTime } from "../../Utils";
import { useState } from "react";

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

interface IAccordions {
  documents: IWorkRecord;
}

export const AccordionsUserData = ({ documents }: IAccordions) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Accordion
      key={documents.id}
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
      expanded={expanded === documents.id}
      onChange={handleChange(documents.id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${documents.id}-content`}
        id={`${documents.id}-header`}
      >
        <Typography sx={{ flexShrink: 0 }}>
          {FormatDate(documents.workDate)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1">
          <strong>Tiempo total trabajado en el día:</strong>{" "}
          {documents.totalHours}
        </Typography>

        <Typography variant="subtitle1">
          <strong>Trabajador:</strong> {documents.profile.name}{" "}
          {documents.profile.surName}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Documento:</strong> {documents.profile.documents}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Hora de inicio:</strong> {FormatTime(documents.startTime)}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Hora de fin:</strong> {FormatTime(documents.endTime)}
        </Typography>

        {/* Mostrar descripciones si están presentes */}
        {documents.description && documents.description.length > 0 && (
          <div>
            <Typography variant="h6" gutterBottom>
              Notas Agregadas:
            </Typography>
            {documents.description.map((desc, index) => (
              <Typography key={index}>
                N° {index + 1} - {FormatDate(desc.date)} - {desc.details}
              </Typography>
            ))}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
