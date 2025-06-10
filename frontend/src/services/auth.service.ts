import { instance } from "../api/axios.api";
import type { TResponseUserData, TUserData } from "../types/types";

export const AuthService = {
  async registration(userData: TUserData): Promise<TResponseUserData | undefined> {
    const {data} = await instance.post<TResponseUserData>('users', userData);
    return data
  },
  async login(userData: TUserData): Promise<TResponseUserData  | undefined> {
    const {data} = await instance.post<TResponseUserData >('auth/login', userData);
    return data
  },
  async getProfile(): Promise<TResponseUserData  | undefined> {
    const {data} = await instance.get<TResponseUserData>('auth/profile');
    if(data) return data
  },
};

