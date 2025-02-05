import { Component, useState } from 'react'
import { Container, createTheme, Menu, ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import { Input, TextField } from '@mui/material'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import CssBaseline from "@mui/material/CssBaseline";

import './App.css'

function App() {
  const [mood, setMood] = useState("")
  var [date, setDate] = useState(null)
  var [content, setContent] = useState("")
//   const [date, setDate] = useState<Dayjs | null>(dayjs(new Date())); 

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      text: {
        primary: "#ffffff"
      }
    }
  })

  const handleMood = (event: SelectChangeEvent) => {
    setMood(event.target.value as string);
  };
  
  const handleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value as string);
  };

  const handleSave = () => {
    if (date == null) {
      date = dayjs(new Date())
    }
    if (window.electronAPI) {
      // window.electronAPI.saveTextFile("journal.txt", "On " + date.format('L') + ", my mood was " + mood + "." + "\n" + content);
      var data = {'date': date.format('L'), 'mood': mood, 'content': content}
      window.electronAPI.saveJSONFile(data)
      alert("File saved!");
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
        <DatePicker 
            value={date} 
            onChange={(newDate) => setDate(newDate)} 
            defaultValue={dayjs(new Date())}
        />
      </LocalizationProvider> 

      {/* Add section for mood for today on top, three faces with varying moods to indicate happy, meh, bad */}
      <h3>How did you feel today overall?</h3>
      <FormControl>
        <Select
          value={mood}
          onChange={handleMood}
          // renderValue={(selected) => (selected ? selected : "select an option")} // doesnt work
        >
          <MenuItem value={"good"}>Good</MenuItem>
          <MenuItem value={"neutral"}>Neutral</MenuItem>
          <MenuItem value={"bad"}>Bad</MenuItem>
        </Select>
      </FormControl>

      {/* Section for journal text input */}
      <TextField 
        value={content}
        onChange={handleContent}
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