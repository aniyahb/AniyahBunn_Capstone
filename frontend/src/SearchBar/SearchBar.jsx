import { useState, useEffect } from 'react';
import "./SearchBar.css"



function SearchBar (){
    const [search, setSearch] = useState("");

    function handleSearchChange(event) {
        setSearch(event.target.value);
        setUrl(); // API KEY
    }

    return(
    <form className="search-bar">
        <input id="search" type="text" value={search} className="search-input" placeholder="Search..." onChange={e => handleSearchChange(e)}/>
        <button id="clear" className="clear-results">Clear</button>
    </form>


)
}
export default SearchBar;
