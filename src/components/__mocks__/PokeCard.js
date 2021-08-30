import React from 'react';
const PokeCard = ({owned = false, image, name, release}) => {
    console.log(image);
    return (
    <div>
        <p>{image}</p>
        <p>{name}</p>
    </div>)
};
export default PokeCard;