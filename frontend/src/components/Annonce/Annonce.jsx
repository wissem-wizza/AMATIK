import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import AnnonceList from "./AnnonceList";
import AnnonceTest from "./AnnonceTest";

const formaDate = (forma, dat) => {
  const dd = String(dat.getDate()).padStart(2, "0");
  const mm = String(dat.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = dat.getFullYear();
  if (forma === "dmy") return dd + "-" + mm + "-" + yyyy;
  if (forma === "mdy") return mm + "-" + dd + "-" + yyyy;
  if (forma === "ymd") return yyyy + "-" + mm + "-" + dd;
};

const Annonce = () => {
  const [espece, setEspece] = useState("");
  const [date, setDate] = useState("");
  const [week, setWeek] = useState(0);
  const [race, setRace] = useState("");
  const [cle, setCle] = useState("453176");
  const [date_A, setDate_A] = useState(new Date()); //"October 22, 2013 03:24:00"

  function getMonday(d) {
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const dat = new Date(d.setDate(diff));
    return formaDate("ymd", dat);
  }

  function getFriday(d) {
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) + 4;
    const dat = new Date(d.setDate(diff));
    return formaDate("ymd", dat);
  }

  const handleDateChange = (event) => {
    const dateObject = event.$d;
    setWeek(getWeekNumber(dateObject));
    setDate_A(dateObject);
  };

  const handleEspeceChange = (event) => {
    setRace(event.target.value);
  };

  function getWeekNumber(date) {
    // Copy the date object to avoid modifying the original one
    const d = new Date(date);

    // Set the target to the nearest Thursday
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));

    // Get the year of the Thursday
    const yearStart = new Date(d.getFullYear(), 0, 1);

    // Calculate the number of full weeks between the Thursday and the year's start
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    return weekNumber;
  }

  // const firstNonEmpty = (ADR0, ADR1, ADR2) => {
  //   if (ADR0) return ADR0;
  //   if (ADR1) return ADR1;
  //   if (ADR2) return ADR2;
  //   return null; // Return null if all fields are empty
  // };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "5px",
          alignItems: "center",
        }}
      >
        <div style={{ paddingRight: "8px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD-MM-YYYY"
              label="Date"
              value={date}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  size: "small",
                  error: false,
                },
              }}
            />
          </LocalizationProvider>
        </div>
        <TextField
          id="outlined-basic"
          label="Semaine"
          variant="outlined"
          value={week == week ? week : 0}
          size="small"
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Espèce</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={espece}
              label="Espèce"
              onChange={handleEspeceChange}
            >
              <MenuItem value="">
                <em>TOUTES</em>
              </MenuItem>
              <MenuItem value={"BOVINS"}>BOVINS</MenuItem>
              <MenuItem value={"CAPRINS"}>CAPRINS</MenuItem>
              <MenuItem value={"OVINS"}>OVINS</MenuItem>
              <MenuItem value={"VIANDE"}>VIANDE</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      {/* <AnnonceList
        cle={cle}
        race={race}
        date_d={getMonday(date_A)}
        date_f={getFriday(date_A)}
      /> */}
      <AnnonceTest
        cle={cle}
        race={race}
        date_d={getMonday(date_A)}
        date_f={getFriday(date_A)}
      />
    </>
  );
};

export default Annonce;
