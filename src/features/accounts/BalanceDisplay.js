import { useSelector } from "react-redux"

function formatCurrency(value) {

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

}

export default function BalanceDisplay() {

  const { balance } = useSelector(state => state.account);

  return <div className="balance">{formatCurrency(balance)}</div>

}