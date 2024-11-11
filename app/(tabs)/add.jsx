import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';

const Add = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  const handleSubmit = () => {
    setProductName('');
    setDescription('');
    setPrice('');
    setTag('');
    setPreviewVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gradientBackground}>
        <Text style={styles.title}>🍦 Create a New Post</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Product Name"
          value={productName}
          onChangeText={setProductName}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Price ($)"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.input}
          placeholder="Tag (e.g., New, Limited Edition)"
          value={tag}
          onChangeText={setTag}
        />

        <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
          <Text style={styles.previewButtonText}>Preview Post</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={previewVisible}
          onRequestClose={() => setPreviewVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>📋 Preview Your Post</Text>
              <View style={styles.previewCard}>
                {tag && <Text style={styles.tag}>{tag}</Text>}
                <Text style={styles.previewText}>Name: {productName}</Text>
                <Text style={styles.previewText}>Description: {description}</Text>
                <Text style={styles.previewText}>Price: ${price}</Text>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Post Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setPreviewVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradientBackground: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFDEE9', // A solid fallback color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0572',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF1E6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  previewButton: {
    backgroundColor: '#6A0572',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  previewButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF1E6',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A0572',
    marginBottom: 15,
  },
  previewCard: {
    backgroundColor: '#FFDEE9',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#FFD700',
    color: '#6A0572',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  previewText: {
    fontSize: 16,
    color: '#6A0572',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#6A0572',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FFABAB',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#6A0572',
    fontWeight: 'bold',
  },
});

export default Add;
