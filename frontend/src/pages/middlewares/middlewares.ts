import { instance } from "../../api/axios.api";
import type { TContact } from "../../types/types";
import { redirect } from "react-router-dom";

export const contactsAction = async ({ request }: any) => {
  try {
    switch (request.method) {
      case "POST": {
        const formData = await request.formData();
        const contact = {
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          tags: formData.get('tags')?.split(",").map((t: string) => t.trim()).filter(Boolean) || [],
        };
        await instance.post('/contacts', contact);
        return redirect('/contacts');
      }
      case "PUT": {
        const formData = await request.formData();
        const contact = {
          id: formData.get('id'),
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          tags: formData.get('tags')?.split(",").map((t: string) => t.trim()).filter(Boolean) || [],
        };
        await instance.put(`/contacts/${contact.id}`, contact);
        return redirect('/contacts');
      }
      case "DELETE": {
        const formData = await request.formData();
        const contactId = formData.get('id');
        await instance.delete(`/contacts/${contactId}`);
        return redirect('/contacts');
      }
      default:
        throw new Error(`Unsupported method: ${request.method}`);
    }
  } catch (error) {
    console.error('Error in contactsAction:', error);
    throw error;
  }
};

export const contactsLoader = async () => {
  try {
    const { data } = await instance.get<TContact[]>('/contacts');
    return data;
  } catch (error) {
    console.error('Error in contactsLoader:', error);
    throw error;
  }
};

export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
