
import SearchBar from '../SearchBar/SearchBar'
import Profile from '../Profile/Profile'

function MainHeader(props) {
return(
    <div className='mainHeaderBody'>
    <header className='mainHeaderHeader'>
        <div className='homePageTitle'>MealMaster</div>
        <div className='searchBar'><SearchBar setSearch={props.setSearch}/></div>
        <div className='profile'><span><Profile/></span></div>
    </header>
    </div>
    )
}
export default MainHeader;
