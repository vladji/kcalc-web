import React, { ChangeEvent, FC, useState } from 'react';
import { useUploadImage } from '../../requests/recipes/useUploadImage';
import { useReplaceRecipeImageName } from '../../requests/recipes/useReplaceRecipeImageName';
import { Loader } from '../../../components/shared/Loader';
import { InputButton } from '../shared/InputButton';
import styles from './styles.module.scss';

interface UploadImageProps {
  recipeId?: string;
  originName?: string;
  refetchRecipes?: () => void;
}

export const UploadImage: FC<UploadImageProps> = ({ originName, recipeId, refetchRecipes }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { uploadImage, uploadLoading } = useUploadImage();
  const { replaceImageName, replaceLoading } = useReplaceRecipeImageName();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target?.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const deleteFileName = originName;
      const uploadResult = await uploadImage({ formData, deleteFileName });

      if (recipeId && uploadResult?.data) {
        await replaceImageName({
          recipeId,
          newImageName: uploadResult?.data,
        });
      }
      if (refetchRecipes) refetchRecipes();
    }
  };

  return (
    <>
      {uploadLoading || (replaceLoading && <Loader />)}
      <div className={styles.wrapper}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <InputButton className={styles.uploadButton} text="Upload image" handler={handleUpload} />
      </div>
    </>
  );
};
