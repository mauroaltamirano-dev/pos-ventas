/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { v } from "../../../styles/variables.jsx";
import {
  InputText,
  Btn1,
  ConverterCapitalize,
  useCompanyStore,
  useProductsStore,
  ContainerSelector,
  Switch1,
  Selector,
  useBranchesStore,
  ListSelect,
  useCategoriesStore,
  Checkbox1,
  BtnSpan,
  useStoreStore,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Device } from "../../../styles/breakpoints.jsx";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function RegisterProducts({
  onClose,
  dataSelect,
  action,
  setIsExploding,
  state,
}) {
  const { branchesItemSelect, branches, selectBranch } = useBranchesStore();
  const {
    insertProducts,
    editProducts,
    generatedCode,
    codeGeneratorProd,
    refetchs,
  } = useProductsStore();
  const { insertStockStore, showStore, dataStore, deleteStockStore } =
    useStoreStore();
  const { companyData } = useCompanyStore();
  const { dataCategories, categoriesItemSelect, selectCategory } =
    useCategoriesStore();

  const [stateInventory, setStateInventory] = useState(false);
  const [stateEnabledStock, setStateEnabledStock] = useState(false);
  const [stateBranchesList, setStateBranchesList] = useState(false);
  const [stateListCategories, setStateListCategories] = useState(false);

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [forSale, setForSale] = useState("UNIDAD");

  const [randomInternalCode, setRandomInternalCode] = useState("");
  const [randomBarCode, setRandomBarCode] = useState("");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "Show Stock Store for Branch",
      { id_product: dataSelect.id, id_branch: branchesItemSelect.id },
    ],
    queryFn: () => {
      return showStore({
        id_branch: branchesItemSelect.id,
        id_product: dataSelect.id,
      });
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insert,
    mutationKey: ["insertar-producto"],
    onError: (err) => console.log("El error", err.message),
    onSuccess: () => closeForm(),
  });

  const handleSubmitForm = (data) => {
    doInsertar(data);
  };

  const closeForm = () => {
    onClose();
    setIsExploding(true);
  };

  async function insert(data) {
    validateEmpty(data);

    if (action === "Edit") {
      const p = {
        _id: dataSelect.id,
        _name: data.name,
        _sale_price: parseFloat(data.sale_price),
        _buy_price: parseFloat(data.buy_price),
        _id_category: categoriesItemSelect.id,
        _bar_code: randomBarCode ? randomBarCode : generatedCode,
        _internal_code: randomInternalCode ? randomInternalCode : generatedCode,
        _id_company: companyData.id,
        _for_sale: forSale,
        _inventory_manager: stateInventory,
      };
      await editProducts(p, dataSelect.icon);

      if (stateInventory) {
        if (dataStore === null) {
          const pStore = {
            id_branch: branchesItemSelect.id,
            id_product: dataSelect.id,
            stock: parseFloat(data.stock),
            min_stock: parseFloat(data.min_stock),
          };
          console.log("🚀 ~ total:", pStore);

          await insertStockStore(pStore);
        }
      }
    } else {
      const pProduct = {
        _name: data.name,
        _sale_price: parseFloat(data.sale_price),
        _buy_price: parseFloat(data.buy_price),
        _id_category: categoriesItemSelect.id,
        _bar_code: randomBarCode ? randomBarCode : generatedCode,
        _internal_code: randomInternalCode ? randomInternalCode : generatedCode,
        _id_company: companyData.id,
        _for_sale: forSale,
        _inventory_manager: stateInventory,
        _multiprice_manager: false,
      };
      console.log("🚀 ~ total:", pProduct);

      const idNewProduct = await insertProducts(pProduct);
      if (stateInventory) {
        const pStore = {
          id_branch: branchesItemSelect.id,
          id_product: idNewProduct,
          stock: parseFloat(data.stock),
          min_stock: parseFloat(data.min_stock),
        };
        console.log("🚀 ~ total:", pStore);

        await insertStockStore(pStore);
      }
    }
  }

  function checkUseInventory() {
    if (action === "Edit") {
      if (dataStore) {
        if (stateInventory) {
          Swal.fire({
            title: "¿Estás seguro(a)?",
            text: "Si desactiva esta opción se eliminará el stock!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              setStateInventory(false);
              await deleteStockStore({ id: dataStore.id });
            }
          });
        } else {
          setStateInventory(true);
        }
      } else {
        setStateInventory(!stateInventory);
      }
    } else {
      setStateInventory(!stateInventory);
    }
  }

  function toggleCategoriesList() {
    setStateListCategories((prev) => !prev);
    setStateBranchesList(false);
  }

  function toggleBranchesList() {
    setStateBranchesList((prev) => !prev);
    setStateListCategories(false);
  }

  const toggleChecked = (checkBoxNumber) => {
    if (checkBoxNumber === 1) {
      setIsChecked1(true);
      setIsChecked2(false);
      setForSale("UNIDAD");
    } else {
      setIsChecked1(false);
      setIsChecked2(true);
      setForSale("CANTIDAD");
    }
  };

  function generateInternalCode() {
    codeGeneratorProd();
    setRandomInternalCode(generatedCode);
    dataSelect.internal_code = generatedCode;
  }

  function generateCodeBarcode() {
    codeGeneratorProd();
    setRandomBarCode(generatedCode);
    dataSelect.bar_code = generatedCode;
  }

  const handleRandomInternalCode = (event) => {
    setRandomInternalCode(event.target.value);
  };

  const handleRandomBarcode = (event) => {
    setRandomBarCode(event.target.value);
  };

  function validateEmpty(data) {
    if (!randomInternalCode) {
      generateInternalCode();
    }
    if (!randomBarCode) {
      generateCodeBarcode();
    }
    if (data.sale_price.trim() === "") {
      data.sale_price = 0;
    }
    if (data.buy_price.trim() === "") {
      data.buy_price = 0;
    }
    if (stateInventory) {
      if (!dataStore) {
        if (data.stock.trim() === "") {
          data.stock = 0;
        }
        if (data.min_stock.trim() === "") {
          data.min_stock = 0;
        }
      }
    }
  }

  useEffect(() => {
    if (action != "Edit") {
      generateInternalCode();
    } else {
      setRandomInternalCode(dataSelect.internal_code);
      setRandomBarCode(dataSelect.bar_code);
      dataSelect.for_sale === "UNIDAD" ? toggleChecked(1) : toggleChecked(0);
      dataSelect.inventory_manager
        ? setStateInventory(true)
        : setStateInventory(false);
      dataSelect.inventory_manager
        ? setStateEnabledStock(true)
        : setStateEnabledStock(false);
    }
  }, []);

  return (
    <Container>
      {isPending ? (
        <span>...🔼</span>
      ) : (
        <div className="sub-contenedor">
          <div className="headers">
            <section>
              <h1>
                {action == "Edit"
                  ? "Editar producto"
                  : "Registrar nuevo producto"}
              </h1>
            </section>

            <section>
              <span
                onClick={() => {
                  refetchs();
                  onClose();
                }}
              >
                x
              </span>
            </section>
          </div>

          <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <section className="section1">
              {" "}
              <article>
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.name}
                    type="text"
                    placeholder="Nombre"
                    {...register("name", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Nombre</label>
                  {errors.name?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    step="0.01"
                    className="form__field"
                    defaultValue={dataSelect.sale_price}
                    type="number"
                    placeholder="Precio de venta"
                    {...register("sale_price")}
                  />
                  <label className="form__label">Precio de Venta</label>
                </InputText>
              </article>
              <article>
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    step="0.01"
                    className="form__field"
                    defaultValue={dataSelect.buy_price}
                    type="number"
                    placeholder="Precio de compra"
                    {...register("buy_price")}
                  />
                  <label className="form__label">Precio de compra</label>
                </InputText>
              </article>
              <article className="contentFatherGenerate">
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    step="1"
                    className="form__field"
                    value={randomBarCode}
                    type="text"
                    placeholder="Código de barra"
                    onChange={handleRandomBarcode}
                    // {...register("bar_code")}
                  />
                  <label className="form__label">Código de barra</label>
                </InputText>
                <ContainerBtnGenerate>
                  <BtnSpan title={"Generar"} func={generateCodeBarcode} />
                </ContainerBtnGenerate>
              </article>
              <article className="contentFatherGenerate">
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    onChange={handleRandomInternalCode}
                    step="1"
                    className="form__field"
                    value={randomInternalCode}
                    type="text"
                    placeholder="Código de interno"
                    // {...register("internal_code")}
                  />
                  <label className="form__label">Código interno</label>
                </InputText>
                <ContainerBtnGenerate>
                  <BtnSpan title={"Generar"} func={generateInternalCode} />
                </ContainerBtnGenerate>
              </article>
            </section>

            <section className="section2">
              <label>Se vende por:</label>
              <ContainerSelector>
                <label>UNIDAD</label>
                <Checkbox1
                  isChecked={isChecked1}
                  onChange={() => toggleChecked(1)}
                />
                <label>CANTIDAD(decimales)</label>
                <Checkbox1
                  isChecked={isChecked2}
                  onChange={() => toggleChecked(2)}
                />
              </ContainerSelector>
              <ContainerSelector>
                <label>Categoría: </label>
                <Selector
                  color="#fc6027"
                  text1={"🔖"}
                  text2={categoriesItemSelect?.name}
                  func={toggleCategoriesList}
                  state={stateListCategories}
                />
                <ListSelect
                  data={dataCategories}
                  top={"4rem"}
                  setState={toggleCategoriesList}
                  func={selectCategory}
                  state={stateListCategories}
                />
              </ContainerSelector>
              <ContainerSelector>
                <label>Controlar Stock: </label>
                <Switch1 state={stateInventory} setState={checkUseInventory} />
              </ContainerSelector>
              {stateInventory && (
                <ContainerStock>
                  <ContainerSelector>
                    <label>Sucursal: </label>
                    <Selector
                      color="#fc6027"
                      text1={"🏢"}
                      text2={branchesItemSelect?.name}
                      func={toggleBranchesList}
                      state={stateBranchesList}
                    />
                    <ListSelect
                      refetch={refetch}
                      data={branches}
                      top={"4rem"}
                      setState={toggleBranchesList}
                      func={selectBranch}
                      state={stateBranchesList}
                    />
                  </ContainerSelector>
                  {stateEnabledStock && (
                    <ContainerInputStock>
                      <span>
                        Para editar el stock, debe hacerlo desde el KARDEX.
                      </span>
                    </ContainerInputStock>
                  )}
                  <article>
                    <InputText icono={<v.arrowRightIcon />}>
                      <input
                        disabled={stateEnabledStock}
                        className="form__field"
                        defaultValue={dataStore?.stock}
                        step="0.01"
                        type="number"
                        placeholder="Stock"
                        {...register("stock")}
                      />
                      <label className="form__label">Stock</label>
                    </InputText>
                  </article>
                  <article>
                    <InputText icono={<v.arrowRightIcon />}>
                      <input
                        disabled={stateEnabledStock}
                        className="form__field"
                        defaultValue={dataStore?.min_stock}
                        step="0.01"
                        type="number"
                        placeholder="Stock mínimo"
                        {...register("min_stock")}
                      />
                      <label className="form__label">Stock mínimo</label>
                    </InputText>
                  </article>
                </ContainerStock>
              )}
            </section>

            <Btn1
              type="submit"
              icon={<v.saveIcon />}
              title="Guardar"
              bgColor="#F9D70B"
            />
          </form>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    position: relative;
    width: 100%;
    margin: 0 25px;
    max-width: 95%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgTotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 25px;

      @media ${Device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }

      .section1,
      .section2 {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }

      .contentFatherGenerate {
        position: relative;
      }
    }
  }
`;

const ContainerStock = styled.div`
  border: 1px solid rgba(240, 104, 46, 0.9);
  display: flex;
  border-radius: 15px;
  padding: 12px;
  flex-direction: column;
  background-color: rgba(240, 177, 46, 0.05);
`;

const ContainerBtnGenerate = styled.div`
  position: absolute;
  right: 0;
  top: 10%;
`;

const ContainerInputStock = styled.div`
  text-align: center;
  color: #f9184c;
  background-color: rgba(249, 21, 35, 0.2);
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  border: 2px dashed #f9d70b;
  border-radius: 5px;
  background-color: rgba(249, 215, 11, 0.1);
  padding: 8px;
  position: relative;
  gap: 3px;
  margin-bottom: 8px;

  .ContentImage {
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  input {
    display: none;
  }
`;
