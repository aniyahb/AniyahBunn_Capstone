import { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import "./SearchBar.css"
import { useNavigate } from 'react-router';

function SearchBar (props){
    const [input, setInput] = useState('');
    const navigate = useNavigate()


    const submitHandler = (e) =>{
        e.preventDefault();
        navigate('/searched/'+input);

    }
    // original code:
    // const [recipes, setRecipes] = useState([]);

    // const [url, setUrl] = useState()

    // const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch`;

    // useEffect(() => {
    //     if (search.trim() === '') {
    //         setRecipes([]);
    //         return;
    //     }

    //     const fetchRecipes = async () => {
    //         try {
    //             const response = await fetch(`${BASE_URL}?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             setRecipes(data.results);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchRecipes();
    // }, [search]);



    // function handleSearchChange(event) {
    //     setSearch(event.target.value);
    //     setUrl(`${BASE_URL}?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`)

    // }

    // const handleClear = () => {
    //     setSearch('');
    //     setRecipes([]);
    // };


    return(
    <form className="search-bar" onSubmit={submitHandler}>
        <input
        className="search-input"
        type="text"
        value={input}
        placeholder="Search..."
        onChange={(e)=> {
            setInput(e.target.value)
        props.setSearch(e.target.value)}}
        />

        <div className='searchIcon'>
        <CiSearch> </CiSearch>
        </div>

        {/* <button id="search" className="search-results" type="button" >
            Search
        </button> */}

    </form>
)
}
export default SearchBar;
