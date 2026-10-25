import { PHONES } from "../data/phones";
import { Phone } from "../types";

export const API_URL = "https://6adda8934e88f1bba4a4890b.mockapi.io/phone/phones";

export async function fetchPhone(id: string): Promise<Phone> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Máy chủ trả về lỗi: ${res.status}`);
  }
  return (await res.json()) as Phone;
}