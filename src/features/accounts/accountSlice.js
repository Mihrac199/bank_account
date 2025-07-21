import { createSlice } from "@reduxjs/toolkit"

const initialState = {

     // HESAP BAKİYE
     balance: 0,

     // KREDİ
     loan: 0,

     // KREDİ AMACI
     loanPurpose: "",

     isLoading: false,

}

const accountSlice = createSlice({

     name: "account",
     initialState,
     reducers: {

          // PARA YATIRMA
          deposit(state, action) {
               state.balance += action.payload;
               state.isLoading = false;
          },

          convertingCurrency(state) {
               state.isLoading = true;
          },

          // PARA ÇEKME
          withdraw(state, action) {
               state.balance -= action.payload;
          },

          // KREDİ ÇEKME
          requestLoan: {

               prepare(amount, purpose) {
                    return {
                         payload: { amount, purpose }
                    }
               },

               reducer(state, action) {
                    if (state.loan > 0) return;

                    state.loan = action.payload.amount;
                    state.loanPurpose = action.payload.purpose;
                    state.balance += action.payload.amount
               },

          },

          // KREDİ YATIRMA
          payLoan(state) {
               state.balance -= state.loan;
               state.loan = 0;
               state.loanPurpose = "";
          },

     }

})

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
     if (currency === "USD") {
          return { type: "account/deposit", payload: amount }
     }

     return async function (dispatch, getState) {

          dispatch({ type: "account/convertingCurrency" });

          const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}base=${currency}&symbols=USD`);
          const data = await res.json();
          const converted = data.rates.USD;

          dispatch({ type: "account/deposit", payload: converted })

     }
}

export default accountSlice.reducer;