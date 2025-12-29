import { FormatNumber, useCompanyStore } from "../../../../index";
import { Area3 } from "./PaymentStyles";

export function PaymentSummary({ total, rest, change }) {
  const { companyData } = useCompanyStore();

  return (
    <Area3>
      <div className="row">
        <span>Total a Pagar:</span>
        <span className="val">
          {FormatNumber(total, companyData?.currency, companyData?.iso)}
        </span>
      </div>
      <div className="row">
        <span>Total s/ imp.:</span>
        <span className="val val-tax">
          {FormatNumber(
            total - (total * (companyData?.value_tax || 0)) / 100,
            companyData?.currency,
            companyData?.iso
          )}
        </span>
      </div>
      <div className="row">
        <span>Restante:</span>
        <span className={`val ${rest > 0 ? "error" : "success"}`}>
          {FormatNumber(rest, companyData?.currency, companyData?.iso)}
        </span>
      </div>
      {change > 0 && (
        <div className="row change-row">
          <span>Vuelto:</span>
          <span className="val">
            {FormatNumber(change, companyData?.currency, companyData?.iso)}
          </span>
        </div>
      )}
    </Area3>
  );
}
