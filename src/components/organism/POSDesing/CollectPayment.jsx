import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "styled-components";
import {
  Btn1,
  PanelSearchClient,
  useCompanyStore,
  useSuppliersClientsStore,
} from "../../../index.js";
import { Container, Area4 } from "./payment/PaymentStyles";
import { PaymentHeader } from "./payment/PaymentHeader";
import { PaymentInputs } from "./payment/PaymentInputs";
import { PaymentSummary } from "./payment/PaymentSummary";
import { useCollectPayment } from "./payment/useCollectPayment";
import { useQuery } from "@tanstack/react-query";

export const CollectPayment = forwardRef((props, ref) => {
  const theme = useTheme();
  const [stateSearchClient, setStateSearchClient] = useState(false);

  const {
    valueCash,
    setValueCash,
    valueCard,
    setValueCard,
    valueCredit,
    setValueCredit,
    isMixed,
    isCash,
    isDebit,
    isCredit,
    total,
    rest,
    change,
    typePayment,
    mutation,
  } = useCollectPayment();

  const {
    searchSuppliersClients,
    selectSuppliersClients,
    search,
    setSearch,
    suppliersClientsItemSelect,
  } = useSuppliersClientsStore();
  const { companyData } = useCompanyStore();

  useImperativeHandle(ref, () => ({
    mutateAsync: mutation.mutateAsync,
  }));

  // --- SELECCIÓN DE CLIENTE ---
  const { data: findClientData, isLoading: isLoadingClient } = useQuery({
    queryKey: ["Buscar Client", [companyData?.id, "client", search]],
    queryFn: () =>
      searchSuppliersClients({
        id_company: companyData?.id,
        type: "client",
        search: search,
      }),
    enabled: !!companyData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log(suppliersClientsItemSelect);
  }, [suppliersClientsItemSelect]);

  return (
    <Container $type={typePayment}>
      {mutation.isPending ? (
        <div className="loading">
          <Icon icon="line-md:loading-loop" width={40} />
          <span>Procesando pago...</span>
        </div>
      ) : (
        <>
          <PaymentHeader
            typePayment={typePayment}
            toggleSearchClient={() => setStateSearchClient(!stateSearchClient)}
          />

          <PaymentInputs
            isMixed={isMixed}
            isCash={isCash}
            isDebit={isDebit}
            isCredit={isCredit}
            total={total}
            valueCash={valueCash}
            setValueCash={setValueCash}
            valueCard={valueCard}
            setValueCard={setValueCard}
            valueCredit={valueCredit}
            setValueCredit={setValueCredit}
          />

          <PaymentSummary total={total} rest={rest} change={change} />

          <Area4>
            <Btn1
              func={() => mutation.mutateAsync()}
              bgColor={rest > 0 ? theme.border : "#10b981"}
              title={rest > 0 ? "Falta Saldo" : "Confirmar Cobro"}
              color="#fff"
              width="100%"
              disabled={rest > 0}
            />
          </Area4>
          <span>{suppliersClientsItemSelect?.name}</span>
        </>
      )}
      {stateSearchClient && (
        <PanelSearchClient
          data={findClientData} // Datos que vienen de useQuery
          selector={selectSuppliersClients} // PASAMOS LA FUNCIÓN, NO EL OBJETO
          setStateSearcher={() => setStateSearchClient(false)}
          setSearch={setSearch}
          displayField="name"
        />
      )}
    </Container>
  );
});
