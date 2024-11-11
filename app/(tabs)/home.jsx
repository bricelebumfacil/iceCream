import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';

// Sample ice cream data with ratings and stock
const iceCreams = [
  {
    id: 1,
    name: 'Strawberry Delight',
    image: require('../../assets/mango.jpg'), // Replace with your image path
    price: 3.99,
    rating: 4.5,
    stock: 5,
  },
  {
    id: 2,
    name: 'Mint Choco Chip',
    image: require('../../assets/mango.jpg'), // Replace with your image path
    price: 4.49,
    rating: 4.8,
    stock: 2,
  },
  {
    id: 3,
    name: 'Vanilla Bean',
    image: require('../../assets/mango.jpg'), // Replace with your image path
    price: 3.49,
    rating: 4.3,
    stock: 0,
  },
  {
    id: 4,
    name: 'Chocolate Fudge',
    image: require('../../assets/mango.jpg'), // Replace with your image path
    price: 4.99,
    rating: 5.0,
    stock: 1,
  },
];

const Home = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const addToCart = (iceCream) => {
    if (iceCream.stock > 0) {
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(item => item.id === iceCream.id);

      if (existingItemIndex >= 0) {
        // If item already exists in cart, increase quantity
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        // If new item, add to cart
        updatedCart.push({ ...iceCream, quantity: 1 });
      }
      setCart(updatedCart);
      Alert.alert('Added to Cart', `${iceCream.name} has been added to your cart!`);
    } else {
      Alert.alert('Out of Stock', `${iceCream.name} is currently out of stock.`);
    }
  };

  const toggleFavorite = (iceCream) => {
    if (favorites.includes(iceCream.id)) {
      setFavorites(favorites.filter(id => id !== iceCream.id));
      Alert.alert('Removed from Favorites', `${iceCream.name} has been removed from your favorites.`);
    } else {
      setFavorites([...favorites, iceCream.id]);
      Alert.alert('Added to Favorites', `${iceCream.name} has been added to your favorites.`);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const renderIceCream = ({ item }) => (
    <View style={styles.iceCreamCard}>
      <Image source={item.image} style={styles.iceCreamImage} />
      <Text style={styles.iceCreamName}>{item.name}</Text>
      <Text style={styles.iceCreamPrice}>${item.price.toFixed(2)}</Text>
      <Text style={styles.iceCreamRating}>⭐ {item.rating}</Text>
      <Text style={styles.iceCreamStock}>
        {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
      </Text>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)}
      >
        <Text style={styles.favoriteButtonText}>
          {favorites.includes(item.id) ? '❤️' : '🤍'} Favorite
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    Alert.alert('Checkout', 'Proceeding to checkout...');
    setModalVisible(false); // Close modal on checkout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍦 Welcome to Sweet Treats!</Text>

      <FlatList
        data={iceCreams}
        renderItem={renderIceCream}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      {/* Cart Summary */}
      <View style={styles.cartSummary}>
        <TouchableOpacity style={styles.viewCartButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.cartTitle}>🛒 Cart ({cart.length} items)</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Checkout */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cart Items</Text>
            {cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <View key={index} style={styles.cartItem}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemQuantity}>x{item.quantity}</Text>
                    <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                ))}
                <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.emptyCartText}>Your cart is empty!</Text>
            )}
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0', // Light pastel background
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F76D6D', // Pastel pink color
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iceCreamCard: {
    backgroundColor: '#F3E5F5', // Light pastel purple
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  iceCreamImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  iceCreamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A0572', // Deep purple for text
  },
  iceCreamPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F76D6D', // Pastel pink for price
    marginVertical: 5,
  },
  iceCreamRating: {
    fontSize: 14,
    color: '#FFD700', // Gold for rating
  },
  iceCreamStock: {
    fontSize: 12,
    color: '#4CAF50', // Green for in-stock message
  },
  favoriteButton: {
    marginTop: 5,
  },
  favoriteButtonText: {
    fontSize: 14,
    color: '#6A0572',
  },
  addButton: {
    backgroundColor: '#FFB3BA', // Light pastel pink for button
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  addButtonText: {
    color: '#6A0572', // Deep purple for button text
    fontWeight: 'bold',
  },
  cartSummary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFDDC1', // Light pastel orange
    borderRadius: 15,
    alignItems: 'center',
  },
  viewCartButton: {
    paddingVertical: 10,
    backgroundColor: '#FFABAB', // Light pastel red
    borderRadius: 10,
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0572',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FAF3E0', // Light pastel background
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0572',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  cartItemName: {
    fontSize: 16,
    color: '#6A0572',
  },
  cartItemQuantity: {
    fontSize: 16,
    color: '#4CAF50',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#F76D6D',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A0572',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#FFABAB', // Light pastel red for button
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  checkoutText: {
    color: '#6A0572',
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#6A0572',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6A0572',
    textDecorationLine: 'underline',
  },
});

export default Home;
