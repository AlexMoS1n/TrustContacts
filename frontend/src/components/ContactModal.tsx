import { useState, type FC, useEffect } from "react";
import { instance } from "../api/axios.api";
import styles from "../styles/ContactModal.module.scss";
import type { TContact } from "../types/types";

type TContactModalProps = {
  type: 'post' | 'put';
  setVisibleModal: (visible: boolean) => void;
  id?: string;
  onSuccess: (contact: TContact) => void;
};

const ContactModal: FC<TContactModalProps> = ({ type, setVisibleModal, id, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tags: [] as string[],
    lastInteraction: new Date().toISOString(),
  });

  useEffect(() => {
    if (type === 'put' && id) {
      const fetchContact = async () => {
        try {
          const response = await instance.get(`/contacts/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Ошибка загрузки контакта:', error);
        }
      };
      fetchContact();
    }
  }, [type, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance[type](`/contacts${type === 'put' ? `/${id}` : ''}`, formData);
      onSuccess(response.data);
      setVisibleModal(false);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <button 
          className={styles.close_button} 
          onClick={() => setVisibleModal(false)}
        >
          ×
        </button>
        <h2>{type === 'post' ? 'Создать контакт' : 'Редактировать контакт'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label>Имя:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label>Телефон:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form_group}>
            <label>Теги (через запятую):</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
            />
          </div>
          <button type="submit" className={styles.submit_button}>
            {type === 'post' ? 'Создать' : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;