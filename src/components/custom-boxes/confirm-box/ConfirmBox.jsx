import { useState } from "react";
import ConfirmBox from "./ConfirmBoxUI";

export default function useConfirm(){
    const [confirm, setConfirm] = useState({
        "show": false,
        "message": '',
        "accept": null,
        "cancel": null,
    })

    function showConfirm(message){
        return new Promise((resolve, reject) => {
            setConfirm({
                "show": true,
                "message": message,
                "accept": resolve,
                "cancel": reject,
            });
          });
        }
    

    function hideConfirm(){
        setConfirm({
            "show": false,
            "message": '',
            "accept": null,
            "cancel": null,
        })
    }

    function userConfirm(){

        confirm.accept(true)
        hideConfirm();
    }

    function userCancel(){
        
        confirm.cancel(false)
        hideConfirm();
    }

    function ConfirmComponent(){
        return (
            confirm.show ? < ConfirmBox message={confirm.message} onConfirm={userConfirm} onCancel={userCancel}/> : null
        )
    }

    return {showConfirm, ConfirmComponent}

}