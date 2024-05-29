import { useState } from "react";
import Archive from "./ArchiveUI";
import PropTypes from "prop-types";

export default function useArchive(){
    const [showArchive, setShowArchive] = useState(false);

    function showArchiveComponent(){
        setShowArchive(true);
    }

    function hideArchiveComponent(){
        setShowArchive(false);
    }

    function ArchiveComponent({journalInputs}){
        return(
            showArchive && <Archive journalInputs={journalInputs} onClickHide={hideArchiveComponent}/>
        )
    }

    ArchiveComponent.propTypes = {
        journalInputs: PropTypes.any,
        
        
      };

    return {showArchiveComponent, ArchiveComponent}
}

