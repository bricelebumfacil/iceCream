import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Animated,
    Modal,
    Pressable,
    TextInput,
  } from 'react-native';
  import React, { useState, useRef } from 'react';
  
  const iceCreams = [
    {
      id: 1,
      name: 'Strawberry Delight',
      image: require('../../assets/mango.jpg'),
    },
    {
      id: 2,
      name: 'Mint Choco Chip',
      image: require('../../assets/mango.jpg'),
    },
    {
      id: 3,
      name: 'Vanilla Bean',
      image: require('../../assets/mango.jpg'),
    },
    {
      id: 4,
      name: 'Chocolate Fudge',
      image: require('../../assets/mango.jpg'),
    },
  ];
  
  const Bookmark = () => {
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [selectedIceCream, setSelectedIceCream] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const scaleAnim = useRef(new Animated.Value(1)).current;
  
    const toggleBookmark = (id) => {
      if (bookmarkedItems.includes(id)) {
        setBookmarkedItems(bookmarkedItems.filter((itemId) => itemId !== id));
      } else {
        setBookmarkedItems([...bookmarkedItems, id]);
      }
      animateButton();
    };
  
    const animateButton = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    };
  
    const renderIceCreamItem = ({ item }) => {
      const isBookmarked = bookmarkedItems.includes(item.id);
      return (
        <View style={styles.iceCreamCard}>
          <Image source={item.image} style={styles.iceCreamImage} />
          <Text style={styles.iceCreamName}>{item.name}</Text>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              onPress={() => toggleBookmark(item.id)}
              style={[styles.bookmarkButton, isBookmarked && styles.bookmarked]}
            >
              <Text style={styles.bookmarkButtonText}>
                {isBookmarked ? '💖' : '💗'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            onPress={() => {
              setSelectedIceCream(item);
              setOrderModalVisible(true);
            }}
            style={styles.orderButton}
          >
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      );
    };
  
    const renderBookmarkedItem = (item) => (
      <View style={styles.bookmarkedItem}>
        <Image source={item.image} style={styles.bookmarkedImage} />
        <Text style={styles.bookmarkedName}>{item.name}</Text>
      </View>
    );
  
    const confirmOrder = () => {
      console.log(`Ordered ${quantity} of ${selectedIceCream.name}`);
      // Here you can handle the order confirmation logic, e.g., API call
      setOrderModalVisible(false);
      setQuantity(1); // Reset quantity
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🍦 Your Favorite Ice Creams</Text>
        <FlatList
          data={iceCreams}
          renderItem={renderIceCreamItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.gridContainer}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
        {bookmarkedItems.length > 0 && (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              You have {bookmarkedItems.length} favorites saved!
            </Text>
            <Pressable
              style={styles.viewFavoritesButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.viewFavoritesButtonText}>View Favorites</Text>
            </Pressable>
          </View>
        )}
  
        {/* Modal for viewing favorites */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>🌟 Your Favorite Ice Creams</Text>
              <FlatList
                data={iceCreams.filter((iceCream) =>
                  bookmarkedItems.includes(iceCream.id)
                )}
                renderItem={({ item }) => renderBookmarkedItem(item)}
                keyExtractor={(item) => item.id.toString()}
              />
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
  
        {/* Modal for ordering ice cream */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={orderModalVisible}
          onRequestClose={() => setOrderModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Order {selectedIceCream?.name}</Text>
              <TextInput
                style={styles.quantityInput}
                placeholder="Quantity"
                keyboardType="numeric"
                value={quantity.toString()}
                onChangeText={(text) => setQuantity(Number(text))}
              />
              <Pressable
                style={styles.confirmButton}
                onPress={confirmOrder}
              >
                <Text style={styles.confirmButtonText}>Confirm Order</Text>
              </Pressable>
              <Pressable
                style={styles.closeButton}
                onPress={() => setOrderModalVisible(false)}
              >
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
      backgroundColor: '#FFDEE9',
      padding: 10,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#6A0572',
      textAlign: 'center',
      marginBottom: 20,
    },
    gridContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    iceCreamCard: {
      backgroundColor: '#FFF1E6',
      borderRadius: 15,
      padding: 10,
      margin: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
      width: '45%',
    },
    iceCreamImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: '#FFD700',
    },
    iceCreamName: {
      fontSize: 16,
      fontWeight: '700',
      color: '#6A0572',
      marginBottom: 5,
      backgroundColor: '#FFF9C4',
      padding: 5,
      borderRadius: 8,
      textAlign: 'center',
    },
    bookmarkButton: {
      backgroundColor: '#FFABAB',
      padding: 6,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
    },
    bookmarked: {
      backgroundColor: '#FFD700',
    },
    bookmarkButtonText: {
      fontSize: 18,
      color: '#6A0572',
      fontWeight: 'bold',
    },
    orderButton: {
      marginTop: 10,
      backgroundColor: '#6A0572',
      padding: 10,
      borderRadius: 8,
    },
    orderButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
    messageContainer: {
      backgroundColor: '#F3E5F5',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    message: {
      fontSize: 16,
      color: '#6A0572',
      fontWeight: '600',
    },
    viewFavoritesButton: {
      backgroundColor: '#6A0572',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginTop: 10,
    },
    viewFavoritesButtonText: {
      color: '#FFF',
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
      backgroundColor: '#FFF',
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#6A0572',
      marginBottom: 10,
    },
    bookmarkedItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    bookmarkedImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    bookmarkedName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#6A0572',
    },
    quantityInput: {
      borderColor: '#6A0572',
      borderWidth: 1,
      borderRadius: 5,
      width: '100%',
      padding: 10,
      marginBottom: 15,
    },
    confirmButton: {
      backgroundColor: '#6A0572',
      padding: 10,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
    },
    confirmButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: '#FFABAB',
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
    },
    closeButtonText: {
      color: '#6A0572',
      fontWeight: 'bold',
    },
  });
  
  export default Bookmark;
  