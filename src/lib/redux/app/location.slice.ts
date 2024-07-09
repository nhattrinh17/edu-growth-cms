import { createSlice } from '@reduxjs/toolkit';

interface LocationItem {
  id: number;
  district: string;
  province: string;
  createdAt: Date;
}

interface LocationsSliceDto {
  isFetchData: boolean;
  locations: LocationItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  phone: string;
}

const LocationsSlice = createSlice({
  name: 'location',
  initialState: {
    isFetchData: true,
    locations: [],
    page: 1,
    limit: 10,
    search: '',
    phone: '',
    total: 0,
  } as LocationsSliceDto,
  reducers: {
    setDataLocations: (state, action) => {
      state.locations = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isFetchData = false;
    },
    setLimitOrPageLocation: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataLocation: (state) => {
      state.locations = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.isFetchData = true;
      state.search = '';
      state.phone = '';
    },
    setFilterLocation: (state, action: { payload: { search: string } }) => {
      state.page = 1;
      state.search = action.payload.search;
    },
    refreshDataLocation: (state) => {
      state.isFetchData = true;
    },
  },
});

export const { setDataLocations, setLimitOrPageLocation, resetDataLocation, refreshDataLocation, setFilterLocation } = LocationsSlice.actions;

export default LocationsSlice.reducer;
