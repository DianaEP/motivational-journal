import { useState } from "react";

export default function FormValidation({dataRegister, setDataRegister}){

     // VALIDATIONS

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setDataRegister({ ...dataRegister, [name]: value });
  };

  const validateData = () =>{
    let isValid = true;
    let validationErrors = {};

    if(dataRegister.firstName === '' || dataRegister.firstName === null){
      isValid = false;
      validationErrors.firstName = 'First name required'
    }

    if(dataRegister.lastName === '' || dataRegister.lastName === null){
      isValid = false;
      validationErrors.lastName = 'Last name required'
    }

    if(dataRegister.email === '' || dataRegister.email === null){
      isValid = false;
      validationErrors.email = 'Email required'
    }else if(!/\S+@\S+\.\S+/.test(dataRegister.email)){
      isValid = false;
      validationErrors.email = 'Email is not valid'
    }

    if(dataRegister.password === '' || dataRegister.password === null){
      isValid = false;
      validationErrors.password = 'Password required'
    }

    if(dataRegister.confirmPassword === '' || dataRegister.confirmPassword === null){
      isValid = false;
      validationErrors.confirmPassword = 'Confirm password required'
    }

    if( dataRegister.password !== dataRegister.confirmPassword){
      isValid = false;
      validationErrors.confirmPassword = "Passwords don't match"
    }

    setErrors(validationErrors);
    setValid(isValid);

    return isValid;
  }

  return {errors, valid, inputChange, validateData};
}