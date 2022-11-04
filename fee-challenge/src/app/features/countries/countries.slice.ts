import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as service from "./countries.service";
import { ICountry } from "./countries.interface";

export const fetchAllCountries = createAsyncThunk("countries", async () => {
  const response = await service.fetchAllCountries();
  return response;
});

interface IFilters {
  selectedRegion: string;
  search: string;
}

interface State {
  all_countries: Array<ICountry>;
  countries: Array<ICountry>;
  regions: Array<string>;
  loading: boolean;
  error: boolean;
  filters: IFilters;
  selectedCountry: false | ICountry;
}

const initialState: State = {
  all_countries: [],
  countries: [],
  regions: [],
  loading: false,
  error: false,
  filters: {
    search: "",
    selectedRegion: "",
  },
  selectedCountry: false,
};

const applyFilters = (state: State) => {
  const { all_countries, filters } = state;
  let filtered_data = all_countries;
  if (filters.selectedRegion) {
    state.filters.selectedRegion = filters.selectedRegion;
    if (filters.selectedRegion.length)
      filtered_data = filtered_data.filter(
        (e) => e.region === filters.selectedRegion
      );
  }
  if (filters.search) {
    state.filters.search = filters.search;
    if (filters.search.length) {
      filtered_data = filtered_data.filter((e) =>
        e.name.toLocaleLowerCase().includes(String(filters.search))
      );
    }
  }

  return filtered_data;
};

const countries = createSlice({
  name: "countries",
  initialState,
  reducers: {
    // omit reducer cases
    selectCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    selectRegion: (state, action) => {
      state.filters.selectedRegion = action.payload;
      state.countries = applyFilters(state);
    },
    setSearch: (state, action) => {
      state.filters.search = action.payload;
      state.countries = applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountries.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.all_countries = action.payload;
        state.countries = action.payload;

        // Set regions
        const regions = action.payload
          .map((country: ICountry) => country.region)
          .filter((value, index, self) => self.indexOf(value) === index);
        state.regions = regions;

        state.loading = false;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { selectCountry, selectRegion, setSearch } = countries.actions;

export default countries.reducer;
