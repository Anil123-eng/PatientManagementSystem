
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PatientScreen from './screens/PatientScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load receptionist accounts when the app starts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const savedUsers = await AsyncStorage.getItem(
          'registeredUsers'
        );

        if (savedUsers !== null) {
          setRegisteredUsers(JSON.parse(savedUsers));
        }
      } catch (error) {
        console.log('Error loading users:', error);
        window.alert('Unable to load receptionist accounts.');
      } finally {
        setIsLoaded(true);
      }
    };

    loadUsers();
  }, []);

  // Register receptionist
  const handleRegister = async (userDetails) => {
    const normalizedEmail = userDetails.email.trim().toLowerCase();

    const existingUser = registeredUsers.find(
      (user) => user.email === normalizedEmail
    );

    if (existingUser) {
      window.alert('This email is already registered.');
      return;
    }

    const newUser = {
      ...userDetails,
      email: normalizedEmail,
    };

    const updatedUsers = [...registeredUsers, newUser];

    try {
      await AsyncStorage.setItem(
        'registeredUsers',
        JSON.stringify(updatedUsers)
      );

      setRegisteredUsers(updatedUsers);

      window.alert('Registration successful! Please login.');

      setCurrentScreen('login');
    } catch (error) {
      console.log('Error saving user:', error);
      window.alert('Unable to save receptionist account.');
    }
  };

  // Login receptionist
  const handleLogin = (loginDetails) => {
    const normalizedEmail = loginDetails.email.trim().toLowerCase();

    const matchedUser = registeredUsers.find(
      (user) =>
        user.email === normalizedEmail &&
        user.password === loginDetails.password
    );

    if (!matchedUser) {
      window.alert('Invalid email or password.');
      return;
    }

    setCurrentUser(matchedUser);
    setCurrentScreen('patients');
  };

  // Logout receptionist
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  // Wait until saved accounts are loaded
  if (!isLoaded) {
    return null;
  }

  if (currentScreen === 'register') {
    return (
      <RegisterScreen
        onRegister={handleRegister}
        onLogin={() => setCurrentScreen('login')}
      />
    );
  }

  if (currentScreen === 'patients' && currentUser) {
    return (
      <PatientScreen
        onLogout={handleLogout}
        userEmail={currentUser.email}
      />
    );
  }

  return (
    <LoginScreen
      onLogin={handleLogin}
      onRegister={() => setCurrentScreen('register')}
    />
  );
}
