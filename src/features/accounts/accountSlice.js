const initialStateAccount = {

     // HESAP BAKİYE
     balance: 0,

     // KREDİ
     loan: 0,

     // KREDİ AMACI
     loanPurpose: "",

}
export default function accountReducer(state = initialStateAccount, action) {

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

// PARA YATIRMA 
export function deposit(amount) {
     return { type: "account/deposit", payload: amount }
}

// PARA ÇEKME
export function withdraw(amount) {
     return { type: "account/withdraw", payload: amount }
}

// KREDİ ÇEKME
export function requestLoan(amount, purpose) {
     return {
          type: "account/requestLoan",
          payload: { amount: amount, purpose: purpose }
     }
}

// KREDİ YATIRMA
export function payLoan() {
     return { type: "account/payLoan" }
}