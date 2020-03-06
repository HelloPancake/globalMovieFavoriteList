import React from 'react';

const Favorites = (props) => {
    let favorites = props.favorites;

    const handleClick = async (e) => {
        let response = await fetch('/favorites', {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: e.target.value}) 
        })
        
        let responseObj = await response.json()
        props.changeFavorites(responseObj.favorites)

    }
    
    favorites = favorites.map((el, idx) => {
        return(
            <li key={idx}>
                title: {el.title} year: {el.year} plot: {el.plot} genre: {el.genre}
                <button value={el.title} onClick={handleClick}> delete </button>
            </li>
        )
    })
    
    return(
        <ul>
        {favorites}
        </ul>
    )
}

export default Favorites