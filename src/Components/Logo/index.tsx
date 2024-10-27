import React from "react";

interface LogoProps {
  src: string;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({ src, alt = "Logo" }) => {
  return <img src={src} alt={alt} style={{ width: "100px" }} />;
};
