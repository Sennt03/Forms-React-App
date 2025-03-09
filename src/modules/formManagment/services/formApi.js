import axiosInstance from "../../../infra/api/axiosInstance";

export const saveForm = async (formData) => {
  return await axiosInstance.post("/forms", formData);
};

export const getForm = async (id) => {
  return await axiosInstance.get(`/forms/${id}`);
};
