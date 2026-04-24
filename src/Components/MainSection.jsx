import React, { useState } from 'react';
import axios from 'axios';
import './MainSection.css';

const MainSection = () => {
  const [formData, setFormData] = useState({
    orderType: '',
    quantity: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    if(name ==="orderType"){


    const actualPriceForm = {
    Fata_Normal_ms2: 100,
    Fata_Normal_ms3: 120,
    Fata_Normal_ms4: 150,
    Fata_Normal_ms5:170,
    Fata_Normal_ms6:200,
    Fata_Normal_ms7:220,
    Fata_Normal_ms8:250,
    Fata_Normal_ms9:270,
    Fata_Normal_ms10:300,
    Fata_Normal_ms11:330,
    Fata_Normal_ms12:360,
    Fata_Normal_ms13:390,
    Fata_Normal_ms14:410,
    Fata_Normal_ms15:440,


    Fata_Special_ms2:160,
    Fata_Special_ms3:190,
    Fata_Special_ms4:210,
    Fata_Special_ms5:230,
    Fata_Special_ms6:260,
    Fata_Special_ms7:280,
    Fata_Special_ms8:310,
    Fata_Special_ms9:340,
    Fata_Special_ms10:370,
    Fata_Special_ms11:400,
    Fata_Special_ms12:430,
    Fata_Special_ms13:460,
    Fata_Special_ms14:490,
    Fata_Special_ms15:520,

    Normal_Toast:130,
    Special_Toast:170,
    Egg_Sandwich:60,
    One_litre:40,
    Two_litre:50,
    Half_litre:30,

    Normal_Ful:120,
    Special_Ful:150,
     One_dabo:15,
    Two_dabo:30,
    Three_dabo:45,
    Four_dabo:60
   
  }
      const number = actualPriceForm[value];
      console.log(number);
      console.log("we are in order type");
      return setFormData({
        ...formData,
        [name]: value,
        quantity: number
      })

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://managmentbackend-production.up.railway.app/api/order', formData);
      setMessage('Order submitted successfully!');
      setFormData({ orderType: '', quantity: 0 });
      console.log('Response:', response.data);
    } catch (error) {
      setMessage('Error submitting order. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-section">
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label htmlFor="orderType">Order Type:</label>
          <select
            id="orderType"
            name="orderType"
            value={formData.orderType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select order type</option>
             <optgroup label="ፋታ ኖርማል">
                    <option value="Fata_Normal_ms2">ፋታ ኖርማል ምስ 2</option>
                    <option value="Fata_Normal_ms3">ፋታ ኖርማል ምስ 3</option>
                    <option value="Fata_Normal_ms4">ፋታ ኖርማል ምስ 4</option>
                    <option value="Fata_Normal_ms5">ፋታ ኖርማል ምስ 5</option>
                    <option value="Fata_Normal_ms6">ፋታ ኖርማል ምስ 6</option>
                    <option value="Fata_Normal_ms7">ፋታ ኖርማል ምስ 7</option>
                    <option value="Fata_Normal_ms8">ፋታ ኖርማል ምስ 8</option>
                    <option value="Fata_Normal_ms9">ፋታ ኖርማል ምስ 9</option>
                    <option value="Fata_Normal_ms10">ፋታ ኖርማል ምስ 10</option>
                    <option value="Fata_Normal_ms11">ፋታ ኖርማል ምስ 11</option>
                    <option value="Fata_Normal_ms12">ፋታ ኖርማል ምስ 12</option>
                    <option value="Fata_Normal_ms13">ፋታ ኖርማል ምስ 13</option>
                    <option value="Fata_Normal_ms14">ፋታ ኖርማል ምስ 14</option>
                    <option value="Fata_Normal_ms15">ፋታ ኖርማል ምስ 15</option>
                  </optgroup>
                  <optgroup label="ፋታ አስፔሻል">
                    <option value="Fata_Special_ms2">ፋታ አስፔሻል ምስ 2</option>
                    <option value="Fata_Special_ms3">ፋታ አስፔሻል ምስ 3</option>
                    <option value="Fata_Special_ms4">ፋታ አስፔሻል ምስ 4</option>
                    <option value="Fata_Special_ms5">ፋታ አስፔሻል ምስ 5</option>
                    <option value="Fata_Special_ms6">ፋታ አስፔሻል ምስ 6</option>
                    <option value="Fata_Special_ms7">ፋታ አስፔሻል ምስ 7</option>
                    <option value="Fata_Special_ms8">ፋታ አስፔሻል ምስ 8</option>
                    <option value="Fata_Special_ms9">ፋታ አስፔሻል ምስ 9</option>
                    <option value="Fata_Special_ms10">ፋታ አስፔሻል ምስ 10</option>
                    <option value="Fata_Special_ms11">ፋታ አስፔሻል ምስ 11</option>
                    <option value="Fata_Special_ms12">ፋታ አስፔሻል ምስ 12</option>
                    <option value="Fata_Special_ms13">ፋታ አስፔሻል ምስ 13</option>
                    <option value="Fata_Special_ms14">ፋታ አስፔሻል ምስ 14</option>
                    <option value="Fata_Special_ms15">ፋታ አስፔሻል ምስ 15</option>
                  </optgroup>
                  <optgroup label="ቶስት">
                    <option value="Normal_Toast">ኖርማል ቶስት</option>
                    <option value="Special_Toast">አስፔሻል ቶስት</option>
                    <option value="Egg_Sandwich">ፓኒኖ አንቓቅሖ</option>
                  </optgroup>
                  <optgroup label="ፉል">
                    <option value="Normal_Ful">ፉል ኖርማል</option>
                    <option value="Special_Ful">ፉል አስፔሻል</option>
                  </optgroup>
                  <optgroup label="ማይ">
                    <option value="One_litre">1 ሊትሮ ማይ</option>
                    <option value="Two_litre">2 ሊትሮ ማይ</option>
                    <option value="Half_litre">½ ሊትሮ ማይ</option>
                  </optgroup>
<optgroup label="ባኒ">
                    <option value="One_dabo">1 ችማሪ ባኒ</option>
                    <option value="Two_dabo">2 ችማሪ ባኒ</option>
                    <option value="three_dabo">3 ችማሪ ባኒ</option>
<option value="four_dabo">4 ችማሪ ባኒ</option>
                  </optgroup>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Price:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Order'}
        </button>
        
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default MainSection;
