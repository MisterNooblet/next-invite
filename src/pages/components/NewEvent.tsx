import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const NewEvent = () => {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (e.target.value.length > 3) {
      const response = await axios.post('/api/places', {
        address: e.target.value,
      });
      setPredictions(response.data);
    } else {
      setPredictions([]);
    }
  };

  const handleGenerate = async () => {
    setDisabledButton(true);
    const response = await axios.post('/api/description', {
      name: name,
    });
    setDescription(response.data.description);
  };

  const handleNameChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length > 3) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const handlePredictionSelect = (prediction: { description: React.SetStateAction<string> }) => {
    setAddress(prediction.description);
    setPredictions([]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { date, location } = event.currentTarget;
    const body = {
      name: name,
      description: description,
      date: date.value,
      location: location.value,
    };
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      router.reload();
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Name</label>
      <input type="text" name="title" id="title" value={name} onChange={handleNameChage} />
      <button type="button" disabled={disabledButton} onClick={handleGenerate}>
        Generate Description
      </button>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <label htmlFor="date">Date</label>
      <input type="date" name="date" id="date" />
      <label htmlFor="location">Location</label>
      <input type="text" name="location" id="location" value={address} onChange={handleAddressChange} />
      {predictions.length > 0 && (
        <ul>
          {predictions.map((prediction: { description: any; place_id: any }) => (
            <li key={prediction.place_id} onClick={() => handlePredictionSelect(prediction)}>
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
      <button type="submit">Create Event</button>
    </form>
  );
};

export default NewEvent;
