import { useState, useEffect } from "react";
import axios from "../../service/httpService";

import { useDispatch, useSelector } from "react-redux";
import { setUpdated } from "../../Store/Slices/updateSlice";
import { RootState } from "../../Store";

interface IUseAllDocuments<T> {
  data: T[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  page: number;
}

export const useAllDocuments = <T>(limit: number): IUseAllDocuments<T> => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updated = useSelector((state: RootState) => state.update.updated);
  const dispatch = useDispatch();
  const URL_ENDPOINT = import.meta.env.VITE_WORKE_RECORDS_ACTIVE;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(URL_ENDPOINT, {
          params: {
            limit,
            page,
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
  }, [page, limit, updated]);

  return { data, totalPages, loading, error, setPage, page };
};
