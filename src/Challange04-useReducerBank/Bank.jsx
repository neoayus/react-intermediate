import { useReducer } from "react";

const initialState = {
  account: false,
  balance: 0,
  loan: 0,
  loanStatus: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAcc":
      if(state.account) return state; 
      return {
        ...state,
        account: true,
        balance: 500,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + 150,
      };

    case "withdraw":
      if(state.balance + state.loan < 150) return {...state}
      return {
        ...state,
        balance: state.balance - 150,
      };

    case "requestLoan":
      if(state.loanStatus) return{...state}
      return {
        ...state,
        loan: 5000,
        loanStatus: true,
      };

    case "payLoan":
      if(!state.loanStatus || state.balance >= 5000) return{...state}
      return {
        ...state,
        loan: 0,
        loanStatus: false,
      };

    case "closeAccount":
      if(state.balance <= 500 && !state.loanStatus)return {
        ...state,
        balance: 0,
        account: false,
      };

    default:
      return state;
  }
}

export default function Bank() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { account, loan, balance } = state;

  return (
    <div
      className="division"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <h2>useReducer Bank Account</h2>

      <p>Balance: {balance + loan}</p>
      <p>Loan: {loan}</p>

      <button onClick={() => dispatch({ type: "openAcc" })}>
        Open Account
      </button>

      <button disabled={!account} onClick={() => dispatch({ type: "deposit" })}>
        Deposit 150
      </button>

      <button
        disabled={!account}
        onClick={() => dispatch({ type: "withdraw" })}
      >
        Withdraw 150
      </button>

      <button
        disabled={!account}
        onClick={() => dispatch({ type: "requestLoan" })}
      >
        Request a loanStatus of 5000
      </button>

      <button disabled={!account} onClick={() => dispatch({ type: "payLoan" })}>
        Pay Loan
      </button>

      <button
        disabled={!account}
        onClick={() => dispatch({ type: "closeAccount" })}
      >
        Close Account
      </button>
    </div>
  );
}
