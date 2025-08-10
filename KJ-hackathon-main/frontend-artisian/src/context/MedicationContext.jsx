import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the MedicationContext
const MedicationContext = createContext();

// Custom hook to use the MedicationContext
export const useMedication = () => useContext(MedicationContext);

// Provider component to wrap our app and provide medication functionality
export const MedicationProvider = ({ children }) => {
  const [medications, setMedications] = useState([]);

  // Fetch medications from the backend
  const fetchMedications = async () => {
    try {
      const response = await fetch('http://localhost:3000/medications'); // Adjust this URL to match your backend
      const data = await response.json();
      console.log(data);

      setMedications(data.medication.map(medication => ({
        id: medication.id,
        name: medication.name,
        reminderTime1: medication.reminder_time1,
        reminderTime2: medication.reminder_time2,
        frequency: medication.frequency,
        isChecked: false
      })));
    } catch (error) {
      console.error('Failed to fetch medications:', error);
    }
  };

  // Add a new medication
  const addMedication = async (name, reminderTime1, reminderTime2, frequency) => {
    try {
      const response = await fetch('http://localhost:3000//add_medication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, reminder_time1: reminderTime1, reminder_time2: reminderTime2, frequency })
      });
      const newMedication = await response.json();
      setMedications(prevMedications => [...prevMedications, {
        id: newMedication.id,
        name: newMedication.name,
        reminderTime1: newMedication.reminder_time1,
        reminderTime2: newMedication.reminder_time2,
        frequency: newMedication.frequency,
        isChecked: false
      }]);
    } catch (error) {
      console.error('Failed to add medication:', error);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  return (
    <MedicationContext.Provider value={{ medications, addMedication ,setMedications }}>
      {children}
    </MedicationContext.Provider>
  );
};
