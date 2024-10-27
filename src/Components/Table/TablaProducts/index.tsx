import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert } from "@mui/material";
import { CCol } from "@coreui/react";
import { BtnMini } from "../../Buttons";
import { Capitalize } from "../../../Utils";

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

interface IProduct {
  id: string;
  name: string;
  quantity: number;
  description: string;
  dimension: string;
  productType: string;
  price: string;
}

interface TablesProps {
  columnTitles: string[];
  data: IProduct[];
  title: string;
  onData: (user: IProduct) => void;
  onDelete: (user: IProduct) => void;
  onUpdate: (user: IProduct) => void;
  loading: boolean;
}

export const TablaProducts: React.FC<TablesProps> = ({
  columnTitles,
  data,
  onData,
  onDelete,
  onUpdate,
  loading,
}) => {
  return (
    <CCol md={12} className="d-flex justify-content-center pt-3">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 500, tableLayout: "fixed" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {columnTitles.map((title) => (
                <StyledTableCell key={title}>{title}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading === true ? (
            <TableCell colSpan={columnTitles.length} align="center">
              <Alert severity="warning">Cargando Datos</Alert>
            </TableCell>
          ) : (
            <TableBody>
              {data && data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columnTitles.length} align="center">
                    <Alert severity="warning">
                      No hay datos disponibles del Personal
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : (
                data &&
                data?.length &&
                data?.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{Capitalize(row.name)}</StyledTableCell>
                    <StyledTableCell>
                      {Capitalize(row.dimension)}
                    </StyledTableCell>
                    <StyledTableCell>{Capitalize(row.price)}</StyledTableCell>
                    <StyledTableCell>{row.quantity}</StyledTableCell>

                    <StyledTableCell>
                      <BtnMini onClick={() => onDelete(row)} type="delete" />
                    </StyledTableCell>

                    <StyledTableCell>
                      <BtnMini onClick={() => onUpdate(row)} type="update" />
                    </StyledTableCell>

                    <StyledTableCell>
                      <BtnMini onClick={() => onData(row)} type="data" />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </CCol>
  );
};
