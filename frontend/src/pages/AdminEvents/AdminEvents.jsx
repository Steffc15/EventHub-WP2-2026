import React, { useEffect, useState } from 'react';
import './AdminEvents.css';
import { toast } from 'react-toastify';

const emptyForm = {
  title: '',
  category: '',
  location: '',
  eventDate: '',
  availableSeats: '',
  price: '',
  image: '/logo192.png',
  description: '',
};

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadEvents = () => {
    fetch('http://localhost:8080/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(() => toast.error('Could not load events'));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      ...form,
      availableSeats: Number(form.availableSeats),
      price: Number(form.price),
    };

    const url = editingId
      ? `http://localhost:8080/api/events/${editingId}`
      : 'http://localhost:8080/api/events';

    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        toast.error('Could not save event');
        return;
      }

      toast.success(
        editingId ? 'Event updated successfully' : 'Event added successfully'
      );

      resetForm();
      loadEvents();
    } catch (error) {
      console.error(error);
      toast.error('Server error');
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);

    setForm({
      title: event.title || '',
      category: event.category || '',
      location: event.location || '',
      eventDate: event.eventDate || '',
      availableSeats: event.availableSeats || '',
      price: event.price || '',
      image: event.image || '/logo192.png',
      description: event.description || '',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        toast.error('Could not delete event');
        return;
      }

      toast.success('Event successfully deleted!');
      loadEvents();
    } catch (error) {
      console.error(error);
      toast.error('Server error');
    }
  };

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="delete-toast">
          <p>Are you sure you want to delete this event?</p>

          <div className="delete-toast-actions">
            <button
              className="toast-confirm-btn"
              onClick={() => {
                deleteEvent(id);
                closeToast();
              }}
            >
              Yes
            </button>

            <button className="toast-cancel-btn" onClick={closeToast}>
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Admin Event Management</h1>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Event title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Art">Art</option>
            <option value="Fun">Fun</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            name="eventDate"
            type="date"
            value={form.eventDate}
            onChange={handleChange}
            required
          />

          <input
            name="availableSeats"
            type="number"
            placeholder="Available seats"
            value={form.availableSeats}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="Image path"
            value={form.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="admin-form-actions">
            <button type="submit">
              {editingId ? 'Update Event' : 'Add Event'}
            </button>

            {editingId && (
              <button type="button" className="cancel-edit" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="admin-list">
          {events.map((event) => (
            <div className="admin-card" key={event.id}>
              <img src={event.image || '/logo192.png'} alt={event.title} />

              <div className="admin-info">
                <h3>{event.title}</h3>
                <p>{event.category}</p>
                <p>{event.location}</p>
                <p>{event.eventDate}</p>
                <p>Seats: {event.availableSeats}</p>
                <p>Price: ${event.price}</p>
              </div>

              <div className="admin-actions">
                <button onClick={() => handleEdit(event)}>Edit</button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;