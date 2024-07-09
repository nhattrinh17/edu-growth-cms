import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import { createSubject, getAllSubject, updateSubject } from './api';
import { resetDataSubject, setDataSubjects } from '@/lib/redux/app/subject.slice';
import moment from 'moment';

export const useSubject = () => {
  const { subjects, isFetchData, page, limit } = useAppSelector((state) => state.subject);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (isFetchData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllSubject(page, limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataSubjects({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isFetchData]);

  return {
    data:
      subjects.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
  };
};

export const handleCreateSubject = async (data: any, dispatch: any) => {
  const req = await createSubject(data);
  if (req?.data) {
    dispatch(resetDataSubject());
  } else {
    return false;
  }
};

export const handleUpdateSubject = async (id: number, data: any, dispatch: any) => {
  const req = await updateSubject(id, data);
  if (req?.data) {
    dispatch(resetDataSubject());
  } else {
    return false;
  }
};
