/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { v } from "../../../styles/variables.jsx";
import {
  Btn1,
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
  InputText2,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Device } from "../../../styles/breakpoints.jsx";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

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
    <ModalOverlay>
      <ModalContainer>
        {isPending && <LoadingOverlay>Guardando...</LoadingOverlay>}

        <Header>
          <div className="title-group">
            <Icon icon="solar:box-bold-duotone" width="24" className="icon" />
            <h1>{action === "Edit" ? "Editar Producto" : "Nuevo Producto"}</h1>
          </div>
          <CloseButton
            onClick={() => {
              refetchs();
              onClose();
            }}
          >
            <Icon icon="mingcute:close-line" width="24" />
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <ScrollableContent>
            {/* Sección Información General */}
            <SectionTitle>Datos Generales</SectionTitle>
            <FormGrid>
              <article className="full-width">
                <Label>Nombre del Producto</Label>
                <InputText2>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.name}
                    type="text"
                    placeholder="Ej: Gaseosa Coca Cola 3L"
                    {...register("name", { required: true })}
                  />
                </InputText2>
                {errors.name && <ErrorMsg>Campo requerido</ErrorMsg>}
              </article>

              <article>
                <Label>Precio Venta</Label>
                <InputText2>
                  <input
                    step="0.01"
                    className="form__field"
                    defaultValue={dataSelect.sale_price}
                    type="number"
                    placeholder="0.00"
                    {...register("sale_price")}
                  />
                </InputText2>
              </article>

              <article>
                <Label>Precio Compra</Label>
                <InputText2>
                  <input
                    step="0.01"
                    className="form__field"
                    defaultValue={dataSelect.buy_price}
                    type="number"
                    placeholder="0.00"
                    {...register("buy_price")}
                  />
                </InputText2>
              </article>
            </FormGrid>

            {/* Sección Identificadores */}
            <SectionTitle>Identificadores</SectionTitle>
            <FormGrid>
              <article>
                <Label>Código de Barras</Label>
                <div className="input-with-action">
                  <InputText2>
                    <input
                      className="form__field"
                      value={randomBarCode || ""}
                      type="text"
                      placeholder="Escanee o genere"
                      onChange={handleRandomBarcode}
                    />
                  </InputText2>
                  <IconButton
                    type="button"
                    onClick={generateCodeBarcode}
                    title="Generar"
                  >
                    <Icon icon="solar:refresh-bold" />
                  </IconButton>
                </div>
              </article>

              <article>
                <Label>Código Interno</Label>
                <div className="input-with-action">
                  <InputText2>
                    <input
                      className="form__field"
                      value={randomInternalCode || ""}
                      type="text"
                      placeholder="Automático"
                      onChange={handleRandomInternalCode}
                    />
                  </InputText2>
                  <IconButton
                    type="button"
                    onClick={generateInternalCode}
                    title="Generar"
                  >
                    <Icon icon="solar:refresh-bold" />
                  </IconButton>
                </div>
              </article>
            </FormGrid>

            {/* Sección Clasificación */}
            <SectionTitle>Clasificación y Stock</SectionTitle>
            <ControlGroup>
              <div className="control-item">
                <Label>Tipo de Venta</Label>
                <div className="radio-group">
                  <div
                    className="radio-option"
                    onClick={() => toggleChecked(1)}
                  >
                    <Checkbox1
                      isChecked={isChecked1}
                      onChange={() => toggleChecked(1)}
                    />
                    <span>Por Unidad</span>
                  </div>
                  <div
                    className="radio-option"
                    onClick={() => toggleChecked(2)}
                  >
                    <Checkbox1
                      isChecked={isChecked2}
                      onChange={() => toggleChecked(2)}
                    />
                    <span>A Granel / Cantidad</span>
                  </div>
                </div>
              </div>

              <div className="control-item">
                <Label>Categoría</Label>
                <DropdownContainer>
                  <Selector
                    color={v.primary}
                    text1={<Icon icon="solar:tag-horizontal-bold-duotone" />}
                    text2={categoriesItemSelect?.name || "Seleccionar"}
                    func={toggleCategoriesList}
                    state={stateListCategories}
                  />
                  <ListSelect
                    data={dataCategories}
                    top="100%"
                    setState={toggleCategoriesList}
                    func={selectCategory}
                    state={stateListCategories}
                  />
                </DropdownContainer>
              </div>
            </ControlGroup>

            <div style={{ marginTop: "20px" }}>
              <div className="switch-wrapper">
                <Label>Controlar Inventario</Label>
                <Switch1 state={stateInventory} setState={checkUseInventory} />
              </div>

              {stateInventory && (
                <StockCard>
                  <div className="branch-select">
                    <Label>Sucursal Asignada</Label>
                    <DropdownContainer>
                      <Selector
                        color="#E75A14"
                        text1={<Icon icon="solar:shop-bold-duotone" />}
                        text2={branchesItemSelect?.name || "Seleccionar"}
                        func={toggleBranchesList}
                        state={stateBranchesList}
                      />
                      <ListSelect
                        refetch={refetch}
                        data={branches}
                        top="100%"
                        setState={toggleBranchesList}
                        func={selectBranch}
                        state={stateBranchesList}
                      />
                    </DropdownContainer>
                  </div>

                  {stateEnabledStock && (
                    <div className="warning-msg">
                      <Icon icon="solar:info-circle-bold" />
                      <span>
                        El stock inicial ya está establecido. Use el KARDEX para
                        ajustes.
                      </span>
                    </div>
                  )}

                  <FormGrid>
                    <article>
                      <Label>Stock Inicial</Label>
                      <InputText2>
                        <input
                          disabled={stateEnabledStock}
                          className="form__field"
                          defaultValue={dataStore?.stock}
                          type="number"
                          step="0.01"
                          placeholder="0"
                          {...register("stock")}
                        />
                      </InputText2>
                    </article>
                    <article>
                      <Label>Stock Mínimo (Alerta)</Label>
                      <InputText2>
                        <input
                          disabled={stateEnabledStock}
                          className="form__field"
                          defaultValue={dataStore?.min_stock}
                          type="number"
                          step="0.01"
                          placeholder="0"
                          {...register("min_stock")}
                        />
                      </InputText2>
                    </article>
                  </FormGrid>
                </StockCard>
              )}
            </div>
          </ScrollableContent>

          <Footer>
            <Btn1
              type="submit"
              icon={<Icon icon="solar:diskette-bold" width="20" />}
              title="GUARDAR PRODUCTO"
              bgColor={v.mainColor}
              color="#fff"
              width="100%"
            />
          </Footer>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
}

