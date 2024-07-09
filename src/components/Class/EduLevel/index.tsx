'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Table from '@/uiCore/Table';
import { ItemAddOrUpdateDto, PopupEditOrAddV1 } from '@/uiCore';
import { handleCreateEduLevel, handleUpdateEduLevel, useEduLevel } from '@/utils/handleEduLevel';

const cx = classNames.bind(styles);

export function EduLevelComponent({ onCancel }: { onCancel: () => void }): JSX.Element {
  const [isCreate, setIsCreate] = useState(false);
  const { data } = useEduLevel();
  const [idEdit, setIdEdit] = useState<number>();

  const subjectById = data.find((i) => i.id == idEdit);
  const dataDto: ItemAddOrUpdateDto[] = [
    {
      label: 'Tên cấp học',
      name: 'name',
      type: 'text',
      readOnly: false,
      value: subjectById?.name || '',
      canUpdate: true,
      placeholder: 'Enter name...',
    },
    {
      label: 'Mô tả(optional)',
      name: 'description',
      type: 'text',
      readOnly: false,
      value: subjectById?.description || '',
      canUpdate: true,
      placeholder: 'Enter desc...',
    },
  ];

  return (
    <div className={cx('wrapper')}>
      <div>
        <div className="flex justify-between">
          <h2 className="font-medium">Quản lý cấp học</h2>
          <FontAwesomeIcon className="text-xl cursor-pointer" icon={faXmark} onClick={onCancel} />
        </div>
        <div className="mt-2 px-3 py-[6px] border-[1px] rounded-2xl w-fit cursor-pointer hover:bg-[#a27cff63] transition-all" onClick={() => setIsCreate(true)}>
          <span className="mr-1 text-base">Thêm cấp học</span>
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
            title={isCreate ? 'Thêm mới cấp học' : 'Cập nhật thông tin'}
            data={dataDto}
            onCancel={() => {
              setIdEdit(0);
              setIsCreate(false);
            }}
            id={idEdit}
            onSubmitCreate={handleCreateEduLevel}
            onSubmit={handleUpdateEduLevel}
          />
        )}
      </div>
    </div>
  );
}
