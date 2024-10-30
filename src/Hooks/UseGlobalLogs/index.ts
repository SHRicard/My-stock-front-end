import { useState, useEffect } from "react";
import axios from "../../service/httpService";

import { useDispatch, useSelector } from "react-redux";
import { setUpdated } from "../../Store/Slices/updateSlice";
import { RootState } from "../../Store";
import { API_URLS } from "../../service/apiConfig";

interface UseLogsResult<T> {
  data: T[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  resetFilter: () => void;
  page: number;
}

export const UseGlobalLogs = <T>(limit: number): UseLogsResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Para el filtro de mes

  const updated = useSelector((state: RootState) => state.update.updated);
  const dispatch = useDispatch();

  const MOSTHS = API_URLS.GLOBAL_LOGS_MONTHS;
  const ALL_LOGS = API_URLS.GLOBAL_LOGS_ALL;

  const URL_ENDPOINT = searchTerm ? MOSTHS : ALL_LOGS;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(URL_ENDPOINT, {
          params: {
            limit,
            page,
            month: searchTerm || undefined, // Solo envía el mes si existe
          },
        });

        setData(response.data.data);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError("Error al obtener los datos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    if (updated) {
      dispatch(setUpdated(false));
    }
  }, [page, limit, searchTerm, updated]);

  const resetFilter = () => {
    setSearchTerm("");
    setPage(1);
  };

  return {
    data,
    totalPages,
    loading,
    error,
    setPage,
    setSearchTerm,
    resetFilter,
    page,
  };
};
