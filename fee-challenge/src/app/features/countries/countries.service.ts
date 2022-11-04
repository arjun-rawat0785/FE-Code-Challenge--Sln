import { ICountry } from "./countries.interface";

export const fetchAllCountries = async (): Promise<Array<ICountry>> => {
    const response = await fetch('https://restcountries.com/v2/all');
    return response.json();
}