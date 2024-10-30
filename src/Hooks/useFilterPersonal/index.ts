import { useState, useEffect } from "react";
import axios from "../../service/httpService";
import { API_URLS } from "../../service/apiConfig";
interface PersonalService {
  id: string;
  name: string;
  entrada?: string;
  salida?: string;
}

export const useFilterPersonal = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<PersonalService[]>([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterError, setFilterError] = useState<string | null>(null);
  const [filterTotalPages, setFilterTotalPages] = useState<number>(1);
  const [filterPage, setFilterPage] = useState<number>(1);

  const URL_ENDPOINT = API_URLS.USER_SEARCH;

  useEffect(() => {
    const fetchFilteredData = async () => {
      setFilterLoading(true);
      try {
        const response = await axios.get(URL_ENDPOINT, {
          params: {
            name: searchTerm,
            limit: 10,
            page: filterPage,
          },
        });
        const resp = response.data.data ? response.data.data : [];
        setFilteredData(resp);
        setFilterTotalPages(response.data.totalPages);
      } catch (err) {
        setFilterError("Error al obtener los datos.");
        console.error(err);
      } finally {
        setFilterLoading(false);
      }
    };

    if (searchTerm !== "") {
      fetchFilteredData();
    }
  }, [searchTerm]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const resetFilter = () => {
    setSearchTerm("");
    setFilteredData([]);
  };

  return {
    searchTerm,
    filteredData,
    handleSearch,
    resetFilter,
    filterLoading,
    filterError,
    setFilterPage,
    filterTotalPages,
    filterPage,
  };
};
