import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export default function Sort({ options, setDesc, setSortBy }) {
  const [value, setValue] = useState("");
  const [sort, setSort] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    setSortBy(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150, display: "flex", alignItems: "center" }}>
      <FormControl fullWidth>
        <InputLabel
          id="select-label"
          style={{
            top: "-6px",
          }}
        >
          Sort
        </InputLabel>
        <Select
          labelId="select-label"
          value={value}
          label="Sort"
          onChange={handleChange}
          size="small"
        >
          {options.map((option, index) => (
            <MenuItem value={option.value} key={index}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="text"
        onClick={() => {
          setDesc(sort);
          setSort(!sort);
        }}
        style={{
          padding: "6px",
          minWidth: "24px",
          margin: 0,
        }}
      >
        {sort ? <FaCaretDown /> : <FaCaretUp />}
      </Button>
    </Box>
  );
}
