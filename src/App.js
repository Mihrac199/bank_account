import CreateCustomer from "./CreateCustomer"
import Customer from "./Customer"
import AccountOperations from "./features/accounts/AccountOperations"
import BalanceDisplay from "./BalanceDisplay"

export default function App() {

  return (

    <div>

      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />

    </div>

  )

}