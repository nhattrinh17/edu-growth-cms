import { BaseAxios } from '@/lib';

export const upLoadFiles = async (folder: string, files: FileList, uploadOneImage = false) => {
  const axios = new BaseAxios();
  const formData = new FormData();
  if (uploadOneImage) {
    formData.append('files', files[0]);
  } else {
    Array.from(files).forEach((file) => {
      formData.append('files', file); // 'files' là tên trường trong FormData
    });
  }
  const res = await axios.post(`/upload/image?folder=${folder}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (res) {
    return res?.data?.data;
  } else {
    return '';
  }
};
