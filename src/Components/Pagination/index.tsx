import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material";
interface IPaginations {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const Paginations = ({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginations) => {
  const theme = useTheme();

  return (
    <Pagination
      sx={{
        "& .MuiPaginationItem-root": {
          color: theme.palette.background.badge?.textColor,
          fontWeight: 500,
          fontSize: "1rem",
        },
        "& .Mui-selected": {
          color: theme.palette.background.btnGrupColor?.login,
          fontWeight: 900,
        },
      }}
      count={totalPages}
      page={currentPage}
      onChange={onPageChange}
      size="small"
    />
  );
};
