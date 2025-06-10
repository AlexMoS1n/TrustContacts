import type { FC } from "react";
import { Form } from "react-router-dom";

interface IPropsContactModal {
  type: 'post' | 'put';
  setVisibleModal: (visible: boolean) => void; 
}

const ContactModal: FC<IPropsContactModal> = ({ type, setVisibleModal }) => {
  return <div>
    <Form
      action="/contacts"
      method={type}
      onSubmit={() => setVisibleModal(false)}
    >
      <label htmlFor="name">
        <small>Название контакта</small>
        <input type="text" name="name" placeholder="Имя" />
      </label>
      <label htmlFor="phone">
        <small>Телефон</small>
        <input type="text" name="phone" placeholder="+79123456789" />
      </label>
      <label htmlFor="email">
        <small>Email</small>
        <input type="text" name="email" placeholder="Email" />
      </label>
        <label htmlFor="tags">
        <small>Теги</small>
        <input type="text" name="tags" placeholder="тег1,тег2" />
      </label>
      <div>
        <button type="submit">
          { type === 'put' ? 'Сохранить' : 'Создать'  } 
        </button>  
        <button type="button" onClick={() => {setVisibleModal(false)}}>Закрыть</button>
      </div>
    </Form>
  </div>
}

export default ContactModal