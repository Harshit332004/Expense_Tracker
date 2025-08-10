import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

// Custom hook to use our appointment context
export const useAppointment = () => useContext(AppointmentContext);

// Provider component to wrap our app and provide appointment functionality
export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  // Fetch upcoming appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3000/upcoming_appointments'); // Adjust this URL to match your backend
      const data = await response.json();
      console.log(data);

      setAppointments(data.upcoming_appointments.map(appointment => ({
        id: appointment.id,
        name: appointment.doctor_name,
        reminderTime1: appointment.date,
        reminderTime2: appointment.time,
      })));
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  // Add a new appointment
  const addAppointment = async (name, reminderTime1, reminderTime2, frequency) => {
    try {
      const response = await fetch('http://localhost:3000/add_appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, reminder_time1: reminderTime1, reminder_time2: reminderTime2, frequency })
      });
      const newAppointment = await response.json();
      setAppointments(prevAppointments => [...prevAppointments, {
        id: newAppointment.id,
        doctor_name: newAppointment.name,
        date: newAppointment.reminder_time1,
        time: newAppointment.reminder_time2,
      }]);
    } catch (error) {
      console.error('Failed to add appointment:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
