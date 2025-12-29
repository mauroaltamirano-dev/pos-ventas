import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { InputText2 } from "../../organism/forms/InputText2";
import { Btn1 } from "../../molecules/Btn1";
import { useForm } from "react-hook-form";
import { useCompanyStore } from "../../../store/CompanyStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const ConfigsBasic = () => {
  const [file, setFile] = useState([]);
  const [fileurl, setFileurl] = useState("-");

  const { companyData, editCompany, editMoney } = useCompanyStore();

  const ref = useRef(null);
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  function openImage() {
    ref.current.click();
  }
  function handleImageChange(e) {
    let filelocal = e.target.files;
    let fileReaderlocal = new FileReader();
    fileReaderlocal.readAsDataURL(filelocal[0]);
    const imgType = e.target.files[0];
    setFile(imgType);
    if (fileReaderlocal && filelocal && filelocal.length) {
      fileReaderlocal.onload = function load() {
        setFileurl(fileReaderlocal.result);
      };
    }
  }

  const { mutate: doEditCompany, isPending } = useMutation({
    mutationKey: "Edit Company",
    mutationFn: editCompanyMutation,
    onError: (e) => {
      toast.error("Ocurrió un error", e.message);
    },
    onSuccess: () => {
      toast.success("Empresa editada exitosamente");
      queryClient.invalidateQueries("Show Company");
    },
  });

  const callEditFunction = (data) => {
    doEditCompany(data);
  };

  async function editCompanyMutation(data) {
    const p = {
      id: companyData?.id,
      name: data.name,
      address_tax: data.address_tax,
      tax: data.tax,
      value_tax: parseFloat(data.value_tax),
    };

    await editCompany(p, companyData?.logo, file);
  }

  useEffect(() => {
    if (companyData) {
      reset({
        name: companyData?.name,
        address_tax: companyData?.address_tax,
        tax: companyData?.tax,
        value_tax: companyData?.value_tax,
      });
    }
  }, [companyData, reset]);

  return (
    <Container>
      {isPending ? (
        <span>Guardando...</span>
      ) : (
        <>
          <HeaderSection>
            <Title>Configuración General</Title>
            <Subtitle>
              Gestiona la identidad y datos fiscales de tu empresa
            </Subtitle>
          </HeaderSection>

          {/* Sección Avatar rediseñada */}
          <AvatarCard>
            <div className="avatar-wrapper">
              {fileurl != "-" ? (
                <AvatarImage src={fileurl} alt="Avatar" />
              ) : companyData?.logo != "-" ? (
                <AvatarImage src={companyData?.logo} alt="Avatar" />
              ) : (
                <AvatarImage
                  src="https://i.ibb.co/JjqNqnz/cerdosolo.png"
                  alt="Avatar"
                />
              )}

              <EditButton onClick={openImage}>
                <Icon icon="solar:camera-add-bold" width="18" />
              </EditButton>

              <input
                accept="image/jpeg, image/png"
                type="file"
                ref={ref}
                onChange={(e) => handleImageChange(e)}
              />
            </div>

            <div className="info-wrapper">
              <span className="nombre">{companyData?.name}</span>
              <span className="rol">Administrador</span>
            </div>
          </AvatarCard>

          <form onSubmit={handleSubmit(callEditFunction)}>
            <FormGrid>
              <div className="form-group">
                <Label>Nombre de la Empresa</Label>
                <InputText2>
                  <input
                    className="form__field"
                    placeholder="Ej: Mauro Store S.A."
                    type="text"
                    defaultValue={companyData?.name}
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <ErrorMsg>Campo requerido</ErrorMsg>
                  )}
                </InputText2>
              </div>

              <div className="form-group">
                <Label>Dirección Fiscal</Label>
                <InputText2>
                  <input
                    defaultValue={companyData?.address_tax}
                    className="form__field"
                    placeholder="Calle Falsa 123"
                    type="text"
                    {...register("address_tax", { required: true })}
                  />
                  {errors.address_tax?.type === "required" && (
                    <ErrorMsg>Campo requerido</ErrorMsg>
                  )}
                </InputText2>
              </div>

              <div className="form-group">
                <Label>Identificación Fiscal (Tax ID)</Label>
                <InputText2>
                  <input
                    defaultValue={companyData?.tax}
                    className="form__field"
                    placeholder="00-0000000-0"
                    type="text"
                    {...register("tax", { required: true })}
                  />
                  {errors.tax?.type === "required" && (
                    <ErrorMsg>Campo requerido</ErrorMsg>
                  )}
                </InputText2>
              </div>

              <div className="form-group">
                <Label>Valor Impuesto (%)</Label>
                <InputText2>
                  <input
                    step="0.01"
                    defaultValue={companyData?.value_tax}
                    className="form__field"
                    placeholder="21"
                    type="number"
                    {...register("value_tax", { required: true })}
                  />
                  {errors.value_tax?.type === "required" && (
                    <ErrorMsg>Campo requerido</ErrorMsg>
                  )}
                </InputText2>
              </div>
            </FormGrid>

            <ActionSection>
              <Btn1
                bgColor="#5D3FD3"
                color="#fff"
                title="GUARDAR CAMBIOS"
                width="100%"
                icon={<Icon icon="mingcute:save-line" width="20" />}
                type="submit"
              />
            </ActionSection>
          </form>

          <WarningSection>
            <div className="icon-box">
              <Icon icon="solar:info-circle-bold" />
            </div>
            <span>
              Nota: Los cambios en el logotipo pueden tardar hasta 10 segundos
              en reflejarse en todo el sistema.
            </span>
          </WarningSection>
        </>
      )}
    </Container>
  );
};

// --- STYLED COMPONENTS ---

const Container = styled.div`
  padding: 30px;
  background-color: ${(props) => props.theme.bgAlpha}; // Usa el theme
  border-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => props.theme.border};
`;

const HeaderSection = styled.div`
  margin-bottom: 30px;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.text || "#1a1a1a"};
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  font-weight: 400;
`;

// Tarjeta de perfil moderna con gradiente sutil
const AvatarCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(
    135deg,
    rgba(93, 63, 211, 0.05) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border: 1px solid rgba(93, 63, 211, 0.1);
  border-radius: 12px;
  margin-bottom: 30px;
  position: relative;

  .avatar-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
  }

  .info-wrapper {
    display: flex;
    flex-direction: column;

    .nombre {
      font-weight: 700;
      font-size: 18px;
      color: ${(props) => props.theme.text || "#1a1a1a"};
    }
    .rol {
      font-size: 13px;
      color: #5d3fd3;
      font-weight: 600;
      background: rgba(93, 63, 211, 0.1);
      padding: 2px 8px;
      border-radius: 4px;
      width: fit-content;
      margin-top: 4px;
    }
  }

  input {
    display: none;
  }
`;

const AvatarImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%; /* Círculo perfecto */
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const EditButton = styled.div`
  background-color: #5d3fd3;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  border: 2px solid #fff;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

// Grid para el formulario (2 columnas en desktop, 1 en mobile)
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form__field {
    color: ${(props) => props.theme.textInput};
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.text || "#333"};
`;

const ActionSection = styled.div`
  margin-top: 30px;
`;

const ErrorMsg = styled.p`
  color: #ef4444 !important;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
`;

const WarningSection = styled.section`
  background-color: rgba(93, 63, 211, 0.05); /* Violeta muy suave */
  border-left: 4px solid #5d3fd3;
  border-radius: 6px;
  padding: 15px;
  margin-top: 25px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #475569;
  font-size: 13px;
  line-height: 1.5;

  .icon-box {
    color: #5d3fd3;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
`;
