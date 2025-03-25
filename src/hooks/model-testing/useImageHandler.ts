
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export function useImageHandler() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const initializeStorageBucket = async () => {
    try {
      console.log("Initializing storage bucket");
      const { data, error } = await supabase.functions.invoke('create-storage-buckets');
      
      if (error) {
        console.error('Error initializing storage bucket:', error);
      }
      
      return !error;
    } catch (error) {
      console.error('Failed to initialize storage bucket:', error);
      return false;
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Image change event triggered", e.target.files);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size too large (max 5MB)');
        return;
      }
      
      console.log("Setting image file:", file.name, file.type, file.size);
      setImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image preview created");
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected, clearing image and preview");
      setImage(null);
      setImagePreview(null);
    }
  };
  
  const uploadImage = async (file: File): Promise<string> => {
    console.log("Processing image upload...");
    let uploadedImageUrl = '';
    
    const bucketInitialized = await initializeStorageBucket();
    
    if (bucketInitialized && file) {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;
      const filePath = `violation_images/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('violations')
        .upload(filePath, file);
      
      if (uploadError) {
        console.error('Image upload error:', uploadError);
        toast.error('Image upload failed', {
          description: 'Using local image for analysis instead.'
        });
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('violations')
          .getPublicUrl(filePath);
          
        uploadedImageUrl = publicUrl;
        console.log("Image uploaded successfully");
      }
    }
    
    return uploadedImageUrl;
  };
  
  const resetImage = () => {
    setImage(null);
    setImagePreview(null);
  };
  
  return {
    image,
    imagePreview,
    handleImageChange,
    uploadImage,
    resetImage
  };
}
