import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
    async function fetchData() {
      await axios
        .get("https://reqres.in/api/users")
        .then((response) => {
          setItems(response.data.data);
          setFilteredItems(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  const handleSearch = async (e) => {
    const query = e.target.value;
    console.log("query",query.length)
    if(query.length>0){
      setSearchQuery(query);
      if(items.length===0){
        await fetchData();
      }      
      const filtered = await items.filter((item) =>
        item.first_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }else{
      setFilteredItems([]);
    }    
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Movie World
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
                </li>     
            </ul>
              <div id="item-list">
                <ol>
                  {filteredItems.map((item, index) => (
                    <li key={index}>{item.first_name}</li>
                  ))}
                </ol>
              </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
