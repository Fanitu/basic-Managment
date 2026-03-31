import { useState } from 'react'

function MainSection() {


  const [orderName,setOrderName] = useState('');
  const [orderPrice,setOrderPrice] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  const formSubmit = async(e)=>{
    console.log('clicked')
    e.preventDefault();

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/api/order',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            name:orderName,
            price:parseFloat(orderPrice)
          })

      });

    if(!response.ok){
      throw new Error(`HTTP Error! status:${response.status}`);
    }
    const data = await response.json();
    console.log(data)

    setOrderName('')
    setOrderPrice('')
    

    alert('order Submited Succesfully');
      
    } catch (err) {

      console.error('error submitting Order:',err)
      setError(err.message);
      alert('Failed to Submit order,Try again later.')
      
    }finally{
      setIsLoading(false);

    }
    

  }

  return (
    <>
       <div className='mainSection'>
        <h1 className='mainSectionTitle'>
            Mini fastfood Managemnt system.Input your order below and save it!
         </h1>
         <div className='mainSectionForm'>
        <h1>
          Order form
        </h1>

        <form onSubmit={formSubmit}>
           <p>
            <label for="order" className='orderLabel'>Order Name: </label>
                <select name="order" value={orderName} id="orderName" onChange={(e)=>setOrderName(e.target.value)} className='orderType' required>
                  <optgroup label="Fata Normal">
                    <option value="Fata Normal2">Fata Normal ms 2</option>
                    <option value="Fata Normal3">Fata Normal ms 3</option>
                    <option value="Fata Normal4">Fata Normal ms 4</option>
                    <option value="Fata Normal5">Fata Normal ms 5</option>
                    <option value="Fata Normal6">Fata Normal ms 6</option>
                    <option value="Fata Normal7">Fata Normal ms 7</option>
                    <option value="Fata Normal8">Fata Normal ms 8</option>
                    <option value="Fata Normal9">Fata Normal ms 9</option>
                    <option value="Fata Normal10">Fata Normal ms 10</option>
                  </optgroup>
                  <optgroup label="Fata Special">
                    <option value="Fata Special2">Fata Special ms 2</option>
                    <option value="Fata Special3">Fata Special ms 3</option>
                    <option value="Fata Special4">Fata Special ms 4</option>
                    <option value="Fata Special5">Fata Special ms 5</option>
                    <option value="Fata Special6">Fata Special ms 6</option>
                    <option value="Fata Special7">Fata Special ms 7</option>
                    <option value="Fata Special8">Fata Special ms 8</option>
                    <option value="Fata Special9">Fata Special ms 9</option>
                    <option value="Fata Special10">Fata Special ms 10</option>
                  </optgroup>
                  <optgroup label="Toast">
                    <option value="Normal Toast">Normal Toast</option>
                    <option value="Special Toast">Special Toast</option>
                    <option value="Egg Sandwich">Egg Sandwich</option>
                  </optgroup>
                  <optgroup label="Ful">
                    <option value="Normal Ful">Normal Ful</option>
                    <option value="Special Ful">Special Ful</option>
                  </optgroup>
                  <optgroup label="water">
                    <option value="One litre">One litre</option>
                    <option value="Two litre">Two litre</option>
                    <option value="Half litre">Half litre</option>
                  </optgroup>
                </select>
           </p>
           <p>
            <label for="order" className='orderLabel'>Order price: </label>
          <input type='number' className='orderPrice' placeholder='Product Price' value={orderPrice} id="orderPrice" onChange={(e)=>setOrderPrice(e.target.value)} required/>
           </p>
           <button type='submit' disabled={isLoading} className='saveButton'>
              {isLoading?'Submitting': 'Submit Order'}
           </button>

           {error && setTimeout(()=>{
            <p style={{color:'red'}}>Error:{error}</p>
              },2000)}
        </form>
       </div>
       <div>
        
       </div>
       </div>   
    </>
  )
}

export default MainSection;