/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { v } from "../../../styles/variables.jsx";
import {
  InputText,
  Btn1,
  ConverterCapitalize,
  useCompanyStore,
  useSuppliersClientsStore,
  useThemeStore,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

export function RegisterSuppliersClients({
  onClose,
  dataSelect,
  action,
  setIsExploding,
}) {
  const {
    type,
    insertSuppliersClients,
    editSuppliersClients,
    dataSuppliersClients,
  } = useSuppliersClientsStore();
  const { companyData } = useCompanyStore();
  const theme = useThemeStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insert,
    mutationKey: ["Insertar Suppliers Clients mutation"],
    onError: (err) => {
      // ESTO DEBE MOSTRARSE SI HAY DUPLICADOS
      console.log("Error capturado por la mutación:", err.message);
      toast.error("Error al guardar: " + err.message);
    },
    onSuccess: () => {
      console.log("¡Éxito total!");
      closeForm();
    },
  });

  const handleSubmitForm = (data) => {
    doInsertar(data);
  };

  const closeForm = () => {
    onClose();
    setIsExploding(true);
  };

  async function insert(data) {
    // 1. Verificación de seguridad: si no hay ID de compañía, detenemos todo
    if (!companyData?.id) {
      toast.error("No se detectó el ID de la empresa. Reintente.");
      return;
    }

    // 2. Construcción exacta según los argumentos de tu función PL/pgSQL
    const p = {
      _name: ConverterCapitalize(data.name),
      _id_company: Number(companyData.id),
      _address: data.address || "-",
      _phone: data.phone || "-",
      _email: data.email || "-",
      _national_identifier: data.national_identifier || "-",
      _tax_identifier: data.tax_identifier || "-",
      _type: type, // ahora SIEMPRE "client" o "supplier"
    };

    console.log("Datos que se envían al RPC:", p);

    console.log("Clientes/Proveedores", dataSuppliersClients);

    if (action === "Edit") {
      // Aquí debes enviarle el ID de la fila a editar
      const pEdit = { ...p, _id: dataSelect.id };
      await editSuppliersClients(pEdit);
    } else {
      // Inserción limpia
      await insertSuppliersClients(p);
    }
  }

  return (
    <Container>
      {isPending ? (
        <LoadingState>
          <Icon icon="line-md:uploading-loop" width="40" />
          <span>Procesando {type}...</span>
        </LoadingState>
      ) : (
        <div className="sub-contenedor">
          <div className="headers">
            <section>
              <h1>
                {action === "Edit"
                  ? `Editar ${type === "client" ? "Cliente" : "Proveedor"}`
                  : `Nuevo ${type === "client" ? "Cliente" : "Proveedor"}`}
              </h1>
            </section>
            <section>
              <span className="close-btn" onClick={onClose}>
                <Icon icon="mingcute:close-line" />
              </span>
            </section>
          </div>

          <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="main-layout">
              {/* LADO IZQUIERDO: Imagen y Color */}
              <aside className="profile-section">
                <PictureContainer>
                  <Icon icon="solar:user-circle-bold" className="empty-icon" />
                  <button
                    type="button"
                    className="upload-btn"
                    // onClick={openImages}
                  >
                    <Icon icon="solar:camera-add-bold" />
                  </button>
                  <input
                    type="file"
                    // ref={ref}
                    // onChange={prepareImage}
                    accept="image/*"
                  />
                </PictureContainer>

                <div className="color-section">
                  <p>
                    <v.paletteColors /> Color de etiqueta
                  </p>
                </div>
              </aside>

              {/* LADO DERECHO: Campos de Texto */}
              <div className="fields-section">
                <div className="grid-fields">
                  {/* Nombre Completo */}
                  <div className="full-width">
                    <InputText icono={<v.nameIcon />}>
                      <input
                        className="form__field"
                        defaultValue={dataSelect.name}
                        type="text"
                        placeholder=" "
                        {...register("name", { required: true })}
                      />
                      <label className="form__label">
                        Nombre / Razón Social
                      </label>
                    </InputText>
                    {errors.name && <ErrorText>Campo requerido</ErrorText>}
                  </div>

                  {/* Identificadores */}
                  <InputText icono={<v.internalCodeIcon />}>
                    <input
                      className="form__field"
                      defaultValue={dataSelect.national_identifier}
                      type="text"
                      placeholder=" "
                      {...register("national_identifier")}
                    />
                    <label className="form__label">DNI / Cédula</label>
                  </InputText>

                  <InputText icono={<v.barcodeIcon />}>
                    <input
                      className="form__field"
                      defaultValue={dataSelect.tax_identifier}
                      type="text"
                      placeholder=" "
                      {...register("tax_identifier")}
                    />
                    <label className="form__label">CUIT / RUT / TAX</label>
                  </InputText>

                  {/* Contacto */}
                  <InputText icono={<v.emailIcon />}>
                    <input
                      className="form__field"
                      defaultValue={dataSelect.email}
                      type="email"
                      placeholder=" "
                      {...register("email")}
                    />
                    <label className="form__label">Email</label>
                  </InputText>

                  <InputText icono={<Icon icon="solar:phone-bold" />}>
                    <input
                      className="form__field"
                      defaultValue={dataSelect.phone}
                      type="tel"
                      placeholder=" "
                      {...register("phone")}
                    />
                    <label className="form__label">Teléfono</label>
                  </InputText>

                  {/* Dirección */}
                  <div className="full-width">
                    <InputText icono={<Icon icon="solar:map-point-bold" />}>
                      <input
                        className="form__field"
                        defaultValue={dataSelect.address}
                        type="text"
                        placeholder=" "
                        {...register("address")}
                      />
                      <label className="form__label">Dirección Completa</label>
                    </InputText>
                  </div>
                </div>

                <div className="actions">
                  <Btn1
                    type="submit"
                    icon={<v.saveIcon />}
                    title="Guardar Registro"
                    bgColor={theme.primary}
                    color="#fff"
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </Container>
  );
}

// --- STYLED COMPONENTS ---

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;

  .sub-contenedor {
    width: 850px;
    max-width: 100%;
    border-radius: 24px;
    background: ${({ theme }) => theme.bgTotal};
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
    padding: 30px;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      h1 {
        font-size: 22px;
        font-weight: 700;
        color: ${({ theme }) => theme.text};
      }
      .close-btn {
        cursor: pointer;
        font-size: 24px;
        color: ${({ theme }) => theme.colorSubtitle};
        &:hover {
          color: #ef4444;
        }
      }
    }

    .main-layout {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 40px;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .profile-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 25px;
      .color-section {
        width: 100%;
        p {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${({ theme }) => theme.text};
        }
      }
    }

    .fields-section {
      .grid-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        .full-width {
          grid-column: span 2;
        }
        @media (max-width: 500px) {
          .full-width,
          & {
            grid-template-columns: 1fr;
            grid-column: span 1;
          }
        }
      }
      .actions {
        margin-top: 35px;
      }
    }
  }
`;

const PictureContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid ${(props) => props.$color};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bg2};

  .ContentImage {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .empty-icon {
    font-size: 80px;
    color: ${({ theme }) => theme.colorScroll};
  }

  .upload-btn {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background: ${({ theme }) => theme.primary};
    color: white;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  input {
    display: none;
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  gap: 15px;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 600;
`;
