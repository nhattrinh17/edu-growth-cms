'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Table from '@/uiCore/Table';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { handleCreateLocation, handleUpdateLocation, useLocation } from '@/utils/handleLocation';
const cx = classNames.bind(styles);

export function LocationComponent({ onCancel }: { onCancel: () => void }): JSX.Element {
  const [isCreate, setIsCreate] = useState(false);
  const { data } = useLocation();
  const [idEdit, setIdEdit] = useState<number>();

  const subjectById = data.find((i) => i.id == idEdit);
  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Tên tỉnh',
      name: 'province',
      type: 'text',
      readOnly: false,
      value: subjectById?.province || '',
      canUpdate: true,
      placeholder: 'Enter name...',
      required: true,
    },
    {
      label: 'Tên quận(huyện)',
      name: 'district',
      type: 'text',
      readOnly: false,
      value: subjectById?.district || '',
      canUpdate: true,
      placeholder: 'Enter desc...',
      required: true,
    },
  ];

  return (
    <div className={cx('wrapper')}>
      <div>
        <div className="flex justify-between">
          <h2 className="font-medium">Quản lý địa điểm chung</h2>
          <FontAwesomeIcon className="text-xl cursor-pointer" icon={faXmark} onClick={onCancel} />
        </div>
        <div className="mt-2 px-3 py-[6px] border-[1px] rounded-2xl w-fit cursor-pointer hover:bg-[#a27cff63] transition-all" onClick={() => setIsCreate(true)}>
          <span className="mr-1 text-base">Thêm địa điểm chung</span>
          <FontAwesomeIcon className="text-xs" icon={faPlus} onClick={() => {}} />
        </div>

        <div className={cx('min-h-full flex-1')}>
          {data.length ? (
            <Table
              columnNotShow={['slug']}
              textColor="black"
              data={data}
              columnDelete={false}
              columnEdit={true}
              // handleDelete={(id) => {
              //   handleDeleteBankPayment(idPayment, id, dispatch);
              // }}
              handleEdit={(id) => {
                setIdEdit(id);
              }}
            />
          ) : (
            <h2 className="text-center text-xl text-gray-700">Không có dữ liệu phù hợp !!</h2>
          )}
        </div>

        {(idEdit || isCreate) && (
          <PopupEditOrAddV1
            title={isCreate ? 'Thêm mới địa điểm chung' : 'Cập nhật thông tin'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
              setIsCreate(false);
            }}
            id={idEdit}
            onSubmitCreate={handleCreateLocation}
            onSubmit={handleUpdateLocation}
          />
        )}
      </div>
    </div>
  );
}
