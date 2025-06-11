import { useState, type FC, useEffect } from "react";
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Form, useLoaderData } from "react-router-dom";
import ContactModal from "../components/ContactModal";
import type { TContact } from "../types/types";
import { formatDate } from "./middlewares/middlewares";
import { instance } from "../api/axios.api";
import styles from "../styles/Contacts.module.scss";

const Contacts: FC = () => {
  const initialContacts = useLoaderData() as TContact[];
  const [contacts, setContacts] = useState<TContact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isVisibleCreateModal, setIsVisibleCreateModal] = useState<boolean>(false);
  const [isVisibleEditModal, setIsVisibleEditModal] = useState<boolean>(false);
  const [contactId, setContactId] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const fetchContacts = async () => {
    try {
      const response = await instance.get('/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Ошибка загрузки контактов:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setContacts(initialContacts);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await instance.get(`/contacts/search`, {
        params: { name: searchTerm }
      });
      
      setContacts(response.data);
    } catch (error) {
      console.error('Ошибка поиска:', error);
      setContacts(initialContacts);
    } finally {
      setIsSearching(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    fetchContacts();
    setIsSearching(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        resetSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список контактов</h1>
      <div className={styles.search_container}>
        <div className={styles.search_input_container}>
          <input
            type="text"
            className={styles.search_input}
            placeholder="Поиск по имени"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className={styles.search_clear}
              onClick={resetSearch}
            >
              ×
            </button>
          )}
        </div>
        <button
          className={styles.search_button}
          onClick={handleSearch}
          disabled={isSearching}
        >
          <FaSearch />
          {isSearching ? 'Поиск...' : 'Найти'}
        </button>
      </div>

      {isSearching && <div className={styles.search_status}>Идёт поиск...</div>}
      {!isSearching && searchTerm && contacts.length === 0 && (
        <div className={styles.no_results}>
          Контакты не найдены. <button className={styles.show_all_button} onClick={resetSearch}>Показать все</button>
        </div>
      )}
      
      <div className={styles.grid}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.card}>
            <div className={styles.field}><strong>Имя:</strong> {contact.name}</div>
            <div className={styles.field}><strong>Телефон:</strong> {contact.phone}</div>
            <div className={styles.field}><strong>Email:</strong> {contact.email}</div>
            <div className={styles.field}><strong>Теги:</strong> {contact.tags?.join(', ') || '—'}</div>
            <div className={styles.field}><strong>Изменён:</strong> {formatDate(contact.lastInteraction)}</div>
            <div className={styles.actions}>
              <button
                onClick={() => {
                  setContactId(contact.id);
                  setIsVisibleEditModal(true);
                }}
                className={styles.edit_button}
              >
                <AiFillEdit />
                Редактировать
              </button>
              <Form 
                method="delete" 
                action="/contacts"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await instance.delete(`/contacts/${contact.id}`);
                    setContacts(contacts.filter(c => c.id !== contact.id));
                  } catch (error) {
                    console.error('Ошибка удаления:', error);
                  }
                }}
              >
                <input type="hidden" value={contact.id} name="id" />
                <button
                  type="submit"
                  className={styles.delete_button}
                >
                  <AiFillCloseCircle />
                  Удалить
                </button>
              </Form>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsVisibleCreateModal(true)}
        className={styles.add_button}
      >
        <FaPlus />
        Создать новый контакт
      </button>

      {isVisibleCreateModal && (
        <ContactModal 
          type="post" 
          setVisibleModal={setIsVisibleCreateModal}
          onSuccess={(newContact) => setContacts([...contacts, newContact])}
        />
      )}
      {isVisibleEditModal && (
        <ContactModal 
          type="put" 
          setVisibleModal={setIsVisibleEditModal} 
          id={contactId}
          onSuccess={(updatedContact) => {
            setContacts(contacts.map(contact => 
              contact.id === updatedContact.id ? updatedContact : contact
            ));
          }}
        />
      )}
    </div>
  );
};

export default Contacts;