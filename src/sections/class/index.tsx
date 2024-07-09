'use client';

import { EduLevelComponent } from '@/components/Class/EduLevel';
import { LocationComponent } from '@/components/Class/Location';
import { SubjectComponent } from '@/components/Class/Subject';
import { HeaderContent } from '@/components/HeaderContent';
import { GenderStudent, StatusClass, TypeRequireClass } from '@/constants';
import { useAppDispatch } from '@/lib';
import { setDataClassById } from '@/lib/redux/app/class.slice';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { getClassByIdAndSave, handleCreateClass, handleDeleteClass, handleUpdateClass, handleUpdateStatusClass, useClass } from '@/utils/handleClass';
import { useEduLevel } from '@/utils/handleEduLevel';
import { useLocation } from '@/utils/handleLocation';
import { useSubject } from '@/utils/handleSubject';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function ClassSection(): JSX.Element {
  const [showSubject, setShowSubject] = useState(false);
  const [showEduLevel, setShowEduLevel] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const { data, limit, page, total, classByIdEdit } = useClass();
  const [showCreate, setShowCreate] = useState(false);
  const dispatch = useAppDispatch();
  // Dữ liệu môn học, cấp học địa chỉ
  const { data: dataSubject } = useSubject();
  const { data: dataEduLevel } = useEduLevel();
  const { data: dataLocation } = useLocation(100);

  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Trạng thái lớp',
      name: 'statusClass',
      readOnly: false,
      type: 'options',
      value: classByIdEdit?.statusClass || StatusClass.stillEmpty,
      canUpdate: true,
      dataOption: [
        {
          text: 'Trống',
          value: StatusClass.stillEmpty,
        },
        {
          text: 'Đã giao gia sư',
          value: StatusClass.assignedClass,
        },
        {
          text: 'Đã có gia sư nhận',
          value: StatusClass.received,
        },
        {
          text: 'Đã hủy',
          value: StatusClass.cancelClass,
        },
      ],
    },
    {
      label: 'Môn học',
      name: 'subjectId',
      readOnly: Boolean(classByIdEdit?.subjectId) || false,
      type: 'options',
      value: classByIdEdit?.subjectId || dataSubject[0]?.id,
      canUpdate: !Boolean(classByIdEdit?.subjectId) || false,
      dataOption: dataSubject.map((i) => {
        return {
          text: i.name,
          value: i.id,
        };
      }),
    },
    {
      label: 'Cấp học',
      name: 'eduLevelId',
      readOnly: Boolean(classByIdEdit?.eduLevelId) || false,
      type: 'options',
      value: classByIdEdit?.eduLevelId || dataEduLevel[0]?.id,
      canUpdate: !Boolean(classByIdEdit?.eduLevelId) || false,
      dataOption: dataEduLevel.map((i) => {
        return {
          text: i.name,
          value: i.id,
        };
      }),
    },
    {
      label: 'Địa chỉ quận(huyện)',
      name: 'locationId',
      readOnly: Boolean(classByIdEdit?.locationId) || false,
      type: 'options',
      value: classByIdEdit?.locationId || dataLocation[0]?.id,
      canUpdate: !Boolean(classByIdEdit?.locationId) || false,
      dataOption: dataLocation.map((i) => {
        return {
          text: `${i.district}-${i.province}`,
          value: i.id,
        };
      }),
    },
    {
      label: 'Cấp bậc gia sư',
      name: 'require',
      readOnly: false,
      type: 'options',
      value: classByIdEdit?.require || TypeRequireClass.student,
      canUpdate: true,
      dataOption: [
        {
          text: 'Sinh viên',
          value: TypeRequireClass.student,
        },
        {
          text: 'Sinh viên nam',
          value: TypeRequireClass.maleStudent,
        },
        {
          text: 'Sinh viên nữ',
          value: TypeRequireClass.femaleStudent,
        },
        {
          text: 'Giảng viên',
          value: TypeRequireClass.lecturers,
        },
      ],
    },
    {
      label: 'Giới tính học sinh',
      name: 'genderStudent',
      readOnly: false,
      type: 'options',
      value: classByIdEdit?.genderStudent || GenderStudent.Male,
      canUpdate: true,
      dataOption: [
        {
          text: 'Học sinh nam',
          value: GenderStudent.Male,
        },
        {
          text: 'Học sinh nữ',
          value: GenderStudent.Female,
        },
      ],
    },
    {
      label: 'Lớp',
      name: 'class',
      readOnly: false,
      type: 'text',
      value: classByIdEdit?.class || '',
      canUpdate: true,
    },
    {
      label: 'Địa chỉ hiển thị cho gia sư',
      name: 'locationNear',
      readOnly: false,
      type: 'text',
      value: classByIdEdit?.locationNear || '',
      canUpdate: true,
    },
    {
      label: 'Địa chỉ đúng của học sinh',
      name: 'locationReal',
      readOnly: false,
      type: 'text',
      value: classByIdEdit?.locationReal || '',
      canUpdate: true,
    },
    {
      label: 'Số điện thoại phụ huynh',
      name: 'parentNumber',
      readOnly: false,
      type: 'text',
      value: classByIdEdit?.parentNumber || '',
      canUpdate: true,
    },
    {
      label: 'Giá trên buổi',
      name: 'price',
      readOnly: false,
      type: 'number',
      value: classByIdEdit?.price || '',
      canUpdate: true,
    },
    {
      label: 'Số buổi dạy 1 tuần',
      name: 'numberSessions',
      readOnly: false,
      type: 'number',
      value: classByIdEdit?.numberSessions || '',
      canUpdate: true,
    },
    {
      label: 'Thời gian dạy hàng tuần',
      name: 'timeLearn',
      readOnly: false,
      type: 'text',
      value: classByIdEdit?.timeLearn || '',
      canUpdate: true,
    },
    {
      label: 'Phí nhận lớp',
      name: 'receivingFee',
      readOnly: false,
      type: 'number',
      value: classByIdEdit?.receivingFee || '',
      canUpdate: true,
    },
    {
      label: 'Tình trạng hiện tại học viên',
      name: 'studentStatus',
      readOnly: false,
      type: 'textarea',
      value: classByIdEdit?.studentStatus || '<b>Nhập thông tin tại đây ...</b>',
      canUpdate: true,
    },
    {
      label: 'Thông tin thêm về học sinh',
      name: 'moreInfoStudent',
      readOnly: false,
      type: 'textarea',
      value: classByIdEdit?.moreInfoStudent || '<b>Nhập thông tin tại đây ...</b>',
      canUpdate: true,
    },
  ];

  return (
    <main className="relative min-h-full">
      <HeaderContent path="Class" title="Quản lý lớp" />
      <div className="p-3 ">
        <h2 className="font-medium text-base">Quản lý cấu hình lớp</h2>
        <div className="mt-2">
          <button onClick={() => setShowSubject(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
            Danh sách môn học
          </button>
          <button onClick={() => setShowEduLevel(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
            Danh sách cấp học
          </button>
          <button onClick={() => setShowLocation(true)} className="mr-2 px-3 py-2 text-white rounded-2xl bg-[var(--primary-color)] cursor-pointer">
            Danh sách khu vực hiện tại
          </button>
        </div>
      </div>
      {showSubject ? <SubjectComponent onCancel={() => setShowSubject(false)} /> : <></>}
      {showEduLevel ? <EduLevelComponent onCancel={() => setShowEduLevel(false)} /> : <></>}
      {showLocation ? <LocationComponent onCancel={() => setShowLocation(false)} /> : <></>}
      <div className="p-3 min-h-full">
        <h2 className="font-medium">Danh sách, trạng thái các lớp</h2>

        <div className="mt-2 px-3 flex items-center py-[6px] border-[1px] border-[#ccc] rounded-2xl w-fit cursor-pointer hover:bg-[#a27cff63] transition-all" onClick={() => setShowCreate(true)}>
          <span className="mr-1 text-base">Thêm lớp mới</span>
          <FontAwesomeIcon className="text-xs" icon={faPlus} />
        </div>

        <div className={'min-h-full flex-1 mt-3'}>
          {data.length ? (
            <>
              <Table
                columnNotShow={['slug']}
                textColor="black"
                data={data}
                columnDelete={true}
                columnEdit={true}
                handleDelete={(id) => {
                  handleDeleteClass(id, dispatch);
                }}
                handleEdit={(id) => {
                  getClassByIdAndSave(id, dispatch);
                }}
              />
              <Pagination count={total} limit={limit} page={page} setPage={() => {}} />
            </>
          ) : (
            <h2 className="text-center text-xl text-gray-700">Không có dữ liệu phù hợp !!</h2>
          )}
          {showCreate || classByIdEdit ? (
            <PopupEditOrAddV1
              id={classByIdEdit?.id}
              title="Thêm lớp mới"
              minWidth={600}
              data={dataDto}
              onSubmit={(id, data, dispatch) => {
                if (data?.statusClass == classByIdEdit?.statusClass) handleUpdateClass(id, data, dispatch);
                else handleUpdateStatusClass(id, data, dispatch);
              }}
              onCancel={() => {
                setShowCreate(false);
                dispatch(setDataClassById({ data: undefined }));
              }}
              onSubmitCreate={handleCreateClass}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
