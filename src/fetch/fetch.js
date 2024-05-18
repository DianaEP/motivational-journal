// GET all JOURNAL inputs from a specific user
export async function retrieveJournalInputs(userId,setInputs, userAuth, navigate ){
    try{
        const response = await fetch(`http://localhost:3000/journalInputs?userId=${userId}`,{
            headers :{
                'Authorization' : `Bearer ${userAuth.token}`
            }
        });

      
        if(!response.ok){

            if (response.status === 403) { 
                return setInputs([]); 
            }

            if(response.status === 401){
                navigate('/login') // needs navigate as param for function and on login.jsx 
            }else{
                throw new Error(`Failed to fetch journal inputs: ${response.statusText}`)
            }

           
        }

        const inputsFromServer = await response.json();
        setInputs(inputsFromServer);
      

        
    }catch(error){
            console.log('Error retrieving journal inputs:', error);   
    }
}



// ------------------------------------------------------------------------------------------------------------------------------

// GET only ONE JOURNAL input according with the id

export async function retrieveOneJournalInput(id, setInput, setEditedInput, userAuth, navigate ){
    const response = await fetch(`http://localhost:3000/journalInputs/${id}`,{
        headers :{
            'Authorization' : `Bearer ${userAuth.token}`
        }
    });
    const inputFromServer = await response.json();

    if(response.ok){
        setInput(inputFromServer);
        setEditedInput(inputFromServer);
    }

    if(response.status === 401){
        navigate('/journal') // needs navigate as param for function and on login.jsx 
    }
    
}

// ----------------------------------------------------------------------------------------------------------------------------

// GET all CARDS inputs from a specific user
export async function retrieveCards(userId,setCards, userAuth, navigate ){
    try{
        const response = await fetch(`http://localhost:3000/cards?userId=${userId}`,{
            headers :{
                'Authorization' : `Bearer ${userAuth.token}`
            }
        });

      
        if(!response.ok){

            if (response.status === 403) { 
                return setCards([]); 
            }

            if(response.status === 401){
                navigate('/login') // needs navigate as param for function and on login.jsx 
            }else{
                throw new Error(`Failed to fetch journal inputs: ${response.statusText}`)
            }

           
        }

        const cardsFromServer = await response.json();
        setCards(cardsFromServer);
      

        
    }catch(error){
            console.log('Error retrieving journal inputs:', error);   
    }
}

// -----------------------------------------------------------------------------------------------------------------------------------
