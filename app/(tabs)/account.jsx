import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const Account = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [userName, setUserName] = useState('Brice Lebumfacil');
  const [modalVisible, setModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const handleSaveProfile = () => {
    setUserName(newUserName);
    setModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          onPress: () => {
            console.log('User logged out');
            router.push('/login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Sweet Ice Cream</Text>
        <Text style={styles.userName}>Welcome, {userName}!</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Orders</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('OrderHistory')}>
          <Ionicons name="cart-outline" size={24} color="#6A0572" />
          <Text style={styles.itemText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('TrackOrders')}>
          <Ionicons name="pricetag-outline" size={24} color="#6A0572" />
          <Text style={styles.itemText}>Track Orders</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PaymentMethods')}>
          <Ionicons name="wallet-outline" size={24} color="#6A0572" />
          <Text style={styles.itemText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ManageAddresses')}>
          <Ionicons name="location-outline" size={24} color="#6A0572" />
          <Text style={styles.itemText}>Manage Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color="#6A0572" />
          <Text style={styles.itemText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter new username"
              value={newUserName}
              onChangeText={setNewUserName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FAF3E0', // Light cream background
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A0572',
    marginBottom: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0572',
    marginBottom: 5,
  },
  editProfileButton: {
    backgroundColor: '#FFABAB', // Soft pastel red
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  editProfileText: {
    color: '#6A0572',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#FFB3BA', // Light pink shadow
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A0572',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4A4A4A',
  },
  logoutButton: {
    backgroundColor: '#F76D6D', // Soft red
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FAF3E0', // Light cream background
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A0572',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#6A0572', // Dark purple
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  saveText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#F76D6D', // Soft red
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Account;
