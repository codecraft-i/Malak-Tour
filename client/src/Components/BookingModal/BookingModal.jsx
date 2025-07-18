import { useState } from 'react';
import axios from 'axios';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const API = 'https://malaktour.uz/api';

export default function BookingModal({ tourId, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/bookings/`, { ...form, tour: tourId });

      /* === MUVAFFAQIYATLI yuborildi === */
      toast.success('Arizangiz muvaffaqiyatli yuborildi! 🎉');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Xatolik! Qayta urinib ko‘ring.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-window"
        onClick={(e) => e.stopPropagation()} // modal ichini bosganda yopilmasin
      >
        <button className="modal-close" onClick={onClose}>
          <FiX size={24} />
        </button>

        <h3 className="modal-title">Оставить заявку</h3>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Ваше имя"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="phone"
            type="tel"
            required
            placeholder="Телефон *"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="city"
            rows="3"
            placeholder="Город / область"
            value={form.city}
            onChange={handleChange}
          />

          <button type="submit" className="modal-submit" disabled={sending}>
            {sending ? 'Yuborilmoqda…' : 'Отправить'}
          </button>
        </form>

        <p className="modal-note">
          Ознакомлен с пользовательским<br />соглашением
        </p>
      </div>
    </div>
  );
}