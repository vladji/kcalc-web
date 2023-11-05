import React, { ChangeEvent, FC, useState } from 'react';
import { useUploadImage } from '../../requests/recipes/useUploadImage';
import { useReplaceRecipeImageName } from '../../requests/recipes/useReplaceRecipeImageName';
import { Loader } from '../../../components/shared/Loader';
import { InputButton } from '../shared/InputButton';
import { ResponseCustom } from '../../requests/types';
import { RecipeProps } from '../../types/recipes';
import styles from './styles.module.scss';

interface UploadImageProps {
  refetchRecipes: () => Promise<ResponseCustom<RecipeProps[]> | unknown>;
  fetchImage: (filename: string) => Promise<void>;
  recipeId?: string;
  originName?: string;
}

export const UploadImage: FC<UploadImageProps> = ({
  refetchRecipes,
  fetchImage,
  originName,
  recipeId,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { uploadImage } = useUploadImage();
  const { replaceImageName } = useReplaceRecipeImageName();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target?.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', selectedFile);

      const uploadResult = await uploadImage({ formData, deleteFileName: originName });

      if (recipeId && uploadResult?.data) {
        await replaceImageName({
          recipeId,
          newImageName: uploadResult?.data,
        });
      }

      if (uploadResult?.data) {
        await refetchRecipes();
        await fetchImage(uploadResult.data);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.wrapper}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <InputButton className={styles.uploadButton} text="Upload image" handler={handleUpload} />
      </div>
    </>
  );
};
