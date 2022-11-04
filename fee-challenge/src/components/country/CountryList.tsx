import {
  Container,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { ICountry } from "../../app/features/countries/countries.interface";
import Country from "./Country";
import {
  fetchAllCountries,
  selectCountry,
  selectRegion,
  setSearch,
} from "../../app/features/countries/countries.slice";
import { AppDispatch, RootState } from "../../app/store";
import CountryDetail from "./CountryDetail";

interface IProps {
  all_countries?: Array<ICountry>;
  countries?: Array<ICountry>;
  regions?: Array<string>;
  selectedRegion?: string;
  search?: string;
  selectedCountry?: boolean | ICountry;
  dispatch: any;
}
interface IState {}

class CountryList extends Component<IProps, IState> {
  componentDidMount(): void {
    this.props.dispatch(fetchAllCountries());
  }

  handleSearch: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = e;
    console.log(value);
    this.props.dispatch(setSearch(value));
  };

  handleCountrySelection = (country: false | ICountry) => {
    this.props.dispatch(selectCountry(country));
  };

  handleRegionSelection = (e: SelectChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    this.props.dispatch(selectRegion(value));
  };

  render() {
    const { countries, search, regions } =
      this.props;
    return (
      <Container>
        <Grid container spacing={4} sx={{py: 5}}>
          <Grid item sm={6}>
            <Paper
              component="form"
              sx={{
                mx: "auto",
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Countries"
                inputProps={{ "aria-label": "search countries" }}
                onChange={this.handleSearch}
                value={search}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <FormControl sx={{ m: 1, minWidth: 120}}>
                <InputLabel id="region-select">Region</InputLabel>
                <Select
                  labelId="region-select"
                  id="region-select"
                  onChange={this.handleRegionSelection}
                  autoWidth
                  label="Region"
                >
                  <MenuItem key={"None"} value="">None</MenuItem>
                  {regions?.map((region) => (
                    <MenuItem key={region} value={region}>{region}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {this.props.selectedCountry ? (
            <CountryDetail />
          ) : (
            countries?.map((country: ICountry) => (
              <Grid key={country.name} item sm={3}>
                <Country country={country} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  regions: state.countries.regions,
  countries: state.countries.countries,
  selectedRegion: state.countries.filters.selectedRegion,
  search: state.countries.filters.search,
  selectedCountry: state.countries.selectedCountry,
});

export default connect(mapStateToProps)(CountryList);
