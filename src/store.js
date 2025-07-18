import { createStore } from "redux"

const initialState = {

     // HESAP BAKİYE
     balance: 0,

     // KREDİ
     loan: 0,

     // KREDİ AMACI
     loanPurpose: "",

}
function reducer(state = initialState, action) {

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
                    loan: action.payload
               };

          // KREDİ YATIRMA
          case "account/payLoan":
               return {
                    ...state,
                    loan: 0,
                    loanPurpose: 0,
                    balance: state.balance - state.loan
               };

          default:
               return state;

     }

}

const store = createStore(reducer);
store.dispatch({ type: "account/deposit", payload: 500 });
console.log("Hey Redux...");