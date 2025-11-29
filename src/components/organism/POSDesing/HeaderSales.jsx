import styled from "styled-components";
import {
  Btn1,
  InputText2,
  ListSelect,
  Reloj,
  useCompanyStore,
  useProductsStore,
  useUserStore,
} from "../../../index.js";
import { v } from "../../../styles/variables.jsx";
import { Device } from "../../../styles/breakpoints.jsx";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useSalesStore } from "../../../store/SalesStore.jsx";

export function HeaderSales() {
  const [stateListProducts, setStateListProducts] = useState(false);
  const [stateScanner, setStateScanner] = useState(true);
  const [stateKeyboard, setStateKeyboard] = useState(false);

  const { insertSales } = useSalesStore();
  const { setSearch, productsData, selectProducts } = useProductsStore();
  const { users } = useUserStore();
  const { companyData } = useCompanyStore();
  const inputRef = useRef(null);

  function focusClick() {
    inputRef.current.focus();

    inputRef.current.value === ""
      ? setStateListProducts(false)
      : setStateListProducts(true);
  }

  function searchProducts(e) {
    setSearch(e.target.value);
    let text = e.target.value;
    if (text.trim() === " " || stateScanner) {
      setStateListProducts(false);
    } else {
      setStateListProducts(true);
    }
  }

  async function insertingSale() {
    selectProducts();
    const pSale = {
      id_user: users.id,
      id_company: companyData.id,
    };
    await insertSales(pSale);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Header>
      <section className="contentMain">
        <ContentUser>
          <div className="contentImg">
            <img src="https://pbs.twimg.com/profile_images/1973796007470129152/Q26Fa_eQ_400x400.jpg" />
          </div>
          <div className="info">
            <span className="user">Tuki</span>
            <span className="role">Admin</span>
          </div>
        </ContentUser>
        {/* <article className="contentLogo">
          <img src={v.logo} />
          <span>Mauro Altamirano - Dev</span>
        </article> */}
        <article className="contentDate">
          <Reloj />
        </article>
      </section>

      <section className="contentSearch">
        <article className="search-box">
          <InputText2>
            <input
              className="form__field"
              type="text"
              placeholder="Buscar producto..."
              onChange={searchProducts}
              ref={inputRef}
            />
            <ListSelect
              state={stateListProducts}
              data={productsData}
              setState={() => setStateListProducts(!stateListProducts)}
              func={insertingSale}
            />
          </InputText2>
        </article>
        <article className="actions">
          <Btn1
            func={() => {
              setStateScanner(true);
              setStateKeyboard(false);
              setStateListProducts(false);
              focusClick();
            }}
            title={"Lectora"}
            icon={<Icon icon="material-symbols-light:barcode-scanner" />}
            border={"2px"}
            bgColor={stateScanner ? "#3e1cb8" : ({ theme }) => theme.bgTotal}
            color={stateScanner ? "#fff" : ({ theme }) => theme.text}
          />
          <Btn1
            func={() => {
              setStateScanner(false);
              setStateKeyboard(true);
              focusClick();
            }}
            title={"Teclado"}
            icon={
              <Icon
                icon="material-symbols:keyboard-hide"
                width="24"
                height="24"
              />
            }
            border={"2px"}
            bgColor={stateKeyboard ? "#3e1cb8" : ({ theme }) => theme.bgTotal}
            color={stateKeyboard ? "#fff" : ({ theme }) => theme.text}
          />
        </article>
      </section>
    </Header>
  );
}

const Header = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: ${({ theme }) => theme.bg || "#fff"};
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  @media ${Device.desktop} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    height: 80px;
  }

  .contentMain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media ${Device.desktop} {
      width: auto;
      gap: 40px;
    }

    .contentLogo {
      display: none;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      color: ${({ theme }) => theme.text || "#333"};

      img {
        width: 30px;
        object-fit: contain;
      }

      @media ${Device.desktop} {
        display: flex;
      }
    }

    .contentDate {
      display: block;
      @media ${Device.desktop} {
        display: block;
      }
    }
  }

  .contentSearch {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    @media ${Device.desktop} {
      flex-direction: row;
      width: auto;
      align-items: center;
    }

    .search-box {
      width: 100%;
      @media ${Device.desktop} {
        width: 300px;
      }
    }

    .actions {
      display: flex;
      gap: 10px;
      justify-content: space-between;

      @media ${Device.desktop} {
        justify-content: flex-start;
      }

      button {
        flex: 1;
        @media ${Device.desktop} {
          flex: initial;
        }
      }
    }
  }
`;

const ContentUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .contentImg {
    display: flex;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid ${({ theme }) => theme.primary || "#33b81c"};
    padding: 2px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;

    .user {
      font-weight: 700;
      font-size: 16px;
      color: ${({ theme }) => theme.text || "#333"};
    }
    .role {
      font-size: 12px;
      color: #888;
      font-weight: 500;
    }
  }
`;
