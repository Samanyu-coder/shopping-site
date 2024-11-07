import React, { useState, useEffect } from 'react';
import '../styles/ProfileSettings.css';

const baseURL = 'https://62be-2405-201-8006-7041-5082-8df6-3712-a11f.ngrok-free.app';
const userId = 6; // Set user ID to 3

const ProfileSettings = () => {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pin_code: '',
    date_of_birth: '',
  });
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${baseURL}/user/profile/${userId}/`);
        const data = await response.json();
        setUser(data);
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          pin_code: data.pin_code,
          date_of_birth: data.date_of_birth,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async () => {
    setLoadingSave(true);
    try {
      await fetch(`${baseURL}/user/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId, ...formData }), // Use userId here
      });
      alert('Changes saved successfully!');
      setEditingField(null);
    } catch (error) {
      alert(`Error saving changes: ${error.message}`);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      setLoadingDelete(true);
      try {
        await fetch(`${baseURL}/user/delete/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId }), // Use userId here
        });
        setUser(null);
        alert('Account deleted successfully!');
      } catch (error) {
        alert(`Error deleting account: ${error.message}`);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  return (
    <div className="profile-page">
      <h1 className="user-profile">User Profile</h1>
      <div className="profile-content">
        {/* Editable fields for each piece of user data */}
        <div className="profile-field">
          <label>First Name:</label>
          {editingField === 'first_name' ? (
            <input name="first_name" value={formData.first_name} onChange={handleChange} />
          ) : (
            <span>{formData.first_name}</span>
          )}
          <button onClick={() => handleEdit('first_name')}>Edit</button>
        </div>

        <div className="profile-field">
          <label>Last Name:</label>
          {editingField === 'last_name' ? (
            <input name="last_name" value={formData.last_name} onChange={handleChange} />
          ) : (
            <span>{formData.last_name}</span>
          )}
          <button onClick={() => handleEdit('last_name')}>Edit</button>
        </div>

        <div className="profile-field">
          <label>Email:</label>
          {editingField === 'email' ? (
            <input name="email" value={formData.email} onChange={handleChange} />
          ) : (
            <span>{formData.email}</span>
          )}
          <button onClick={() => handleEdit('email')}>Edit</button>
        </div>

        <div className="profile-field">
          <label>Phone:</label>
          {editingField === 'phone' ? (
            <input name="phone" value={formData.phone} onChange={handleChange} />
          ) : (
            <span>{formData.phone}</span>
          )}
          <button onClick={() => handleEdit('phone')}>Edit</button>
        </div>

        <div className="profile-field">
          <label>Address:</label>
          {editingField === 'address' ? (
            <input name="address" value={formData.address} onChange={handleChange} />
          ) : (
            <span>{formData.address}</span>
          )}
          <button onClick={() => handleEdit('address')}>Edit</button>
        </div>

        <div className="profile-field">
          <label>City:</label>
          {editingField === 'city' ? (
            <input name="city" value={formData.city} onChange={handleChange} />
          ) : (
            <span>{formData.city}</span>
          )}
          <button onClick={() => handleEdit('city')}>Edit</button>
        </div>

        <div className="profile-field">
          <label>State:</label>
          {editingField === 'state' ? (
            <input name="state" value={formData.state} onChange={handleChange} />
          ) : (
            <span>{formData.state}</span>
          )}
          <button onClick={() => handleEdit('state')}>Edit</button>
        </div>

        <div className="profile-field">
          <label>Country:</label>
          {editingField === 'country' ? (
            <input name="country" value={formData.country} onChange={handleChange} />
          ) : (
            <span>{formData.country}</span>
          )}
          <button onClick={() => handleEdit('country')}>Edit</button>
        </div>

        <div className="profile-field">
          <label>Pin Code:</label>
          {editingField === 'pin_code' ? (
            <input name="pin_code" value={formData.pin_code} onChange={handleChange} />
          ) : (
            <span>{formData.pin_code}</span>
          )}
          <button onClick={() => handleEdit('pin_code')}>Edit</button>
        </div>

        <div className="profile-field">
          <label>Date of Birth:</label>
          {editingField === 'date_of_birth' ? (
            <input name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
          ) : (
            <span>{formData.date_of_birth}</span>
          )}
          <button onClick={() => handleEdit('date_of_birth')}>Edit</button>
        </div>

        {editingField && (
          <button className="edit-save-btn" onClick={handleSave} disabled={loadingSave}>
            {loadingSave ? 'Saving...' : 'Save Changes'}
          </button>
        )}

        <button className="delete-account" onClick={handleDeleteAccount} disabled={loadingDelete}>
          {loadingDelete ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
