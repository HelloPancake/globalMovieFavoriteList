import React, {useState, useEffect} from 'react'
import SearchResult from './searchResult'

const Search = (props) => {
    const [searchCurr, changeSearchCurr] = useState("")
    const [result, changeResult] = useState({})
    let changeFavorites = props.changeFavs

    const handleSearchSubmit = async (e) =>{
        e.preventDefault()
        console.log(searchCurr)
        let response = await fetch("/search", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({searchTitle: searchCurr}) 
        })

        let responseObj = await response.json();
        console.log(responseObj)
        changeResult(responseObj.searchedMovie)
    }

    const handleSearchChange = (e) => {
        changeSearchCurr(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch("/favorite", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        })

        let responseObj = await response.json();
        console.log(responseObj)
        changeFavorites(responseObj.favorites)
    }

    return(
        <>
        <SearchResult result={result}/>
        <form onSubmit={handleSearchSubmit}>
                <label>
                    Title:
          <input type="text" value={searchCurr} onChange={handleSearchChange} />
                </label>
                <input type="submit" value="Submit" />
        </form>

        <button onClick={handleSubmit}> Favorite </button>
        </>
    )
}

export default Search;