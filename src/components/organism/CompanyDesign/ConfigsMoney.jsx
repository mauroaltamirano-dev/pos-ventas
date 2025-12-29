import styled, { useTheme } from "styled-components";
import { getAllInfoByISO } from "iso-country-currency";
import iso from "iso-country-currency";
import { FlagIcon } from "react-flag-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCompanyStore, useMoneyStore, InputText2 } from "../../../index.js";
import { useEffect, useState } from "react";

export const ConfigsMoney = () => {
  const theme = useTheme();
  const { companyData, editMoney } = useCompanyStore();
  const { search, setSearch, selectedCountry, setSelectedCountry } =
    useMoneyStore();
  const queryClient = useQueryClient();
  const isocodigos = iso.getAllISOCodes();

  // 1. Inicialización del estado local para la búsqueda y el país seleccionado
  // Se usa el estado global 'selectedCountry' si ya existe, sino se inicializa con companyData.
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Si la compañía data existe y es la primera carga (y selectedCountry está null/vacío),
    // inicializamos el estado del store con los datos actuales de la compañía.
    if (companyData && initialLoad) {
      if (!selectedCountry?.iso || selectedCountry.iso === companyData.iso) {
        setSelectedCountry({
          iso: companyData?.iso || "US", // Default a US si no hay datos
          countryName: companyData?.country || "United States",
          symbol: companyData?.symbolmoney || "$",
          currency: companyData?.currency || "USD",
        });
        setSearch(companyData?.country || "United States");
      }
      setInitialLoad(false);
    }
  }, [companyData, initialLoad, setSelectedCountry, setSearch]);

  // Obtiene la información inicial para el país de la compañía, si existe.
  const countryInfo = companyData?.iso
    ? getAllInfoByISO(companyData.iso)
    : null;

  // Handlers para la búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSelectCountry = (country) => {
    const info = getAllInfoByISO(country.iso);
    const newSelection = {
      iso: country.iso,
      countryName: country.countryName,
      symbol: info.symbol,
      currency: info.currency,
    };

    // Actualiza el store y limpia la búsqueda
    setSelectedCountry(newSelection);
    setSearch(country.countryName);

    // Dispara la mutación inmediatamente
    mutate.mutate(newSelection);
  };

  // Filtro de países para el dropdown
  const filteredCountries = isocodigos
    .filter((country) => country.countryName.toLowerCase().includes(search))
    .slice(0, 10); // Limitar a 10 resultados

  // Función de mutación
  const editMoneyCompany = async (newSelection) => {
    const dataToSend = newSelection || selectedCountry;

    const p = {
      id: companyData?.id,
      symbolmoney: dataToSend.symbol,
      iso: dataToSend.iso,
      country: dataToSend.countryName,
      currency: dataToSend.currency,
    };
    await editMoney(p);
  };

  const mutate = useMutation({
    mutationKey: "Edit Money Company",
    mutationFn: editMoneyCompany,
    onSuccess: () => {
      queryClient.invalidateQueries("Show Company");
      toast.success(
        `Moneda actualizada a ${selectedCountry?.currency} (${selectedCountry?.countryName}).`
      );
    },
    onError: (error) => {
      toast.error("Error al guardar la moneda: " + error.message);
    },
  });

  // Usamos el estado seleccionado o los datos de la compañía para mostrar la tarjeta
  const displayCountry = selectedCountry || {
    iso: companyData?.iso,
    countryName: companyData?.country,
    symbol: companyData?.symbolmoney,
    currency: companyData?.currency,
  };

  return (
    <Container>
      <HeaderSection>
        <Title>Moneda y Localización</Title>
        <Subtitle>
          Define la moneda predeterminada para todas las transacciones.
        </Subtitle>
      </HeaderSection>

      <CurrentMoneyCard>
        <div className="flag-info">
          <FlagIcon code={displayCountry.iso || "US"} size={72} />
          <div className="details">
            <span className="country-name">
              {displayCountry.countryName || "País no definido"}
            </span>
            <span className="currency-symbol">
              {displayCountry.symbol}{" "}
              <span className="currency-code">{displayCountry.currency}</span>
            </span>
          </div>
        </div>
        <Icon icon="solar:global-outline" width={48} className="globe-icon" />
      </CurrentMoneyCard>

      <SearchSection>
        <InputText2>
          <input
            className="form__field"
            type="search"
            placeholder="Buscar país por nombre (ej: Argentina)"
            value={search}
            onChange={handleSearchChange}
          />
        </InputText2>

        {search && filteredCountries.length > 0 && (
          <Dropdown>
            <DropdownList>
              {filteredCountries.map((country, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleSelectCountry(country)}
                >
                  <FlagIcon code={country.iso} size={20} />
                  <span>{country.countryName}</span>
                </DropdownItem>
              ))}
            </DropdownList>
          </Dropdown>
        )}
      </SearchSection>

      {mutate.isPending && (
        <PendingMessage>
          <Icon icon="line-md:loading-loop" width={20} />
          <span>Aplicando cambios...</span>
        </PendingMessage>
      )}

      <WarningSection theme={theme}>
        <Icon icon="solar:info-circle-bold" />
        <span>
          El cambio de moneda se aplica inmediatamente al seleccionarla.
        </span>
      </WarningSection>
    </Container>
  );
};

// --- STYLED COMPONENTS ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.bgCards};
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.border};
`;

const HeaderSection = styled.div`
  text-align: left;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colorSubtitle};
  margin: 0;
`;

const CurrentMoneyCard = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.primary}AA 100%
  );
  color: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);

  .flag-info {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .details {
    display: flex;
    flex-direction: column;
  }

  .country-name {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
    margin-bottom: 4px;
  }

  .currency-symbol {
    font-size: 32px;
    font-weight: 700;
    display: flex;
    align-items: flex-end;
    gap: 8px;

    .currency-code {
      font-size: 18px;
      font-weight: 600;
      opacity: 0.8;
      margin-bottom: 4px;
    }
  }

  .globe-icon {
    color: white;
    opacity: 0.2;
  }
`;

const SearchSection = styled.div`
  position: relative;
  z-index: 10;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%; /* Posiciona justo debajo del InputText2 */
  left: 0;
  width: 100%;
  padding-top: 5px;
`;

const DropdownList = styled.ul`
  background: ${({ theme }) => theme.bgCards};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
  list-style: none;
  padding: 5px;
  margin: 0;

  /* Custom scrollbar para lista de países */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colorScroll};
    border-radius: 3px;
  }
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s background-color;
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.bgActive};
    color: ${({ theme }) => theme.textActive};
  }
`;

const PendingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.bg6};
  color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const WarningSection = styled.div`
  background-color: ${({ theme }) => theme.bg6}; /* Violeta muy suave */
  border-left: 4px solid ${({ theme }) => theme.primary};
  border-radius: 6px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colorSubtitle};
  font-size: 13px;

  svg {
    color: ${({ theme }) => theme.primary};
    min-width: 20px;
  }
`;
