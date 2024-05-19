import { useState } from "react";
import AlertBox from "./AlertBoxUI";

export default function useAlert(){
    const [alert, setAlert] = useState({
        "show" : false,
        "message": '',
    })

    function showAlert(message){
        setAlert({
            "show" : true,
            "message": message,
        })
    }

    function hideAlert(){
        setAlert({
            "show" : false,
            "message": '',
        })
    }

    function AlertComponent(){
        return (
            alert.show ? < AlertBox message = {alert.message} onClickHide ={hideAlert}/> : null
        )
    }
    return { showAlert , AlertComponent}
}