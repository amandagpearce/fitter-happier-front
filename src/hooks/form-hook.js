import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      
      for (const inputId in state.inputs) { // finding out if all the inputs are valid
        
        if(!state.inputs[inputId]) { // skipping the iteration to ignore undefined input values
          continue;
        }
        
        if(inputId === action.inputId) { // if the iterated inputId is the one being changed through the action
          formIsValid = formIsValid && action.isValid;
        } else { // get the stored validity of other inputs
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid } // [action.inputId] dynamically updates the field that generated the action
        },
        isValid: formIsValid
      }
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default: 
      return state
  }
}

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs, // getting the input fields dynamically as well as the initial validity
    isValid: initialFormValidity
  });

  // whenever onInput is called in the Input component, and the info is forwarded from the useEffect
  // the function inside titleInputHandler gets executed, and if inside this fn we change anything in the state of the NewPlace component and rerender it
  // a new titleInputHandler gets created (since its inside the NewPlace), even if its the same it's a new function object
  // this new function will re-execute the useEffect in the Input component since it's a dependency of it => causing an unwanted infinite loop
  // useCallback solves this problem 
  // it wraps the fn in titleInputHandler and gets as a second argument the dependencies that will dictate when this new fn object should be recreated 
  // keeping the dependencies empty means the function will be stored from the first rendering of NewPlace onwards and not be recreated when the component rerenders 
  const inputHandler = useCallback(( id, value, isValid) => {
    dispatch({ //  dispatch does not need to be set as a dependency since reacts guarantees this fn will remain the same
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  // fn exposed in the return and that will populate the form after fetching the data available
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData];
};

