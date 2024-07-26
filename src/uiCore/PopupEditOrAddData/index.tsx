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
  maxWidth?: number | string;
  minWidth?: number | string;
  id?: number;
  title?: string;
  textWarning?: string;
  onSubmit?: (id: number, data: any, dispatch: any) => void;
  onSubmitCreate?: (data: any, dispatch: any) => void;
  handleUpLoadFiles?: (file: FileList) => Promise<string[]>;
  position?: any;
}

class CustomFileList extends Array<File> {
  constructor(...files: File[]) {
    super(...files);
    Object.setPrototypeOf(this, CustomFileList.prototype);
  }

  item(index: number): File {
    return this[index];
  }
}

export function PopupEditOrAddV1({
  //
  id,
  data,
  minWidth,
  maxWidth,
  onCancel,
  onSubmit,
  title,
  textWarning,
  handleUpLoadFiles,
  onSubmitCreate,
  position = 'absolute',
}: DataEditDto) {
  const [dataState, setDataState] = useState(data);
  // console.log('🚀 ~ dataState:', dataState);
  const isUnableBtn = dataState.some((item) => item.canUpdate);
  const editorRef = useRef<any>();

  const dispatch = useAppDispatch();

  const handleOnChangeInputOrSelect = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, col: ItemAddOrUpdateDto) => {
    //   const element = e.target as HTMLOptionElement;
    setDataState((pre) => {
      const dataNew = pre.map((item) => {
        if (item.name === col.name) {
          if (col.type == 'checkbox') {
            const elementCheckbox: any = e.target;
            return {
              ...item,
              value: elementCheckbox.checked,
            };
          }
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

  const handleChangeFile = (urlImage: string[], col: ItemAddOrUpdateDto, deleteImage = false) => {
    setDataState((pre) => {
      const dataNew = pre.map((item) => {
        if (item.name === col.name) {
          let newImages = item.value ? item.value.toString().split('*_*') : [];
          // console.log('🚀 ~ dataNew ~ newImages:', item.value, newImages);
          if (!deleteImage) {
            newImages.push(...urlImage);
          } else {
            newImages = [...newImages].filter((item) => !urlImage.includes(item));
          }
          // console.log('🚀 ~ dataNew ~ newImages:', newImages);
          return {
            ...item,
            value: newImages.join('*_*'),
          };
        } else {
          return item;
        }
      });
      return dataNew;
    });
  };

  // Editor
  const handleUploadImg = async (blobInfo: any, progress: any): Promise<string> => {
    const blob = blobInfo.blob();
    const file = new File([blob], blobInfo.filename(), { type: blob.type });
    const fileList = new CustomFileList(file);
    const uploadImg: string[] = handleUpLoadFiles ? await handleUpLoadFiles(fileList) : [];
    return uploadImg[0];
  };

  return (
    <div
      onClick={onCancel}
      className={cx('wrapper')}
      style={{
        position: position || 'absolute',
      }}>
      <form
        className={cx('wrapper__form', 'shadow-sm')}
        style={{
          minWidth: minWidth || 400,
          maxWidth: maxWidth || 'auto',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const dataSend: any = {};
          dataState.forEach((item, index) => {
            if (item.canUpdate) {
              if (item.type !== 'editor') dataSend[item.name] = item.value;
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
        <div className={cx('group__list')} onClick={(e) => e.stopPropagation()}>
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
              ) : col.type == 'images' || col.type == 'image' ? (
                <div className="">
                  <input
                    type="file"
                    name={col.name}
                    required={col.required}
                    multiple
                    onChange={async (e) => {
                      if (e.target.files && handleUpLoadFiles) {
                        const urlImage = await handleUpLoadFiles(e.target.files);
                        if (urlImage.length) {
                          handleChangeFile(urlImage, col);
                        }
                      }
                    }}
                  />
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {col.value
                      .toString()
                      .split('*_*')
                      .map((img, index) => (
                        <div key={index} className="w-full relative">
                          <div
                            className={cx('absolute top-2 right-2 rounded-full bg-white w-6 h-6 text-center shadow-lg cursor-pointer', {
                              hidden: !img,
                            })}
                            onClick={() => handleChangeFile([img], col, true)}>
                            <FontAwesomeIcon icon={faXmark} className=" text-base" />
                          </div>
                          <Image
                            //
                            key={index}
                            alt="Image demo"
                            src={String(img) || '/no-image.jpg'}
                            width={350}
                            height={250}
                            className={cx('image__demo', 'rounded-2xl')}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ) : col.type == 'editor' ? (
                <Editor
                  apiKey="luqq3j7fb1fwxw205pen9j2yi2uw2mldo3lwmkb6j4r8w0yt"
                  init={{
                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'],
                    // plugins: ['a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'],
                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' + 'alignleft aligncenter alignright alignjustify | ' + 'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                    images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',

                    automatic_uploads: true,
                    images_upload_handler: handleUploadImg,

                    menubar: true,
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    // mergetags_list: [
                    //   { value: 'First.Name', title: 'First Name' },
                    //   { value: 'Email', title: 'Email' },
                    // ],
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
              ) : col.type == 'textarea' ? (
                <textarea
                  value={col.value ?? ''}
                  name={col.name}
                  required={col.required}
                  readOnly={col.readOnly}
                  placeholder={col.placeholder}
                  className={cx('group__data--input', 'min-h-[140px]', { 'group__data--input-readOnly': col.readOnly })}
                  onChange={(e) => {
                    handleOnChangeInputOrSelect(e, col);
                  }}
                />
              ) : (
                <input
                  value={col.value ?? ''}
                  name={col.name}
                  type={col.type}
                  required={col.required}
                  readOnly={col.readOnly}
                  defaultChecked={Boolean(col.value)}
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
