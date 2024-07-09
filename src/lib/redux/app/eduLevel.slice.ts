import { createSlice } from '@reduxjs/toolkit';

interface EduLevelItem {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}

interface EduLevelsSliceDto {
  isFetchData: boolean;
  eduLevels: EduLevelItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  phone: string;
}

const EduLevelsSlice = createSlice({
  name: 'eduLevel',
  initialState: {
    isFetchData: true,
    eduLevels: [],
    page: 1,
    limit: 10,
    search: '',
    phone: '',
    total: 0,
  } as EduLevelsSliceDto,
  reducers: {
    setDataEduLevels: (state, action) => {
      state.eduLevels = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isFetchData = false;
    },
    setLimitOrPageEduLevel: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataEduLevel: (state) => {
      state.eduLevels = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.isFetchData = true;
      state.search = '';
      state.phone = '';
    },
    setFilterEduLevel: (state, action: { payload: { search: string } }) => {
      state.page = 1;
      state.search = action.payload.search;
    },
    refreshDataEduLevel: (state) => {
      state.isFetchData = true;
    },
  },
});

export const { setDataEduLevels, setLimitOrPageEduLevel, resetDataEduLevel, refreshDataEduLevel, setFilterEduLevel } = EduLevelsSlice.actions;

export default EduLevelsSlice.reducer;
