import React from 'react';
import { useState, useEffect } from 'react';
import './Form.css'
import Clothrow from './Clothrow';
import getstoragedata from '../utility/getdata'

export default function Form() {
    const [inputs, setInputs] = useState(getstoragedata());

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputValues = {};
        const inputElements = [...event.target.elements];

        inputElements.forEach((item) => {
            if (item.type === "radio" && !item.checked) {
                return;
            }
            inputValues[item.name] = item.value;
        });

        const checkbox = document.getElementById('checkbox');
        if (checkbox.checked) {
            setInputs([...inputs, inputValues]);
            event.target.reset();
        } else {
            alert('Please accept the terms and conditions');
        }
    };


    useEffect(() => {
        localStorage.setItem("key", JSON.stringify(inputs))
    }, [inputs]);

    const deleteItem = (Id) => {
        const filtered = inputs.filter((item) => item.Id !== Id)
        setInputs(filtered)
    }
    return (
        <>
            <div className="main-container">

                <div className="container">
                    <div className="content">
                        <form onSubmit={handleSubmit}>
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Cloth Name</span>
                                    <input type="text" name='Cloth_name' required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Cloth id</span>
                                    <input type="text" name='Id' required />
                                </div>
                                <div className="price-quantity">
                                    <div className="input-box">
                                        <span className="details">Price</span>
                                        <input type="text" name='price' required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Quantity</span>
                                        <input type="number" name='quantity' required />
                                    </div>
                                </div>

                                <div className="input-box">
                                    <span className="details">Date</span>
                                    <input type="date" name='date' required />
                                </div>
                                <span className="description" >Description</span>
                                <textarea className="input-box" name='description'>
                                </textarea>
                                <div className="input-box">
                                    <span className="details">Select Colour</span>
                                    <div className="select-and-date">
                                        <select id="mySelect" name='color'>
                                            <option>red</option>
                                            <option>yellow</option>
                                            <option>green</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='radio'>
                                    <p>Select your size:</p>
                                    <div className="radio-group">
                                        <div className="radio-1">
                                            <input type="radio" id="sizeXL" name="size" value="XL" />
                                            <label htmlFor="sizeXL">XL</label><br />
                                        </div>
                                        <div className="radio-1">
                                            <input type="radio" id="sizeXXL" name="size" value="XXL" />
                                            <label htmlFor="sizeXXL">XXL</label><br />
                                        </div>
                                        <div className="radio-1">
                                            <input type="radio" id="sizeM" name="size" value="M" />
                                            <label htmlFor="sizeM">M</label><br />
                                        </div>
                                    </div>
                                </div>

                                <div className="tacbox">
                                    <input id="checkbox" type="checkbox" />
                                    <label for="checkbox"> I agree to these <a href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>

                {
                    inputs.length > 0 ? <div className="table-body">
                        <table className="table" id="customers">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Cloth Name</th>
                                    <th>id</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Description</th>
                                    <th>Size</th>
                                    <th>Colour</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inputs.map((item, index) => <Clothrow Cloth={item} deleteProps={deleteItem} />)}
                            </tbody>
                        </table>
                    </div> :
                        <div className='emty'>
                            <h1>No cloth added yet</h1>
                        </div>
                }
            </div>
        </>

    );
}
