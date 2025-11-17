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
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Device } from "../../../styles/breakpoints.jsx";
import { useState } from "react";

export function RegisterProducts({
  onClose,
  dataSelect,
  action,
  setIsExploding,
}) {
  const { branchesItemSelect, branches, selectBranch } = useBranchesStore();
  const { insertProducts, editProducts } = useProductsStore();
  const { companyData } = useCompanyStore();
  const { dataCategories, categoriesItemSelect, selectCategory } =
    useCategoriesStore();

  const [stateInventory, setStateInventory] = useState(false);
  const [stateBranchesList, setStateBranchesList] = useState(false);
  const [stateListCategories, setStateListCategories] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
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
    if (action === "Edit") {
      const p = {
        _name: ConverterCapitalize(data.name),
        _idcompany: companyData.id,
        _id: dataSelect.id,
      };
      console.log("editar", p);
      await editProducts(p, dataSelect.icon);
    } else {
      const p = {
        _name: ConverterCapitalize(data.name),
        _id_company: companyData.id,
      };

      await insertProducts(p);
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
                    placeholder="producto"
                    {...register("name", {
                      required: true,
                    })}
                  />
                  <label className="form__label">nombre</label>
                  {errors.description?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    step="0.01"
                    className="form__field"
                    defaultValue={dataSelect.sale_price}
                    type="number"
                    placeholder="precio de venta"
                    {...register("sale_price", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Precio de venta</label>
                  {errors.description?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    step="0.01"
                    className="form__field"
                    defaultValue={dataSelect.buy_price}
                    type="number"
                    placeholder="precio de compra"
                    {...register("buy_price", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Precio de compra</label>
                  {errors.description?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    step="1"
                    className="form__field"
                    defaultValue={dataSelect.bar_code}
                    type="number"
                    placeholder="código de barra"
                    {...register("bar_code", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Código de Barras</label>
                  {errors.description?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    step="1"
                    className="form__field"
                    defaultValue={dataSelect.internal_code}
                    type="number"
                    placeholder="código de interno"
                    {...register("internal_code", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Código Interno</label>
                  {errors.description?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
            </section>

            <section className="section2">
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
                <Switch1
                  state={stateInventory}
                  setState={() => setStateInventory(!stateInventory)}
                />
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
                        placeholder="stock"
                        {...register("stock", {
                          required: true,
                        })}
                      />
                      <label className="form__label">stock</label>
                      {errors.description?.type === "required" && (
                        <p>Campo requerido</p>
                      )}
                    </InputText>
                  </article>
                  <article>
                    <InputText icono={<v.arrowRightIcon />}>
                      <input
                        className="form__field"
                        defaultValue={dataSelect.min_stock}
                        step="0.01"
                        type="number"
                        placeholder="stock mínimo"
                        {...register("min_stock", {
                          required: true,
                        })}
                      />
                      <label className="form__label">stock mínimo</label>
                      {errors.description?.type === "required" && (
                        <p>Campo requerido</p>
                      )}
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

      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
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
