import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  useBranchesStore,
  useCompanyStore,
  useDetailsSalesStore,
  useSalesCartStore,
  useSalesStore,
  useSuppliersClientsStore,
  useUserStore,
} from "../../../../index";

export function useCollectPayment() {
  const { typePayment, total, items, resetState, setStatePayment } =
    useSalesCartStore();
  const { users } = useUserStore();
  const { branchesAssigns } = useBranchesStore();
  const { companyData } = useCompanyStore();
  const { idSale, insertSales, resetSales } = useSalesStore();
  const { insertDetailsSales } = useDetailsSalesStore();
  const { suppliersClientsItemSelect } = useSuppliersClientsStore();

  const [valueCard, setValueCard] = useState(0);
  const [valueCash, setValueCash] = useState(0);
  const [valueCredit, setValueCredit] = useState(0);

  const isCash = typePayment === "EFECTIVO";
  const isDebit = typePayment === "DÉBITO";
  const isCredit = typePayment === "CRÉDITO";
  const isMixed = typePayment === "MIXTO";

  // --- CÁLCULOS DERIVADOS ---
  const currentTotalPaid = isMixed
    ? valueCash + valueCard + valueCredit
    : isCash
      ? valueCash
      : total;

  const rest = Math.max(0, total - currentTotalPaid);
  const change = isCash || isMixed ? Math.max(0, currentTotalPaid - total) : 0;

  // Inicialización de montos
  useEffect(() => {
    if (isMixed) {
      setValueCash(0);
      setValueCard(0);
      setValueCredit(0);
    } else if (isCash) {
      setValueCash(total);
    } else if (isDebit || isCredit) {
      setValueCash(0);
      setValueCard(isDebit ? total : 0);
      setValueCredit(isCredit ? total : 0);
    }
  }, [total, typePayment, isMixed, isCash, isDebit, isCredit]);

  const mutation = useMutation({
    mutationKey: "Insert Sales",
    mutationFn: insertSale,
    onSuccess: () => {
      setStatePayment({ typePayment: "" });
      resetState();
      resetSales();
      toast.success("Venta realizada con éxito");
    },
    onError: (err) => toast.error("Error: " + err.message),
  });

  async function insertSale() {
    if (rest > 0) return toast.warning("Falta saldo por cubrir");

    const pSale = {
      id_user: users?.id,
      id_branch: branchesAssigns[0]?.id_branch,
      id_company: companyData?.id,
      id_client: suppliersClientsItemSelect?.id
        ? suppliersClientsItemSelect.id
        : null,
      state: "CONFIRM",
      change: change,
      cash: isCash || isMixed ? valueCash : 0,
      credit_card: isCredit || isMixed ? valueCredit : 0,
      debit_card: isDebit || isMixed ? valueCard : 0,
      total_cost: total,
      type_payment: typePayment,
    };

    if (idSale === 0) {
      const result = await insertSales(pSale);
      if (result?.id) {
        // Ejecutar inserciones de detalles en paralelo
        const detailsPromises = items.map((item) => {
          const detailParams = {
            _id_sale: result.id,
            _quantity: item._quantity,
            _sale_price: item._sale_price,
            _total: item._quantity * item._sale_price,
            _desc: item._desc || "",
            _id_product: item._id_product,
            _buy_price: item._buy_price,
            _id_branch: branchesAssigns[0]?.id_branch,
          };
          return insertDetailsSales(detailParams);
        });
        await Promise.all(detailsPromises);
      }
    }
  }

  return {
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
  };
}
