

import { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import "./SearchBar.css"
import { useNavigate } from 'react-router';

function SearchBar ({ setSearch }){
    const [input, setInput] = useState('');
    const navigate = useNavigate()


    const submitHandler = (e) =>{
        e.preventDefault();
        navigate('/searched/'+input);

    }

    return(
    <form className="search-bar" onSubmit={submitHandler}>
        <input
        className="search-input"
        type="text"
        value={input}
        placeholder="Search..."
        onChange={(e)=> {
            setInput(e.target.value)
            setSearch(e.target.value)}}
        />

        <div className='searchIcon'>
        <CiSearch> </CiSearch>
        </div>


    </form>
)
}
export default SearchBar;
