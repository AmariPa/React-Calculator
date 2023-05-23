// Importing
import { useReducer } from "react"
import DigitButton from "./Digit"
import OperationButton from "./Operation"
import "./App.css"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOp: payload.digit,
          overwrite: false,
        } 
      }
      if (payload.digit === "0" && state.currentOp === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOp.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOp: `${state.currentOp || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOp == null && state.previousOp == null) {
        return state
      }

      if (state.currentOp == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOp == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOp: state.currentOp,
          currentOp: null,
        }
      }

      return {
        ...state,
        previousOp: evaluate(state),
        operation: payload.operation,
        currentOp: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOp: null,
        }
      }
      if (state.currentOp == null) return state
      if (state.currentOp.length === 1) {
        return { ...state, currentOp: null }
      }

      return {
        ...state,
        currentOp: state.currentOp.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOp == null ||
        state.previousOp == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOp: null,
        operation: null,
        currentOp: evaluate(state),
      }
  }
}

function evaluate({ currentOp, previousOp, operation }) {
  const prev = parseFloat(previousOp)
  const current = parseFloat(currentOp)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOp(Op) {
  if (Op == null) return
  const [integer, decimal] = Op.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOp, previousOp, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
    <div className="calc">
      <div className="output">
        <div className="previous-Op">
          {formatOp(previousOp)} {operation}
        </div>
        <div className="current-Op">{formatOp(currentOp)}</div>
      </div>
      <button
        className="big-button"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="big-button"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  )
}

export default App