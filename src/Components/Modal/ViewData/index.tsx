import { Box, Button, Typography, Modal } from "@mui/material";
import { CCol, CRow } from "@coreui/react";
import { Btn } from "../../Buttons";
import { useTheme } from "@mui/material/styles";

interface IData {
  name: string;
}

interface IModal {
  handleOpen: boolean;
  closeModal: (open: boolean) => void;
  personalData: IData;
}

export const ViewData = ({ handleOpen, closeModal, personalData }: IModal) => {
  const theme = useTheme();

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 360, sm: 360, md: 800 },
    height: { xs: "95%", sm: "95%", md: "50%" },
    bgcolor: theme.palette.background.modal?.background,
    border: `2px solid ${theme.palette.background?.modal?.borderColor}`,
    boxShadow: theme.palette.background?.modal?.boxShadow,
    p: 4,
  };

  const handleClose = () => closeModal(false);

  return (
    <div>
      <Modal
        onClose={() => {}}
        open={handleOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <CRow>
            <CCol md={12} className="text-center">
              <Typography
                id="modal-title"
                variant="h6"
                component="h2"
                sx={{ color: theme.palette.background.modal?.textColor }} // Aplicamos color del texto
              >
                Datos de {personalData?.name}
              </Typography>
              <Typography
                id="modal-description"
                sx={{ mt: 2, color: theme.palette.background.modal?.textColor }} // Aplicamos color del texto
              >
                Por favor ingrese los datos del personal
              </Typography>
            </CCol>

            {/* Botones */}
            <CCol md={12} className="text-end">
              <Box sx={{ m: 1, alignItems: "end" }}>
                <Btn text="Cerrar" onClick={handleClose} />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ m: 1 }}
                  size="medium"
                >
                  <Typography variant="subtitle2" noWrap component="strong">
                    Crear Personal
                  </Typography>
                </Button>
              </Box>
            </CCol>
          </CRow>
        </Box>
      </Modal>
    </div>
  );
};
