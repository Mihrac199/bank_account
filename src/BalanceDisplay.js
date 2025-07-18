function formatCurrency(value) {

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

}

export default function BalanceDisplay() {

  return <div className="balance">{formatCurrency(123456)}</div>

}