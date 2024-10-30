import { useState } from "react";
import axios from "../../service/httpService";
import { API_URLS } from "../../service/apiConfig";

interface DollarData {
  blue: {
    compra: string;
    venta: string;
  };
}

export const useDollarData = () => {
  const [dollarData, setDollarData] = useState<DollarData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDollarData = async () => {
    try {
      const URL_ENDPOINT = API_URLS.DOLAR_BLUE;
      const { data } = await axios.get(URL_ENDPOINT);

      if (data.success) {
        setDollarData({
          blue: {
            compra: data.blue.compra,
            venta: data.blue.venta,
          },
        });
      } else {
        setError(data.message || "Error fetching data");
      }
    } catch (err) {
      setError("Error fetching data");
      console.error(err);
    }
  };

  return { dollarData, error, fetchDollarData }; // Exportamos la función fetchDollarData
};
