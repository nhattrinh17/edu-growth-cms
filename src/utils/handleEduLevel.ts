import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import { createEduLevel, getAllEduLevel, updateEduLevel } from './api';
import { resetDataEduLevel, setDataEduLevels } from '@/lib/redux/app/eduLevel.slice';
import moment from 'moment';

export const useEduLevel = () => {
  const { eduLevels, isFetchData, page, limit } = useAppSelector((state) => state.eduLevel);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (isFetchData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllEduLevel(page, limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataEduLevels({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isFetchData]);

  return {
    data:
      eduLevels.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
  };
};

export const handleCreateEduLevel = async (data: any, dispatch: any) => {
  const req = await createEduLevel(data);
  if (req?.data) {
    dispatch(resetDataEduLevel());
  } else {
    return false;
  }
};

export const handleUpdateEduLevel = async (id: number, data: any, dispatch: any) => {
  const req = await updateEduLevel(id, data);
  if (req?.data) {
    dispatch(resetDataEduLevel());
  } else {
    return false;
  }
};
