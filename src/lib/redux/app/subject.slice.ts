import { createSlice } from '@reduxjs/toolkit';

interface SubjectItem {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}

interface SubjectsSliceDto {
  isFetchData: boolean;
  subjects: SubjectItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  phone: string;
}

const subjectsSlice = createSlice({
  name: 'subject',
  initialState: {
    isFetchData: true,
    subjects: [],
    page: 1,
    limit: 10,
    search: '',
    phone: '',
    total: 0,
  } as SubjectsSliceDto,
  reducers: {
    setDataSubjects: (state, action) => {
      state.subjects = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isFetchData = false;
    },
    setLimitOrPageSubject: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataSubject: (state) => {
      state.subjects = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.isFetchData = true;
      state.search = '';
      state.phone = '';
    },
    setFilterSubject: (state, action: { payload: { search: string } }) => {
      state.page = 1;
      state.search = action.payload.search;
    },
    refreshDataSubject: (state) => {
      state.isFetchData = true;
    },
  },
});

export const { setDataSubjects, setLimitOrPageSubject, resetDataSubject, refreshDataSubject, setFilterSubject } = subjectsSlice.actions;

export default subjectsSlice.reducer;
