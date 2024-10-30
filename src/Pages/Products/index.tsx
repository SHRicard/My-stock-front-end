import { CCol, CContainer } from "@coreui/react";
import { useEffect, useState } from "react";
import {
  Paginations,
  PopupProduct,
  SearchProducts,
  TablaProducts,
} from "../../Components";
import { useNavigate } from "react-router-dom";
import { useFilterProducts, UseGetProducts } from "../../Hooks";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import axios from "../../service/httpService";
import { setUpdated } from "../../Store/Slices/updateSlice";
import { API_URLS } from "../../service/apiConfig";

interface IProduct {
  id: string;
  name: string;
  quantity: number;
  description: string;
  dimension: string;
  productType: string;
  price: string;
}

export const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState<IProduct[]>([]);
  const [currentDataProduct, setCurrentProduct] = useState<IProduct>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTotalPages, setCurrentTotalPages] = useState<number>(1);
  const [currentLoading, setCurrentLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const itemsPerPage = 6;

  const {
    data: products,
    totalPages,
    loading,
    setPage,
    page,
  } = UseGetProducts<IProduct>(itemsPerPage);
  const {
    searchTerm,
    filteredData,
    handleSearch,
    resetFilter,
    ///////
    filterPage,
    setFilterPage,
    filterTotalPages,
    filterLoading,
  } = useFilterProducts();

  useEffect(() => {
    if (searchTerm) {
      setCurrentData(filteredData as IProduct[]);
      setCurrentLoading(filterLoading);
      setCurrentPage(filterPage);
      setCurrentTotalPages(filterTotalPages);
    } else {
      setCurrentData(products);
      setCurrentLoading(loading);
      setCurrentPage(page);
      setCurrentTotalPages(totalPages);
    }
  }, [filteredData, products]);

  const handlePageChange = (value: number) => {
    if (searchTerm) {
      setFilterPage(value);
    } else setPage(value);
  };

  const createProduct = () => {
    navigate("/Dashboard/Producto/Crear");
  };

  const handleUpdate = (products: IProduct) => {
    const productsId = products.id;
    navigate(`/Dashboard/Producto/Editar/${productsId}`);
  };
  const deleteUser = async (products: IProduct) => {
    const productsId = products.id;
    const URL_ENDPOINT = API_URLS.PRODUCTS_DELETE;

    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás deshacer esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`${URL_ENDPOINT}/${productsId}`);
        if (response.status === 204) {
          Swal.fire("¡Borrado!", "El Producto ha sido eliminado.", "success");
          dispatch(setUpdated(true));
        } else {
          Swal.fire(
            "Error",
            "Hubo un problema al borrar el Producto.",
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error al borrar el Producto:", error);
      Swal.fire("Error", "Hubo un error al procesar la solicitud.", "error");
    }
  };

  const addData = (products: IProduct) => {
    setCurrentProduct(products as IProduct);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  return (
    <CContainer>
      <SearchProducts
        type="Create"
        createProduct={createProduct}
        onSearch={(query, type) => handleSearch(query, type)}
        onReset={resetFilter}
      />
      <TablaProducts
        loading={currentLoading}
        columnTitles={[
          "Nombre",
          "Dimensión",
          "Precio",
          "Cantidad",
          "Borrar",
          "Editar",
          "Control",
        ]}
        data={currentData}
        title={"Datos del Producto"}
        onData={addData}
        onUpdate={handleUpdate}
        onDelete={deleteUser}
      />
      <PopupProduct
        open={open}
        onClose={handleClose}
        currentProduct={currentDataProduct!}
        resetFilter={resetFilter}
      />
      <CCol md={12} className="d-flex justify-content-center pt-5">
        <Paginations
          currentPage={currentPage}
          totalPages={currentTotalPages}
          onPageChange={() => handlePageChange}
        />
      </CCol>
    </CContainer>
  );
};
