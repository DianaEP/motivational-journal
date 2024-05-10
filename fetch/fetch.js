export async function retrieveJournalInputs(setInputs, userAuth, navigate ){
    const response = await fetch('http://localhost:3000/journalInputs',{
        headers :{
            'Authorization' : `Bearer ${userAuth}`
        }
    });
    const inputsFromServer = await response.json();

    if(response.ok){
        setInputs(inputsFromServer);
    }

    if(response.status === 401){
        navigate('/login') // needs navigate as param for function and on login.jsx 
    }
    
}

export async function retrieveName(userId){
    const response = await fetch(`http://localhost:3000/users${userId}`);
    const nameFromServer = await response.json();
    console.log(nameFromServer);
}

