export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface ILanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface IRegionalBlock {
  acronym: string;
  name: string;
}

export interface ICountry {
  name: string;
  topLevelDomain: Array<string>;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: Array<string>;
  capital: string;
  altSpellings: Array<string>;
  subregion: string;
  region: string;
  population: number;
  latlng: Array<number>;
  demonym: string;
  area: number;
  timezones: Array<string>;
  borders: Array<string>;
  nativeName: string;
  numericCode: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies: Array<ICurrency>;
  languages: Array<ILanguage>;
  translations: Record<string, string>;
  flag: string;
  regionalBlocs: Array<IRegionalBlock>;
  cioc: string;
  independent: boolean;
}
