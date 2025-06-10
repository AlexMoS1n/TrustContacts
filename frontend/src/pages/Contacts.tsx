import { useState, type FC } from "react";
import {AiFillEdit, AiFillCloseCircle} from 'react-icons/ai' 
import {FaPlus} from 'react-icons/fa'
import { Form } from "react-router-dom";
import ContactModal from "../components/ContactModal";
import { instance } from "../api/axios.api";

export const contactsAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const contact = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        tags: formData.get('tags').split(","),
      }
      await instance.post('/contacts', contact);
      return null;
    }
    case "PUT": {
      return null;
    }
    case "DELETE": {
      return null;
    }
      
  }
}

const Contacts: FC = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false); 
  return (
    <>
      <div>
        <h1>Список контактов</h1>
        <div>
          <div>
            <div>
              <button>
                <AiFillEdit />
              </button>
              <Form
                method="delete"
                action="/contacts"
              >
                <input type="hidden" value={'Contact ID'} />
                <button type="submit">
                  <AiFillCloseCircle />
                </button>
              </Form>
            </div>
          </div>
        </div>
        <button onClick={() => (setIsVisibleModal(true))}>
          <FaPlus />
          <span>Создать новый контакт</span>
        </button>
      </div>
      {isVisibleModal && (
        <ContactModal type="post" setVisibleModal={setIsVisibleModal} />
      )}
    </>
  )
}

export default Contacts