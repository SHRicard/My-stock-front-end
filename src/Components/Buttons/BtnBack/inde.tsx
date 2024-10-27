import React from "react";
import { IconButton } from "@mui/material"; // Botón de MUI
import { useNavigate } from "react-router-dom"; // Para la navegación
import { FaArrowLeft } from "react-icons/fa"; // Ícono de back de react-icons

interface IBtnBack {
  url: string; // Prop para recibir la URL
}

export const BtnBack: React.FC<IBtnBack> = ({ url }) => {
  const navigate = useNavigate(); // Hook de navegación de React Router

  const handleBack = () => {
    navigate(url); // Navegar a la URL pasada como prop
  };

  return (
    <IconButton
      onClick={handleBack}
      color="primary"
      aria-label="back"
      sx={{ borderRadius: "50%" }} // Estilo opcional
    >
      <FaArrowLeft /> {/* Icono de flecha */}
    </IconButton>
  );
};
