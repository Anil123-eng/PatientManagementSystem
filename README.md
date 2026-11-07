# Patient Management System

A React Native application developed using Expo to help receptionists manage patient records.

## 1. Project Overview

This project was developed as part of a React Native Developer assignment.

The application allows receptionists to register, log in, add patients, view patient details, and remove patient records.

## 2. Requirements

- Receptionist registration and login.
- Add new patient details.
- Display patient records.
- Remove patient records.
- Validate receptionist and patient information.
- Maintain separate patient records for each receptionist.
- Automatically save and retrieve data using local storage.
- Responsive user interface.

## 3. Technologies Used

- React Native
- Expo
- JavaScript
- React Hooks (useState, useEffect)
- AsyncStorage
- React Native StyleSheet

## 4. Project Structure

```text
PatientManagementApp/
│
├── components/
│   └── PatientCard.js
│
├── screens/
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   └── PatientScreen.js
│
├── assets/
├── App.js
├── index.js
├── app.json
├── package.json
├── package-lock.json
├── AGENTS.md
└── README.md
```

## 5. File Responsibilities

| File | Concepts Used |
|---|---|
| App.js | Application flow, state management, login, registration, logout, AsyncStorage |
| LoginScreen.js | Login form, useState, TextInput, validation |
| RegisterScreen.js | Registration form, useState, password validation |
| PatientScreen.js | Patient management, useState, useEffect, AsyncStorage, form validation |
| PatientCard.js | Reusable component, props, patient details, remove functionality |

## 6. Application Workflow

### Receptionist Registration

1. New receptionist opens the application.
2. Selects Register.
3. Enters name, email, password, and confirm password.
4. Application validates the details.
5. Account is saved locally.
6. Receptionist is redirected to Login.

### Receptionist Login

1. Existing receptionist enters email and password.
2. Application checks the saved account details.
3. Successful login opens Patient Management.

### Patient Management

1. Enter patient name, age, gender, and contact number.
2. Application validates the information.
3. Patient name is automatically formatted with uppercase initials.
4. Select Add Patient.
5. Patient appears in the patient list.
6. Patient records are automatically saved.

### Remove Patient

1. Select Remove.
2. Confirm the deletion.
3. Selected patient is removed.
4. Updated records are saved automatically.

## 7. Validation Rules

### Receptionist Validation

- All fields are required.
- Email must be a valid Gmail address.
- Password must contain at least 8 characters.
- Password must include uppercase, lowercase, number, and special character.
- Confirm password must match.
- Duplicate email registration is prevented.

### Patient Validation

- All patient fields are required.
- Patient names are automatically capitalized.
- Age must be between 1 and 120.
- Age must be a whole number.
- Contact number must be a valid 10-digit Indian mobile number.

## 8. Data Persistence

AsyncStorage is used to save data locally.

- Receptionist accounts are stored locally.
- Patient records are stored separately for each receptionist.
- Patient records are loaded after login.
- Changes are saved automatically.

**Note:** This version uses local storage. Data does not synchronize between different devices. No backend or cloud database is included. AsyncStorage is not encrypted secure storage.

## 9. Installation and Setup

### Prerequisites

- Node.js
- npm
- Visual Studio Code

### Step 1: Open project folder

```powershell
cd D:\PatientManagementApp
```

### Step 2: Install dependencies

```powershell
npm install
```

### Step 3: Install Expo Web dependencies

```powershell
npx expo install react-dom react-native-web
```

### Step 4: Install AsyncStorage

```powershell
npx expo install @react-native-async-storage/async-storage
```

### Step 5: Start the application

```powershell
npx expo start --web
```

The application will open in the browser using Expo Web.

## 10. Testing

The following functionalities have been tested:

- Receptionist registration.
- Receptionist login and logout.
- Duplicate email validation.
- Incorrect password validation.
- Patient addition.
- Patient removal with confirmation.
- Patient name capitalization.
- Age validation.
- Contact number validation.
- Separate patient records for multiple receptionists.
- Data persistence after browser refresh.
- Responsive desktop and mobile layouts.

## 11. Future Enhancements

- Backend API integration.
- Cloud database.
- Multi-device data synchronization.
- Secure authentication.
- Edit patient details.
- Patient search and filtering.
- Appointment management.

## 12. Project Objective

This project demonstrates React Native development concepts, including reusable components, state management, hooks, form validation, local data persistence, and responsive user interface development.