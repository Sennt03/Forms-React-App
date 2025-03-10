import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const useFetchOne = (formId) => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('id', formId)
        .single();

      if (error) {
        setError(error);
      } else {
        setForm(data);
      }

      setLoading(false);
    };

    if (formId) {
      fetchForm();
    }
  }, [formId]);

  return { form, loading, error };
};

export default useFetchOne;
