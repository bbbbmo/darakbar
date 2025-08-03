export const setImagePreview = (file: File) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    console.log(reader.result);
  };
  reader.readAsDataURL(file);
};
