import { combineReducers, createStore } from "redux"

const initialStateAccount = {

     // HESAP BAKİYE
     balance: 0,

     // KREDİ
     loan: 0,

     // KREDİ AMACI
     loanPurpose: "",

}

const initialStateCustomer = {

     fullName: "",
     nationalID: "",
     createdAt: "",

}

/* ---------------------------------------------------------------------------------------------------------------- */

function accountReducer(state = initialStateAccount, action) {

     switch (action.type) {

          // PARA YATIRMA
          case "account/deposit":
               return {
                    ...state,
                    balance: state.balance + action.payload
               };

          // PARA ÇEKME
          case "account/withdraw":
               return {
                    ...state,
                    balance: state.balance - action.payload
               };

          // KREDİ ÇEKME
          case "account/requestLoan":
               if (state.loan > 0) return state;

               return {
                    ...state,
                    loan: action.payload.amount,
                    loanPurpose: action.payload.purpose,
                    balance: state.balance + action.payload.amount
               };

          // KREDİ YATIRMA
          case "account/payLoan":
               return {
                    ...state,
                    balance: state.balance - state.loan,
                    loan: 0,
                    loanPurpose: ""
               };

          default:
               return state;

     }

}

function customerReducer(state = initialStateCustomer, action) {

     switch (action.type) {

          case "customer/createCustomer":
               return {
                    ...state,
                    fullName: action.payload.fullName,
                    nationalID: action.payload.nationalID,
                    createdAt: action.payload.createdAt
               };

          case "customer/updateName":
               return {
                    ...state,
                    fullName: action.payload
               }

          default:
               return state;

     }

}

/* ---------------------------------------------------------------------------------------------------------------- */

const rootReducer = combineReducers({
     account: accountReducer,
     customer: customerReducer
})

const store = createStore(rootReducer);

/* ---------------------------------------------------------------------------------------------------------------- */

// PARA YATIRMA 
function deposit(amount) {
     return { type: "account/deposit", payload: amount }
}

// PARA ÇEKME
function withdraw(amount) {
     return { type: "account/withdraw", payload: amount }
}

// KREDİ ÇEKME
function requestLoan(amount, purpose) {
     return {
          type: "account/requestLoan",
          payload: { amount: amount, purpose: purpose }
     }
}

// KREDİ YATIRMA
function payLoan() {
     return { type: "account/payLoan" }
}

/* ---------------------------------------------------------------------------------------------------------------- */

function createCustomer(fullName, nationalID) {
     return {
          type: "customer/createCustomer",
          payload: { fullName: fullName, nationalID: nationalID, createdAt: new Date().toISOString() }
     }
}

function updateName(fullName) {
     return { type: "customer/updateName", payload: fullName }
}