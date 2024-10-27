import { useState } from "react";
import axios from "../../service/httpService";

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
      // Hacemos la solicitud a nuestro backend
      const { data } = await axios.get("http://localhost:3000/dollar-blue");

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
