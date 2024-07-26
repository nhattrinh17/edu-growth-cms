import { createSlice } from '@reduxjs/toolkit';

interface ClassItem {
  id: number;
  statusClass: number;
  subjectId: number;
  subject: {
    name: string;
  };
  eduLevelId: number;
  eduLevel: {
    name: string;
  };
  class: string;
  locationId: number;
  location: {
    name: string;
  };
  locationNear: string;
  locationReal: string;
  parentNumber: string;
  price: number;
  numberSessions: number;
  timeLearn: string;
  genderStudent: number;
  require: number;
  studentStatus: string;
  moreInfoStudent: string;
  receivingFee: number;
  userReceiverId: number;
  image: string;
  userReceiver: {
    name: string;
    email: string;
  };
  createdAt: Date;
}

interface ClassSliceDto {
  isFetchData: boolean;
  classes: ClassItem[];
  page: number;
  subjectId: number[];
  eduLevelId: number[];
  require: number[];
  locationId: number[];
  limit: number;
  search: string;
  total: number;
  classByIdEdit?: ClassItem;
  statusClass?: number;
}

const ClassSlice = createSlice({
  name: 'class',
  initialState: {
    isFetchData: true,
    classes: [],
    subjectId: [],
    eduLevelId: [],
    require: [],
    locationId: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
  } as ClassSliceDto,
  reducers: {
    setDataClass: (state, action) => {
      state.classes = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isFetchData = false;
    },
    setQueryClass: (state, action: { payload: { limit?: number; page?: number; subjectId?: number[]; eduLevelId?: number[]; require?: number[]; locationId?: number[]; statusClass?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
      state.subjectId = action.payload.subjectId ? action.payload.subjectId : state.subjectId;
      state.eduLevelId = action.payload.eduLevelId ? action.payload.eduLevelId : state.eduLevelId;
      state.require = action.payload.require ? action.payload.require : state.require;
      state.locationId = action.payload.locationId ? action.payload.locationId : state.locationId;
      state.statusClass = action.payload.statusClass ? action.payload.statusClass : state.statusClass;
    },
    resetDataClass: (state) => {
      state.classes = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.isFetchData = true;
      state.search = '';
      state.subjectId = [];
      state.eduLevelId = [];
      state.require = [];
      state.locationId = [];
      state.statusClass = undefined;
      state.classByIdEdit = undefined;
    },
    refreshDataClass: (state) => {
      state.isFetchData = true;
    },
    setDataClassById(state, action: { payload: { data: any } }) {
      state.classByIdEdit = action.payload.data;
    },
  },
});

export const { setDataClass, setQueryClass, resetDataClass, refreshDataClass, setDataClassById } = ClassSlice.actions;

export default ClassSlice.reducer;
