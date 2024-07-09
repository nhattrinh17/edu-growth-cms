import { useAppDispatch, useAppSelector } from '@/lib';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import { createLocation, getAllLocation, updateLocation } from './api';
import { resetDataLocation, setDataLocations } from '@/lib/redux/app/location.slice';
import moment from 'moment';

export const useLocation = (limitCustom?: number) => {
  const { locations, isFetchData, page, limit } = useAppSelector((state) => state.location);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (isFetchData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllLocation(page, limitCustom || limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataLocations({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isFetchData]);

  return {
    data:
      locations.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
  };
};

export const handleCreateLocation = async (data: any, dispatch: any) => {
  const req = await createLocation(data);
  if (req?.data) {
    dispatch(resetDataLocation());
  } else {
    return false;
  }
};

export const handleUpdateLocation = async (id: number, data: any, dispatch: any) => {
  const req = await updateLocation(id, data);
  if (req?.data) {
    dispatch(resetDataLocation());
  } else {
    return false;
  }
};
