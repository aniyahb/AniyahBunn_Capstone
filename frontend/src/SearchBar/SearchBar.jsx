

import { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import "./SearchBar.css"
import { useNavigate } from 'react-router';

function SearchBar ({ setSearch }){
    const [input, setInput] = useState('');
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        if (input.trim()) {
            navigate('/searched/' + input);
        }
    }

    const handleSearchIconClick = () => {
        if (input.trim()) {
            navigate('/searched/' + input);
        }
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setSearch(e.target.value);
    }

    return(
    <form className="search-bar" onSubmit={submitHandler}>
        <input
        className="search-input"
        type="text"
        value={input}
        placeholder="Search..."
        onChange={handleInputChange}
        />

        <div className='searchIcon' onClick={handleSearchIconClick}>
        <CiSearch> </CiSearch>
        </div>


    </form>
)
}
export default SearchBar;
