import { Component, useState } from 'react'
import { Container, createTheme, Menu, ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import { Input, TextField } from '@mui/material'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import CssBaseline from "@mui/material/CssBaseline";

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [mood, setMood] = useState("")
  
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      text: {
        primary: "#ffffff"
      }
    }
  })

  const handleChange = (event: SelectChangeEvent) => {
    setMood(event.target.value as string);
  };

  const handleSave = () => {
    if (window.electronAPI) {
      window.electronAPI.saveTextFile("journal.txt", "This is my journal entry.");
      alert("File saved as journal.txt!");
    } else {
      console.error("Electron API is not available");
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Ensures dark theme applies to the entire app */}
      <h1>Mo's Personal Journal App</h1>

      {/* Add section showing today's date */}
      <h3>Choose date for journal entry</h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker defaultValue={dayjs(new Date())}/>
      </LocalizationProvider> 

      {/* Add section for mood for today on top, three faces with varying moods to indicate happy, meh, bad */}
      <h3>How did you feel today overall?</h3>
      <FormControl>
        <Select
          value={mood}
          onChange={handleChange}
          // renderValue={(selected) => (selected ? selected : "select an option")} // doesnt work
        >
          <MenuItem value={"good"}>Good</MenuItem>
          <MenuItem value={"neutral"}>Neutral</MenuItem>
          <MenuItem value={"bad"}>Bad</MenuItem>
        </Select>
      </FormControl>

      {/* Section for journal text input */}
      <TextField 
        placeholder='Tell me what happened today!' 
        multiline 
        fullWidth>
      </TextField>

      {/* Section for button to submit journal entry */}
      <div className="card">
        <Button onClick={handleSave}>
          Submit Journal Entry
        </Button>
      </div>
    </ThemeProvider>
  )
}

export default App