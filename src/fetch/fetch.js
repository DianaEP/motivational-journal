  //                       ----------------------------->   USERS    <--------------------------------- 

//  PUT update user

export async function updateUser(userAuth, userDetails, setUserAuth, navigate){
    try {
        // console.log("Updating user with data:", userDetails);
        const response = await fetch(`http://localhost:3000/users/${userAuth.userId}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userAuth.token}`
          },
          body: JSON.stringify(userDetails),
        });
  
        if (response.ok) {
          const updatedUser = await response.json();
          // console.log("Server response with updated user:", updatedUser);
          setUserAuth(updatedUser); // Update context with new user data
          alert('Your changes have been successfully saved! ')
          navigate('/')
        } 
        }catch (error) {
        console.error('Error updating user details:', error); 
      }
}

// ------------------------------------------------------------------------------------------------------------------------------

// DELETE user details

export async function deleteUser(userAuth,navigate){
    try {
        
        const response = await fetch(`http://localhost:3000/users/${userAuth.userId}`,{
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userAuth.token}`
          }
        });
  
        if (response.ok) {
          navigate('/register')
        } 
        }catch (error) {
        console.error('Error deleting user account:', error); 
      }
}








//                       ----------------------------->   JOURNAL    <--------------------------------- 

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

// POST journal inputs

export async function submitJournalInput(userAuth, newInput, setJournalInputs){
    try {
      const inputWithUserId = { ...newInput, userId: userAuth.userId };
      const response = await fetch('http://localhost:3000/journalInputs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuth.token}`,
        },
        body: JSON.stringify(inputWithUserId),
      });
      const data = await response.json();
      setJournalInputs((prevJournalInputs) => [...prevJournalInputs, data]);
      console.log('New entry submitted:', newInput.date);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  }

// ----------------------------------------------------------------------------------------------------------------------------

//   PUT update journal inputs

export async function updateJournalInput(id, editedInput, userAuth, navigate){
    try {
       await fetch(`http://localhost:3000/journalInputs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuth.token}`
        },
        body: JSON.stringify(editedInput)
      })
      navigate('/journal'); 
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  }



// ----------------------------------------------------------------------------------------------------------------------------
export async function deleteJournalInput(id, userAuth, navigate){
    try{
        await fetch(`http://localhost:3000/journalInputs/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${userAuth.token}`,
            },
          })
        navigate('/journal');  
      } catch (error) {
        console.error('Error deleting journal entry:', error);
        throw error;
      }
    }


// ----------------------------------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------------------------------

//                       ----------------------------->   CARDS    <--------------------------------- 


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

// POST new card

export async function cardSubmit(card, userAuth, setCards){
    try {
      const response = await fetch('http://localhost:3000/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuth.token}`
        },
        body: JSON.stringify(card)
      });
      if (!response.ok) {
        if(response.status === 500){
            alert('This card already exist!Press update if you want to save the changes'); // i need the alert box ERROR
            return;
        }
      }
  
      const data = await response.json();
      setCards(prevCards => {
        const updatedCards = prevCards.map(c => (c.id === card.id ? data : c));
        return updatedCards;
      });
      return data;
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  }

//   --------------------------------------------------------------------------------------------------------------------------------

// PUT update card

export async function cardUpdate(card, userAuth, setCards){
    try {
      const response = await fetch(`http://localhost:3000/cards/${card.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuth.token}`
        },
        body: JSON.stringify(card)
      });
  
      if (!response.ok) {
        if(response.status === 404){
            alert("This card doesn't exist!You have to save it first!"); // i need the alert box ERROR
            return;
        }
      }
  
      const data = await response.json();
      setCards(prevCards => {
        const updatedCards = prevCards.map(c => (c.id === card.id ? data : c));
        return updatedCards;
      });
      return data;
    } catch (error) {
      console.error('Error updating card:', error);
      
    }
  }

//   --------------------------------------------------------------------------------------------------------------------------------

// DELETE card

export async function cardDelete(cardId, userAuth, setCards){
    try {
      const response = await fetch(`http://localhost:3000/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userAuth.token}`
        }
      });
  
      if (!response.ok) {
        if(response.status === 401){
            alert("You cannot delete this card!You have to save it first!"); // i need the alert box ERROR
            return;
        }
      }
  
       // Remove the card from the list 
     setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      
    }
  }

