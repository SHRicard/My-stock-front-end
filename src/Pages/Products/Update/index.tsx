import { Box, Button, Typography } from "@mui/material";
import { CCol, CRow, CForm, CBadge, CFormSelect } from "@coreui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { Loading, Text } from "../../../Components";
import axios from "../../../service/httpService";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormatPrice, ToLowerCase } from "../../../Utils";
import { setUpdated } from "../../../Store/Slices/updateSlice";
import { API_URLS } from "../../../service/apiConfig";

interface IFormInput {
  id: string;
  name: string;
  quantity: number;
  description: string;
  dimension: string;
  productType: string;
  price: string;
}

export const UpdateProducts = () => {
  const [loading, setLoading] = useState(true);
  const [dataProduct, setDataProduct] = useState<IFormInput | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({
    mode: "onSubmit",
    shouldUseNativeValidation: false,
  });
  const { productsId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [productType, setProductType] = useState("cubierta");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProductType(event.target.value);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let haveErrors = false;
    let errorMessages = "";

    if (
      data.name.length < 3 ||
      data.quantity <= 0 ||
      data.dimension.length < 1
    ) {
      haveErrors = true;
      errorMessages =
        "Todos los campos deben tener un valor adecuado y el nombre del producto debe tener al menos 3 caracteres.";
    }

    if (haveErrors) {
      Swal.fire({
        icon: "error",
        title: "Error en los datos",
        text: errorMessages,
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de que deseas crear este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, crear",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Procesando...",
          text: "Por favor espera mientras se crea el producto.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const productData = {
          name: ToLowerCase(data.name),
          quantity: Number(data.quantity),
          description: ToLowerCase(data.description),
          dimension: ToLowerCase(data.dimension),
          type: data.productType || "cubierta",
          price: `${FormatPrice(data.price)} $`,
        };

        const URL_ENDPOINT = API_URLS.PRODUCTS_UPDATE;

        try {
          const response = await axios.put(
            `${URL_ENDPOINT}/${productsId}`,
            productData
          );

          if (response.status >= 200 && response.status < 300) {
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "El producto ha sido Editado exitosamente.",
              confirmButtonText: "OK",
            });
            dispatch(setUpdated(true));
            navigate("/Dashboard/Producto");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema al Editado el producto.",
              confirmButtonText: "OK",
            });
          }
        } catch (error) {
          console.error("Error al enviar los datos:", error);
          if (axios.isAxiosError(error) && error.response) {
            console.error("Detalles del error:", error.response.data);
          }

          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al enviar los datos.",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const URL_ENDPOINT = API_URLS.PRODUCTS_SEARCH;

        const response = await axios.get(`${URL_ENDPOINT}/${productsId}`);

        if (response.status >= 200 && response.status < 300) {
          const product = response.data;
          setDataProduct(product);
          setValue("name", product.name);
          setValue("quantity", product.quantity);
          setValue("description", product.description);
          setValue("dimension", product.dimension);
          setValue("productType", product.productType);
          setValue("price", product.price);
        }
      } catch (error) {
        console.error("Error al obtener los datos del Producto:", error);

        // Mostrar una alerta de error con SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al cargar los datos del Producto.",
          confirmButtonText: "OK",
        });
      } finally {
        // Asegúrate de actualizar el estado de carga al finalizar
        setLoading(false);
      }
    };

    fetchUserData();
  }, [productsId, setValue]);
  useEffect(() => {
    setValue("productType", "cubierta");
  }, [setValue]);

  if (loading) {
    return <Loading />;
  }
  return (
    <CRow className="d-flex justify-content-center align-items-center">
      <CCol md={12} className="text-center">
        <Typography id="modal-title" variant="h6" component="h2">
          Editar Producto
        </Typography>
        <CBadge
          style={{
            backgroundColor: theme.palette.background.color.background,
            color: theme.palette.common.white,
            boxShadow:
              theme.palette.background.color.boxShadow ||
              "0px 4px 20px rgba(138, 43, 226, 0.5)",
          }}
        >
          {dataProduct?.name}
        </CBadge>
      </CCol>
      <CCol md={11} className="pt-4">
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CRow>
            <CCol md={6} className="py-2">
              <Text
                type="text"
                register={register("name", {
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.name}
                errorMessage={errors.name?.message}
                placeholder="Ej: Marca"
                label="Marca"
                helperText="*Por favor ingrese la marca"
              />
            </CCol>
            <CCol md={6} className="py-2">
              <Text
                type="number"
                register={register("quantity", {
                  required: "Este campo es obligatorio",
                  min: { value: 1, message: "Debe ser mayor a 0" },
                })}
                error={!!errors.quantity}
                errorMessage={errors.quantity?.message}
                placeholder="Ej: 10"
                label="Cantidad"
                helperText="*Por favor ingrese la cantidad"
              />
            </CCol>
            <CCol md={6} className="py-2">
              <Text
                type="details"
                register={register("dimension", {
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.dimension}
                errorMessage={errors.dimension?.message}
                placeholder="Ej: 225/55 R17 o 36MM"
                label="Dimensiones"
                helperText="*Por favor ingrese las dimensiones"
              />
            </CCol>

            <CCol md={6} className="py-2">
              <Text
                type="number"
                register={register("price", {
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.price}
                errorMessage={errors.price?.message}
                placeholder="Ej: 100.00$"
                label="Precio de Compra por Unidad"
                helperText="*Por favor ingrese el precio de compra valor por Unidad"
              />
            </CCol>

            <CCol md={6} className="py-2">
              <CFormSelect
                size="sm"
                className="mb-3"
                aria-label="Large select example"
                value={productType}
                onChange={handleSelectChange}
                style={{
                  margin: "1px",
                  padding: "8px",
                  backgroundColor: "transparent",
                  border: `1px solid ${theme.palette.background.inputGrupColor?.border}`,
                  color: theme.palette.text.primary,
                  boxShadow: "0 0 10px rgba(138, 43, 226, 0.5)",
                  borderRadius: "4px",
                  borderColor: theme.palette.background.inputGrupColor?.border,
                }}
              >
                <option disabled style={{ color: theme.palette.text.primary }}>
                  Tipo de Producto
                </option>
                <option
                  value="cubierta"
                  style={{ color: theme.palette.text.primary }}
                >
                  Cubierta
                </option>
                <option
                  value="herramienta"
                  style={{ color: theme.palette.text.primary }}
                >
                  Herramienta
                </option>
              </CFormSelect>
            </CCol>
            <CCol md={12} className="py-2">
              <Text
                rows={3}
                type="details"
                register={register("description", {
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.description}
                errorMessage={errors.description?.message}
                placeholder="Ej: Cubierta todo terreno, 225mm de ancho"
                label="Descripción"
                helperText="*Por favor ingrese la descripción"
              />
            </CCol>

            {/* Botones */}
            <CCol md={12} className="text-end">
              <Box sx={{ m: 1, alignItems: "end" }}>
                <Button
                  type="submit"
                  sx={{
                    m: 1,
                    border: "1px solid",
                    fontSize: "12px",
                    color: theme.palette.background.btnGrupColor?.login,
                    borderColor:
                      theme.palette.background.btnGrupColor?.outlineBorder,
                    "&:hover": {
                      borderColor:
                        theme.palette.background.btnGrupColor?.hoverBorder,
                      backgroundColor:
                        theme.palette.background.btnGrupColor?.hoverBg,
                      color: theme.palette.background.btnGrupColor?.hoverText,
                    },
                  }}
                >
                  Editar Producto
                </Button>
              </Box>
            </CCol>
          </CRow>
        </CForm>
      </CCol>
    </CRow>
  );
};
