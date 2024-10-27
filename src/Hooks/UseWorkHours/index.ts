import { useState, useEffect } from "react";
import axios from "../../service/httpService";

import Swal from "sweetalert2";

interface IUseWorkHours<T> {
  data: T[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  setSearchTerm?: (term: string) => void;
  setUserId: (userId: string) => void;
  page: number;
  searchTerm?: string;
  userId: string;
}

export const UseWorkHours = <T>(): IUseWorkHours<T> => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 4;

  const MONTHS = import.meta.env.VITE_WORKE_HOURS_SEARCH_MONTHS;
  const RECORDS = `${import.meta.env.VITE_WORKE_HOURS_ALL_RECORDS}/${userId}`;

  const URL_ENDPOINT = searchTerm ? MONTHS : RECORDS;

  useEffect(() => {
    const fetchWorkHours = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const response = await axios.get(URL_ENDPOINT, {
          params: {
            userId: userId,
            search: searchTerm,
            limit,
            page,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          setData(response.data.data);
          setTotalPages(response.data.totalPages);
          setError(null);
        }
      } catch (err) {
        setError("Error al obtener los resultados.");
        console.error("Error al obtener los resultados:", err);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al realizar la solicitud.",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWorkHours();
  }, [searchTerm, page, userId]);

  return {
    data,
    totalPages,
    loading,
    error,
    setPage,
    setSearchTerm,
    setUserId,
    page,
    searchTerm,
    userId,
  };
};
