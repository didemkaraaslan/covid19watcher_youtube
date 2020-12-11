import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import "./App.css";
import AreaChart from "./components/AreaChart";
import { fetchCountries } from "./api";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "50px auto",
    width: "50%",
  },
}));

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");

  useEffect(async () => {
    const countries = await fetchCountries();
    setCountries(countries);
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>
          <FormControl className={classes.formControl}>
            <Select
              labelId="countries"
              id="countries"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.Slug} value={country.Slug}>
                  {country.Country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid item xs={12}>
            {/* Chart */}
            <AreaChart country={country} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;
