/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  useCategoriesStore,
  Icono,
  ConverterCapitalize,
  useCompanyStore,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import { useMutation } from "@tanstack/react-query";

export function RegisterCategories({
  onClose,
  dataSelect,
  action,
  setIsExploding,
}) {
  const { insertCategories, editCategory } = useCategoriesStore();
  const { dataCompany } = useCompanyStore();
  const [currentColor, setColor] = useState("#F44336");
  const [file, setFile] = useState([]);
  const ref = useRef(null);
  const [fileUrl, setFileUrl] = useState();
  function elegirColor(color) {
    setColor(color.hex);
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insert,
    mutationKey: "insertar categorías",
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
    if (action === "Editar") {
      const p = {
        _name: ConverterCapitalize(data.description),
        _id_company: dataCompany.id,
        _color: currentColor,
        _id: dataSelect.id,
      };
      await editCategory(p, dataSelect.icono, file);
    } else {
      const p = {
        _name: ConverterCapitalize(data.description),
        _color: currentColor,
        _icon: "-",
        _id_company: dataCompany.id,
      };

      await insertCategories(p, file);
    }
  }
  function openImages() {
    ref.current.click();
  }
  function prepareImage(e) {
    let fileLocal = e.target.files;
    let fileReaderLocal = new FileReader();
    fileReaderLocal.readAsDataURL(fileLocal[0]);
    const typeImg = e.target.files[0];
    setFile(typeImg);
    if (fileReaderLocal && fileLocal && fileLocal.length) {
      fileReaderLocal.onload = function load() {
        setFileUrl(fileReaderLocal.result);
      };
    }
  }
  useEffect(() => {
    if (action === "Editar") {
      setColor(dataSelect.color);
      setFileUrl(dataSelect.icono);
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
                {action == "Editar"
                  ? "Editar categoría"
                  : "Registrar nueva categoría"}
              </h1>
            </section>

            <section>
              <span onClick={onClose}>x</span>
            </section>
          </div>
          <PictureContainer>
            {fileUrl != "-" ? (
              <div className="ContentImage">
                <img src={fileUrl}></img>
              </div>
            ) : (
              <Icono>{<v.emptyImgIcon />}</Icono>
            )}

            <Btn1
              func={openImages}
              titulo="+imagen(opcional)"
              color="#5f5f5f"
              bgcolor="rgb(183, 183, 182)"
              icono={<v.supabaseIcon />}
            />
            <input
              type="file"
              ref={ref}
              onChange={(e) => prepareImage(e)}
            ></input>
          </PictureContainer>
          <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <section className="form-subcontainer">
              <article>
                <InputText icono={<v.arrowRightIcon />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.nombre}
                    type="text"
                    placeholder="categoría"
                    {...register("description", {
                      required: true,
                    })}
                  />
                  <label className="form__label">categoría</label>
                  {errors.description?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>

              <article className="colorContainer">
                <ContentTitle>
                  {<v.paletteColors />}
                  <span>Color</span>
                </ContentTitle>
                <div className="colorPickerContent">
                  <CirclePicker onChange={elegirColor} color={currentColor} />
                </div>
              </article>

              <Btn1 icono={<v.saveIcon />} titulo="Guardar" bgcolor="#F9D70B" />
            </section>
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
    width: 500px;
    max-width: 85%;
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
      .form-subcontainer {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
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
