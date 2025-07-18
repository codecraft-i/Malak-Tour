// ---------------- src/utils/useAxios.js ----------------
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function useAxios() {
  const { lang } = useParams();          // /:lang/… dan joriy til
  return axios.create({
    baseURL: 'https://malaktour.uz/api',
    params: { lang },                    // har bir so‘rovga ?lang=…
  });
}