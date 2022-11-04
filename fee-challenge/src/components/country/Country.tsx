import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ICountry } from "../../app/features/countries/countries.interface";
import { selectCountry } from "../../app/features/countries/countries.slice";

interface IProps {
  country: ICountry;
  dispatch: any;
}

interface IState {}

class Country extends Component<IProps, IState> {
  render() {
    const { country } = this.props;
    return (
      <Card
        sx={{ maxWidth: 345 }}
        onClick={() => this.props.dispatch(selectCountry(country))}
      >
        <CardMedia component="img" alt={country.name} image={country.flag} />
        <CardContent>
          <Container>
            <Typography gutterBottom variant="h5" component="div">
              {country.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              <strong>Population: </strong>
              {country.population}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              <strong>Region: </strong>
              {country.region}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              <strong>Capital: </strong>
              {country.capital}
            </Typography>
          </Container>
        </CardContent>
      </Card>
    );
  }
}
export default connect()(Country);
