
import SearchBar from '../SearchBar/SearchBar'
import Profile from '../Profile/Profile'

function MainHeader({ setSearch }) {
return(
    <div className='mainHeaderBody'>
    <header className='mainHeaderHeader'>
        <div className='mainHeaderTitle'>MealMaster</div>
        <div className='searchBar'><SearchBar setSearch={setSearch}/></div>
        <div className='profile'><span><Profile/></span></div>
    </header>
    </div>
    )
}
export default MainHeader;
