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
import { useMutation } from "@tanstack/react-query";
import { Device } from "../../../styles/breakpoints.jsx";
import { useEffect, useState } from "react";

export function RegisterProducts({
  onClose,
  dataSelect,
  action,
  setIsExploding,
  state,
}) {
  const { branchesItemSelect, branches, selectBranch } = useBranchesStore();
  const { insertProducts, editProducts, generatedCode, codeGeneratorProd } =
    useProductsStore();
  const { insertStockStore } = useStoreStore();
  const { companyData } = useCompanyStore();
  const { dataCategories, categoriesItemSelect, selectCategory } =
    useCategoriesStore();

  const [stateInventory, setStateInventory] = useState(false);
  const [stateBranchesList, setStateBranchesList] = useState(false);
  const [stateListCategories, setStateListCategories] = useState(false);

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [forSale, setForSale] = useState("UNIDAD");

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
        _name: ConverterCapitalize(data.name),
        _idcompany: companyData.id,
        _id: dataSelect.id,
      };
      await editProducts(p, dataSelect.icon);
    } else {
      const pProduct = {
        _name: data.name,
        _sale_price: parseFloat(data.sale_price),
        _buy_price: parseFloat(data.buy_price),
        _id_category: categoriesItemSelect.id,
        _bar_code: data.bar_code,
        _internal_code: data.internal_code,
        _id_company: companyData.id,
        _for_sale: forSale,
        _inventory_manager: stateInventory,
        _multiprice_manager: false,
      };
      console.log("🚀 ~ total:", pProduct);

      const idNewProduct = await insertProducts(pProduct);

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

  function generateCodeFunction() {
    codeGeneratorProd();
    dataSelect.internal_code = generatedCode;
  }

  function generateCodeBarcode() {
    codeGeneratorProd();
    dataSelect.bar_code = generatedCode;
  }

  function validateEmpty(data) {
    if (data.internal_code.trim() === "") {
      generateCodeFunction();
      data.internal_code = dataSelect.internal_code;
    }
    if (data.bar_code.trim() === "") {
      generateCodeBarcode();
      data.bar_code = dataSelect.bar_code;
    }
    if (data.sale_price.trim() === "") {
      data.sale_price = 0;
    }
    if (data.buy_price.trim() === "") {
      data.buy_price = 0;
    }
    if (stateInventory) {
      if (data.stock.trim() === "") {
        data.stock = 0;
      }
      if (data.min_stock.trim() === "") {
        data.min_stock = 0;
      }
    }
  }

  useEffect(() => {
    if (action != "Edit") {
      generateCodeFunction();
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
              <span onClick={onClose}>x</span>
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
                    defaultValue={dataSelect.bar_code}
                    type="text"
                    placeholder="Código de barra"
                    {...register("bar_code")}
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
                    step="1"
                    className="form__field"
                    defaultValue={dataSelect.internal_code}
                    type="text"
                    placeholder="Código de interno"
                    {...register("internal_code")}
                  />
                  <label className="form__label">Código interno</label>
                </InputText>
                <ContainerBtnGenerate>
                  <BtnSpan title={"Generar"} func={generateCodeFunction} />
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
                <Switch1 state={stateInventory} setState={setStateInventory} />
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
                      data={branches}
                      top={"4rem"}
                      setState={toggleBranchesList}
                      func={selectBranch}
                      state={stateBranchesList}
                    />
                  </ContainerSelector>
                  <article>
                    <InputText icono={<v.arrowRightIcon />}>
                      <input
                        className="form__field"
                        defaultValue={dataSelect.stock}
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
                        className="form__field"
                        defaultValue={dataSelect.min_stock}
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
