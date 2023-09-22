import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Movie() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  async function fetchData(search) {
    await axios
      .get(`https://www.omdbapi.com/?s=${search}&apikey=d28a993b`)
      .then((response) => {
        let result = response.data.Search;
        setItems(result ? result : []);
        setFilteredItems(result ? result : []);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const timeout = setTimeout(() => fetchData(e.target.value), 800);
  };
  console.log("filteredItems", filteredItems);
  return (
    <div className="seacrhBox">
      <div className="box1">
        <h2>Your Favourite Movie is Here: </h2>
        <input
          className="search-title"
          type="text"
          placeholder="Search by Title"
          onChange={handleSearch}
        />
        <span  className="search-title1">"Just enter first or full name of any movies or web series"</span>
      </div>
      <table style={{backgroundColor:"#bd5c73"}}>
        {filteredItems.length > 0 &&
          filteredItems.map((item) => (
            <>
              <Link to={`/product/${item.imdbID}`}>
                <img src={item.Poster} className="img-poster" />
                <tr key={item.imdbID}></tr>
              </Link>
            </>
          ))}
      </table>
    </div>
  );
}

export default Movie;
