import { useState } from "react";

export default function FormValidationLogin({data, setData}){
       // VALIDATIONS

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validateData = () =>{
    let isValid = true;
    let validationErrors = {};

    
    if(data.email === '' || data.email === null){
      isValid = false;
      validationErrors.email = 'Email required'
    }else if(!/\S+@\S+\.\S+/.test(data.email)){
      isValid = false;
      validationErrors.email = 'Email is not valid'
    }

    if(data.password === '' || data.password === null){
      isValid = false;
      validationErrors.password = 'Password required'
    }

    setErrors(validationErrors);
    setValid(isValid);

    return isValid;
  }

  return {errors, valid, inputChange, validateData};
}
