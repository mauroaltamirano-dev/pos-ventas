import { Icon } from "@iconify/react";
import { Area1, EditBtn } from "./PaymentStyles";
import { useSuppliersClientsStore, useUserStore } from "../../../../index";

export function PaymentHeader({ typePayment, toggleSearchClient }) {
  const { users } = useUserStore();
  const { suppliersClientsItemSelect } = useSuppliersClientsStore();

  return (
    <Area1>
      <div className="type-badge" $mode={typePayment}>
        <Icon icon="solar:card-transfer-bold" />
        <span>{typePayment}</span>
      </div>
      <div className="client-box">
        <label>Cliente: </label> <span>{suppliersClientsItemSelect?.name}</span>
      </div>
      <EditBtn onClick={toggleSearchClient}>
        <Icon icon="line-md:edit" />
      </EditBtn>
    </Area1>
  );
}
