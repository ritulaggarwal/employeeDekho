import React from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const Filtering = () => {
    const optionsArray = [
        { key: "Engineer", label: "Engineer" },
        { key: "Operations", label: "Operations" },
    ];
    return (
        <DropdownMultiselect handleOnChange={(selected) => {
            console.log(selected)
        }}
            options={optionsArray} name="department" />
    )
}

export default Filtering
