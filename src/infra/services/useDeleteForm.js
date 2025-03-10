import { useState } from 'react';
import { supabase } from '../supabaseClient';

const useDeleteForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteForm = async (formId) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('forms')
        .delete()
        .eq('id', formId);

      if (error) {
        throw error;
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteForm, loading, error };
};

export default useDeleteForm;
