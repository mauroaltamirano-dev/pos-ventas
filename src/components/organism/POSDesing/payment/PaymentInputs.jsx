import { InputText, useCompanyStore } from "../../../../index";
import { Area2 } from "./PaymentStyles";

export function PaymentInputs({
  isMixed,
  isCash,
  isDebit,
  isCredit,
  total,
  valueCash,
  setValueCash,
  valueCard,
  setValueCard,
  valueCredit,
  setValueCredit,
}) {
  const { companyData } = useCompanyStore();

  const parseValue = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  return (
    <Area2>
      {(isMixed || isCash) && (
        <InputText key="cash">
          <input
            onChange={(e) => setValueCash(parseValue(e.target.value))}
            type="number"
            className="form__field"
            value={valueCash}
          />
          <label className="form__label">
            Efectivo {companyData?.symbolmoney}
          </label>
        </InputText>
      )}

      {(isMixed || isDebit) && (
        <InputText key="debit">
          <input
            onChange={(e) => setValueCard(parseValue(e.target.value))}
            type="number"
            className="form__field"
            value={isMixed ? valueCard : total}
            disabled={!isMixed}
          />
          <label className="form__label">Tarjeta Débito</label>
        </InputText>
      )}

      {(isMixed || isCredit) && (
        <InputText key="credit">
          <input
            onChange={(e) => setValueCredit(parseValue(e.target.value))}
            type="number"
            className="form__field"
            value={isMixed ? valueCredit : total}
            disabled={!isMixed}
          />
          <label className="form__label">Tarjeta Crédito</label>
        </InputText>
      )}
    </Area2>
  );
}