// --- STYLED COMPONENTS ---

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); // Oscuro y transparente
  backdrop-filter: blur(5px); // Blur para efecto moderno
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.bgTotal};
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const Header = styled.header`
  padding: 20px 25px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bgCards};

  .title-group {
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      color: ${({ theme }) => theme.primary};
    }

    h1 {
      font-size: 18px;
      font-weight: 700;
      color: ${({ theme }) => theme.text};
      margin: 0;
    }
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colorSubtitle};
  transition: color 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  padding: 25px;
  overflow-y: auto;
  flex: 1;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colorScroll};
    border-radius: 4px;
  }
`;

const Footer = styled.footer`
  padding: 20px 25px;
  background-color: ${({ theme }) => theme.bgCards};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 25px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: 1 / -1;
  }

  .input-with-action {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colorSubtitleCard};
  margin-bottom: 8px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 15px;
  border-bottom: 1px dashed ${({ theme }) => theme.border};
  padding-bottom: 5px;
`;

const IconButton = styled.button`
  background: ${({ theme }) => theme.bg4};
  border: none;
  border-radius: 12px;
  width: 45px;
  height: 45px; // Altura aproximada del InputText2
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ErrorMsg = styled.span`
  color: ${({ theme }) => theme.delete || "red"};
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

const ControlGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .radio-option {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 14px;
      color: ${({ theme }) => theme.text};
    }
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  z-index: 50; // Para que el dropdown salga por encima
`;

const StockCard = styled.div`
  margin-top: 15px;
  padding: 15px;
  background-color: ${({ theme }) => theme.bg6}; // Tono suave
  border: 1px solid ${({ theme }) => theme.primary}40;
  border-radius: 12px;

  .branch-select {
    margin-bottom: 15px;
  }

  .warning-msg {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #fff3cd;
    color: #856404;
    padding: 10px;
    border-radius: 8px;
    font-size: 13px;
    margin-bottom: 15px;
  }
`;

const switchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
