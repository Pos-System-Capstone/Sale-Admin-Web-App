import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { storage } from 'config';

// export const uploadfile = (fileData) =>
//   request.post(`/files`, fileData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   });
// eslint-disable-next-line react-hooks/rules-of-hooks
export const uploadfile = (acceptedFiles) => {
  console.log('acceptedFiles', acceptedFiles.values);
  const file = acceptedFiles[0];
  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      // update progress
      // setPercent(percent);
    },
    (err) => {
      console.log(`err`, err);
    },
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        return url;
      });
    }
  );
};
