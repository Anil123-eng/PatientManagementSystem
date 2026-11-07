
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function PatientCard({ patient, onRemove }) {
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.info}>Age: {patient.age}</Text>
        <Text style={styles.info}>Gender: {patient.gender}</Text>
        <Text style={styles.info}>Contact: {patient.contact}</Text>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(patient.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  details: {
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
  },

  info: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
  },

  removeButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 7,
    marginLeft: 10,
  },

  removeButtonText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },
});
