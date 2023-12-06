import React from 'react';
export default function Clothrow({ Cloth, deleteProps }) {
    const { Cloth_name, Id, price, quantity, description, date, size, color } = Cloth
    return (
        <>
            <tr>
                <td>{date}</td>
                <td>{Cloth_name}</td>
                <td>{Id}</td>
                <td>{price}</td>
                <td>{quantity}</td>
                <td>{description}</td>
                <td>{size}</td>
                <td>{color}</td>
                <td onClick={() => deleteProps(Id)}>Delete</td>
            </tr>
        </>
    );
}
