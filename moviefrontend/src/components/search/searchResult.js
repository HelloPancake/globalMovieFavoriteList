import React from 'react';

const SearchResult = (props) => {

    let title = null;
    let yr = null;
    let bio = null;
    let genre = null;

    if (props.result){
        title = props.result.title 
        yr = props.result.year 
        bio = props.result.plot 
        genre = props.result.genre 
    }

    return(
        <ul>
            <li>{title}</li>
            <li>{yr}</li>
            <li>{bio}</li>
            <li>{ genre }</li >
        </ul>
    )
}

export default SearchResult