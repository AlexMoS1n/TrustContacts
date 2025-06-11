export type TUserData = {
  email: string;
  password: string;
}

export type TResponseUserData = {
  email: string;
  id: number;
  token: string;
}

export type TContact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: string[] | null;
  lastInteraction: string;
}