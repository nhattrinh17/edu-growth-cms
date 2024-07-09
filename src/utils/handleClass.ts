import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataClass, setDataClass, setDataClassById } from '@/lib/redux/app/class.slice';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import { useEffect } from 'react';
import { createClass, deleteClassById, getAllClasses, getClassById, updateClass, updateStatusClass } from './api';
import moment from 'moment';
import { GenderStudent, StatusClass } from '@/constants';

export const useClass = () => {
  const { classes, total, classByIdEdit, isFetchData, page, limit, eduLevelId, locationId, require, subjectId, statusClass } = useAppSelector((state) => state.class);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (isFetchData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllClasses(page, limit, subjectId, eduLevelId, require, locationId, statusClass);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataClass({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isFetchData]);

  return {
    data:
      classes.map((i) => {
        let statusClassText = 'Chưa có gia sư nhận';
        switch (i.statusClass) {
          case StatusClass.assignedClass:
            statusClassText = 'Đã giao gia sư';
            break;
          case StatusClass.received:
            statusClassText = 'Đã có gia sư nhận';
            break;
          case StatusClass.cancelClass:
            statusClassText = 'Lớp đã hủy';
            break;
          default:
            break;
        }

        return {
          id: i.id,
          statusClass: statusClassText,
          class: `${i.subject.name}-${i.eduLevel.name}-${i.class}`,
          parentNumber: i.parentNumber,
          genderStudent: GenderStudent.Female == i.genderStudent ? 'Nữ' : 'Nam',
          price: i.price.toLocaleString(),
          receivingFee: i.receivingFee,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
    total,
    limit,
    page,
    classByIdEdit,
  };
};

export const getClassByIdAndSave = async (id: number, dispatch: any) => {
  const res = await getClassById(id);
  if (res.data) {
    dispatch(setDataClassById({ data: res?.data }));
  }
};

export const handleCreateClass = async (data: any, dispatch: any) => {
  const res = await createClass(data);
  if (res.data) {
    dispatch(resetDataClass());
  }
};

export const handleUpdateClass = async (id: number, data: any, dispatch: any) => {
  const res = await updateClass(id, data);
  if (res.data) {
    dispatch(resetDataClass());
  }
};

export const handleUpdateStatusClass = async (id: number, data: any, dispatch: any) => {
  const res = await updateStatusClass(id, data);
  if (res.data) {
    dispatch(resetDataClass());
  }
};

export const handleDeleteClass = async (id: number, dispatch: any) => {
  const res = await deleteClassById(id);
  if (res.data) {
    dispatch(resetDataClass());
  }
};
