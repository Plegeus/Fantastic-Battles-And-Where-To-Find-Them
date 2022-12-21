import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./SearchBarStyles.css";
import "../Account/AccountInformationStyles.css"

function SearchBar(props) {

    //github.com/machadop1407/React-Search-Bar

    const [filteredData, setFilteredData] = useState([]);

    const searchIcon = <FiSearch size="2rem" color="gray" />

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = props.data.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord) {
            setFilteredData(newFilter);
        } else {
            setFilteredData(props.data);
        }
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={props.placeholder}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {searchIcon}
                </div>
            </div>
            <div className="dataResultContainer">
                {filteredData.length != 0 && (
                    <div className="dataResult">
                        {filteredData.slice(0, 6).map((value, key) => {
                            return (
                                <Link className="dataItem" to={props.starturl + value} key={key}>
                                    <p>{value} </p>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}


export default SearchBar;