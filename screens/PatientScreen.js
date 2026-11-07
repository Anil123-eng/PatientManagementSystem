
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import PatientCard from '../components/PatientCard';

export default function PatientScreen({ onLogout, userEmail }) {
  const [patients, setPatients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');

  // Automatically capitalize patient names
  const formatPatientName = (value) => {
    return value
      .toLowerCase()
      .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
  };

  // Load saved patients
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const savedPatients = await AsyncStorage.getItem(
          `patients_${userEmail}`
        );

        if (savedPatients !== null) {
          setPatients(JSON.parse(savedPatients));
        }
      } catch (error) {
        console.log('Error loading patients:', error);
        window.alert('Unable to load saved patient records.');
      } finally {
        setIsLoaded(true);
      }
    };

    loadPatients();
  }, [userEmail]);

  // Automatically save patients whenever the list changes
  useEffect(() => {
    const savePatients = async () => {
      if (!isLoaded || !userEmail) return;

      try {
        await AsyncStorage.setItem(
          `patients_${userEmail}`,
          JSON.stringify(patients)
        );
      } catch (error) {
        console.log('Error saving patients:', error);
        window.alert('Unable to save patient records.');
      }
    };

    savePatients();
  }, [patients, isLoaded, userEmail]);

  // Add Patient
  const handleAddPatient = () => {
    if (
      !name.trim() ||
      !age.trim() ||
      !gender.trim() ||
      !contact.trim()
    ) {
      window.alert('Please fill in all patient details.');
      return;
    }

    const patientName = formatPatientName(name.trim());

    // Validate patient name
    if (!/^[A-Z][A-Za-z]*(?:\s+[A-Z][A-Za-z]*)*$/.test(patientName)) {
      window.alert('Please enter a valid patient name using letters only.');
      return;
    }

    const patientAge = Number(age);

    if (
      !Number.isInteger(patientAge) ||
      patientAge < 1 ||
      patientAge > 120
    ) {
      window.alert('Please enter a valid age between 1 and 120.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(contact.trim())) {
      window.alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    const newPatient = {
      id: Date.now().toString(),
      name: patientName,
      age: patientAge,
      gender,
      contact: contact.trim(),
    };

    setPatients((previousPatients) => [
      ...previousPatients,
      newPatient,
    ]);

    setName('');
    setAge('');
    setGender('');
    setContact('');

    window.alert('Patient added successfully!');
  };

  // Remove Patient
  const handleRemovePatient = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this patient?'
    );

    if (!confirmed) return;

    setPatients((previousPatients) =>
      previousPatients.filter((patient) => patient.id !== id)
    );
  };

  // Wait until saved records are loaded
  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Loading patient records...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Patient Management</Text>
          <Text style={styles.subtitle}>
            Add and manage patient details
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Add Patient Form */}
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Add New Patient</Text>

        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          placeholderTextColor="#94A3B8"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.genderLabel}>Gender</Text>

        <View style={styles.genderContainer}>
          {['Male', 'Female', 'Other'].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.genderOption}
              onPress={() => setGender(item)}
            >
              <View style={styles.radioOuter}>
                {gender === item && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Text style={styles.genderText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
          value={contact}
          onChangeText={setContact}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPatient}
        >
          <Text style={styles.addButtonText}>Add Patient</Text>
        </TouchableOpacity>
      </View>

      {/* Patient List */}
      <View style={styles.patientSection}>
        <Text style={styles.sectionTitle}>
          Patient List ({patients.length})
        </Text>

        {patients.length === 0 ? (
          <Text style={styles.emptyText}>
            No patients added yet.
          </Text>
        ) : (
          patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onRemove={handleRemovePatient}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },

  loadingText: {
    fontSize: 16,
    color: '#64748B',
  },

  scrollContent: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
    flexGrow: 1,
  },

  header: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 22,
    gap: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
  },

  logoutButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },

  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  form: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 14,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 12,
    color: '#1E293B',
  },

  genderLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },

  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 15,
    flexWrap: 'wrap',
  },

  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  radioOuter: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },

  genderText: {
    fontSize: 14,
    color: '#334155',
  },

  addButton: {
    backgroundColor: '#2563EB',
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  patientSection: {
    marginBottom: 20,
  },

  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 20,
  },
});
