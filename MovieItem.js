import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const MovieItem = () => {
  const { id } = useParams();
  //const [items, setItems] = useState([]);
  //const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    fetchData(id);
  }, [id]);

  async function fetchData(search) {
    await axios
      .get(`https://www.omdbapi.com/?i=${search}&apikey=d28a993b`)
      .then((response) => {
        let result = response.data;
        //setItems(result?result:[]);
        setFilteredItems(result ? result : []);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div className="movieItem">
      <table>
        {
          <>
            <div className="item-pk">
              <img src={filteredItems.Poster} />
              <tr key={filteredItems.imdbID}>
                <td></td>
                <td className="pk">Title : {filteredItems.Title}</td>
                <td className="pk">Year : {filteredItems.Year}</td>
                <td className="pk">Released : {filteredItems.Released}</td>
                <td className="pk">Runtime : {filteredItems.Runtime}</td>
                <td className="pk">Genre : {filteredItems.Genre}</td>
                <td className="pk">Director : {filteredItems.Director}</td>
                <td className="pk">Actors : {filteredItems.Actors}</td>
                <td className="pk">Language : {filteredItems.Language}</td>
                <td className="pk">Country : {filteredItems.Country}</td>
                <td className="pk">Type : {filteredItems.Type}</td>
                <td className="pk">DVD : {filteredItems.DVD}</td>
                <td className="pk">Plot : {filteredItems.Plot}</td>
              </tr>
            </div>
          </>
        }
      </table>
    </div>
  );
};

export default MovieItem;
