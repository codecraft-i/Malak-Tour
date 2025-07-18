// lang = 'uz' | 'en' | 'ru',  obj = { title, title_uz, ... }
export function tField(obj, base, lang) {
  const key = `${base}_${lang}`;
  return obj?.[key] || obj?.[base] || '';
}