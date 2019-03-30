import React from 'react'

const SearchEmployees = (props) => {

    return (
        <div>
            <input type="search" placeholder="Search" onChange={props.onSearchTextChange} />
            <button type="submit">Search</button>
        </div>
    )
}


export default SearchEmployees