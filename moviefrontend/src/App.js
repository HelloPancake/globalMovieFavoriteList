import React, {useState, useEffect} from 'react';
import Favorites from './components/favorites/favorites';
import Search from './components/search/search'

const App = () => {

  const [favorites, changeFavorites] = useState([])

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('/favorites', {
        method: 'GET',
      })
      response = await response.json()
      changeFavorites(response.movies)
    }
    fetchData();
  }, []);

  return (
    <div>
      <Search changeFavs={changeFavorites}/>
      <Favorites favorites={favorites} changeFavorites={changeFavorites}/>
    </div>
  );
}

export default App;
