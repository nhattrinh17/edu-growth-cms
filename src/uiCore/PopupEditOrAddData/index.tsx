import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch } from '@/lib';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';

const cx = classNames.bind(styles);

export interface ItemAddOrUpdateDto {
  name: string;
  label: string;
  type: string;
  value: string | number;
  readOnly: boolean;
  required?: boolean;
  placeholder?: string;
  dataOption?: {
    text?: string;
    value?: string | number;
  }[];
  canUpdate?: boolean;
}

export interface DataEditDto {
  data: ItemAddOrUpdateDto[];
  onCancel: () => void;
  maxWidth?: number;
  minWidth?: number;
  id?: number;
  title?: string;
  textWarning?: string;
  onSubmit?: (id: number, data: any, dispatch: any) => void;
  onSubmitCreate?: (data: any, dispatch: any) => void;
  handleUploadOneFile?: (file: File) => Promise<string>;
}

export function PopupEditOrAddV1({ id, data, minWidth, maxWidth, onCancel, onSubmit, title, textWarning, handleUploadOneFile, onSubmitCreate }: DataEditDto) {
  const [dataState, setDataState] = useState(data);
  const isUnableBtn = dataState.some((item) => item.canUpdate);
  const editorRef = useRef<any>();

  const dispatch = useAppDispatch();

  const handleOnChangeInputOrSelect = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, col: ItemAddOrUpdateDto) => {
    //   const element = e.target as HTMLOptionElement;
    setDataState((pre) => {
      const dataNew = pre.map((item) => {
        if (item.name === col.name) {
          return {
            ...item,
            value: e.target.value,
          };
        } else {
          return item;
        }
      });
      return dataNew;
    });
  };

  const handleChangeFile = (urlImage: string, col: ItemAddOrUpdateDto) => {
    setDataState((pre) => {
      const dataNew = pre.map((item) => {
        if (item.name === col.name) {
          return {
            ...item,
            value: urlImage,
          };
        } else {
          return item;
        }
      });
      return dataNew;
    });
  };

  return (
    <div onClick={onCancel} className={cx('wrapper')}>
      <form
        className={cx('wrapper__form')}
        onSubmit={(e) => {
          e.preventDefault();
          const dataSend: any = {};
          dataState.forEach((item, index) => {
            if (item.canUpdate) {
              if (item.type !== 'textarea') dataSend[item.name] = item.value;
              else dataSend[item.name] = editorRef.current[item.name].getContent();
            }
          });
          if (id) {
            onSubmit && onSubmit(id, dataSend, dispatch);
          } else {
            onSubmitCreate && onSubmitCreate(dataSend, dispatch);
          }
          onCancel();
        }}>
        <div
          className={cx('group__list')}
          style={{
            minWidth: minWidth || 400,
          }}
          onClick={(e) => e.stopPropagation()}>
          <div className={cx('body__header')}>
            <h1 className={cx('body__header--text', 'flex-1 ')}>{title || 'Cập nhật quá trình giao dịch'}</h1>
            <FontAwesomeIcon className={cx('body__header--icon')} icon={faXmark} onClick={onCancel} />
          </div>
          {textWarning && <p className={cx('wrapper__warning', 'text-center text-red-500 mb-1 text-sm')}>{textWarning}</p>}
          {dataState.map((col, index) => (
            <div key={index} className={cx('group__data')}>
              <label className={cx('group__data--label')}>{col.label}</label>
              {col.type == 'options' ? (
                <select
                  required={col.required}
                  className={cx('group__data--select', { 'group__data--input-readOnly': col.readOnly })}
                  name={col.name}
                  defaultValue={col.value}
                  onChange={(e) => {
                    handleOnChangeInputOrSelect(e, col);
                  }}>
                  {col.dataOption?.map((val, index) => (
                    <option key={index} className={cx('group__data--option')} value={val.value}>
                      {val.text}
                    </option>
                  ))}
                </select>
              ) : col.type == 'image' ? (
                <div className="flex items-center">
                  <input
                    type="file"
                    name={col.name}
                    required={col.required}
                    onChange={async (e) => {
                      if (e.target.files && handleUploadOneFile) {
                        const urlImage = await handleUploadOneFile(e.target.files[0]);
                        if (urlImage) {
                          handleChangeFile(urlImage, col);
                        }
                      }
                    }}
                  />
                  <Image alt="Image demo" src={String(col.value) || '/no-image.jpg'} width={80} height={80} className={cx('image__demo', 'rounded-2xl')} />
                </div>
              ) : col.type == 'textarea' ? (
                <Editor
                  apiKey="luqq3j7fb1fwxw205pen9j2yi2uw2mldo3lwmkb6j4r8w0yt"
                  init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                      { value: 'First.Name', title: 'First Name' },
                      { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                  }}
                  onInit={(_evt, editor) => {
                    editorRef.current = {
                      ...editorRef.current,
                      [col.name]: editor,
                    };
                  }}
                  initialValue={String(col.value)}
                />
              ) : (
                <input
                  value={col.value ?? ''}
                  name={col.name}
                  type={col.type}
                  required={col.required}
                  readOnly={col.readOnly}
                  placeholder={col.placeholder}
                  className={cx('group__data--input', { 'group__data--input-readOnly': col.readOnly })}
                  onChange={(e) => {
                    handleOnChangeInputOrSelect(e, col);
                  }}
                />
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isUnableBtn}
              className={cx('submit-btn', 'rounded-xl disabled:cursor-not-allowed disabled:bg-zinc-500')}
              onSubmit={(e) => {
                // e.preventDefault();
              }}>
              Xác nhận
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
