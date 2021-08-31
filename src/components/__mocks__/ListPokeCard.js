import React from 'react';
const ListPokeCard = ({owned = false, image, name, release}) => {
    console.log(image);
    return (
    <div>
        <p>{image}</p>
        <p>{name}</p>
    </div>)
};
export default ListPokeCard;