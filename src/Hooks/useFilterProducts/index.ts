import { useState, useEffect } from "react";
import axios from "../../service/httpService";

interface ProductService {
  id: string;
  name: string;
  price?: string;
  quantity?: number;
  dimension?: string;
}

export const useFilterProducts = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<"name" | "dimension">("name");
  const [filteredData, setFilteredData] = useState<ProductService[]>([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterError, setFilterError] = useState<string | null>(null);

  const [filterPage, setFilterPage] = useState<number>(1);
  const [filterTotalPages, setFilterTotalPages] = useState<number>(1);

  const URL_ENDPOINT = import.meta.env.VITE_PRODUCTS_SEARCH;

  useEffect(() => {
    const fetchFilteredData = async () => {
      setFilterLoading(true);
      try {
        const response = await axios.get(URL_ENDPOINT, {
          params: {
            searchType: searchType,
            term: searchTerm,
            limit: 10,
            page: filterPage,
          },
        });
        const resp = response.data.data ? response.data.data : [];
        setFilteredData(resp);
        setFilterTotalPages(response.data.totalPages);
      } catch (err) {
        setFilterError("Error al obtener los datos de productos.");
        console.error(err);
      } finally {
        setFilterLoading(false);
      }
    };

    if (searchTerm !== "") {
      fetchFilteredData();
    }
  }, [searchTerm, searchType]);

  const handleSearch = (query: string, type: "name" | "dimension") => {
    setSearchTerm(query);
    setSearchType(type);
  };

  const resetFilter = () => {
    setSearchTerm("");
    setFilteredData([]);
    setSearchType("name");
  };

  return {
    searchTerm,
    filteredData,
    handleSearch,
    resetFilter,
    filterLoading,
    filterError,
    filterPage,
    setFilterPage,
    filterTotalPages,
  };
};
