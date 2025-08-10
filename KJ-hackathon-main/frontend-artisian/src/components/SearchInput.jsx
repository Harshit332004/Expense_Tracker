import React from "react";
// import { useSearch } from "../../context/search.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
    // const [values, setValues] = useSearch();
    const navigate = useNavigate();

    return (
        <div>
            <form className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;