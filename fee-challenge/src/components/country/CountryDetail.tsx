import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ICountry } from "../../app/features/countries/countries.interface";
import { selectCountry } from "../../app/features/countries/countries.slice";
import { RootState } from "../../app/store";

interface IProps {
  all_countries?: Array<ICountry>;
  selectedCountry?: false | ICountry;
  dispatch: any;
}
interface IState {}

class CountryDetail extends Component<IProps, IState> {
  render() {
    const { selectedCountry, all_countries } = this.props;
    return (
      <Container>
        <Box sx={{ p: 3 }}>
          <Button
            variant="contained"
            onClick={() => this.props.dispatch(selectCountry(false))}
          >
            Back
          </Button>
        </Box>
        {selectedCountry ? (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={4}>
              <Grid item sm={6}>
                {selectedCountry ? (
                  <img width={"100%"} src={selectedCountry.flag} />
                ) : null}
              </Grid>
              <Grid item sm={6}>
                <Typography gutterBottom variant="h2" component="div">
                  {selectedCountry.name}
                </Typography>

                <Box sx={{ mt: 5 }}>
                  <Grid container>
                    <Grid item sm={6}>
                      <Typography gutterBottom component="p">
                        <strong>Native Name: </strong>
                        {selectedCountry.name}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <strong>Population: </strong>
                        {selectedCountry.population}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <strong>Region: </strong>
                        {selectedCountry.region}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <strong>Sub Region: </strong>
                        {selectedCountry.subregion}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <strong>Capital: </strong>
                        {selectedCountry.capital}
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography gutterBottom component="p">
                        <strong>Top Level Domain: </strong>
                        {selectedCountry.topLevelDomain}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <strong>Currencies: </strong>
                        {selectedCountry.currencies
                          .map((c) => c.name)
                          .join(", ")}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <strong>Languages: </strong>
                        {selectedCountry.languages
                          .map((l) => l.name)
                          .join(", ")}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <strong>Sub Region: </strong>
                        {selectedCountry.subregion}
                      </Typography>
                      <Typography gutterBottom component="p">
                        <strong>Capital: </strong>
                        {selectedCountry.capital}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 5 }}>
                  <Typography gutterBottom component="span">
                    <strong>Border Countries: </strong>
                  </Typography>
                  {all_countries
                    ?.filter((c: ICountry) =>
                      selectedCountry.borders.includes(c.cioc)
                    )
                    .map((country: ICountry) => (
                      <Chip
                        variant="outlined"
                        onClick={() =>
                          this.props.dispatch(selectCountry(country))
                        }
                        label={country.name}
                        sx={{ m: 1, borderRadius: "5px" }}
                      />
                    ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  all_countries: state.countries.all_countries,
  selectedCountry: state.countries.selectedCountry,
});

export default connect(mapStateToProps)(CountryDetail);
