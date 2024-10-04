import React, { useState } from 'react';
import axios from 'axios';

export default function AddContest() {
  const [formData, setFormData] = useState({
    platform: '',
    name: '',
    start: '',
    end: '',
    url: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/addcontest', formData);
      alert('Contest added successfully!');
      setFormData({
        platform: '',
        name: '',
        start: '',
        end: '',
        url: '',
      });
    } catch (error) {
      console.error('Error adding contest:', error);
      alert('Error adding contest. Please try again.');
    }
  };

  return (
    <div className="wrapper mx-auto" style={{ marginTop: '130px' }}>
      <div className="title">Add Contest</div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
            required
          />
          <label>Platform</label>
        </div>
        <div className="field">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <label>Contest Name</label>
        </div>
        <div className="field mt-4">
          <input
            type="text"
            name="start"
            value={formData.start}
            onChange={handleInputChange}
            required
          />
          <label>Start Date & Time <br/><span style={{fontSize:"10px", margin:"0px", padding:"0px"}}>(Format : YYYY-MM-DD<b>T</b>HH:MM:SS<b>Z</b>)</span></label>
        </div>
        <div className="field mt-4">
          <input
            type="text"
            name="end"
            value={formData.end}
            onChange={handleInputChange}
            required
          />
          <label>End Date & Time <br/><span style={{fontSize:"10px", margin:"0px", padding:"0px"}}>(Format : YYYY-MM-DD<b>T</b>HH:MM:SS<b>Z</b>)</span></label>
        </div>
        <div className="field">
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            required
          />
          <label>URL</label>
        </div>
        <div className="field mt-4">
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
}