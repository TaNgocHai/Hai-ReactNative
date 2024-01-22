//cart
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';

const Cart = () => {
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      const fetchCart = async () => {
        try {
          const storedCart = await AsyncStorage.getItem('cart');
          const parsedCart = storedCart ? JSON.parse(storedCart) : [];
          setCart(parsedCart);
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
        }
      };
  
      fetchCart();
    }, []);
  
    const handleIncreaseQuantity = async (itemId) => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        console.log('Stored Cart:', storedCart);
    
        const parsedCart = storedCart ? JSON.parse(storedCart) : [];
        console.log('Parsed Cart:', parsedCart);
    
        const existingItemIndex = parsedCart.findIndex(item => item.id === itemId);
    
        if (existingItemIndex !== -1) {
          // Đảm bảo quantity không bao giờ là undefined
          parsedCart[existingItemIndex].quantity = (parsedCart[existingItemIndex].quantity || 0) + 1;
        } else {
          // Thêm sản phẩm mới và đặt quantity thành 1
          const newItem = { id: itemId, quantity: 1 };
          parsedCart.push(newItem);
        }
    
        const updatedCart = removeDuplicateItems(parsedCart);
        console.log('Updated Cart:', updatedCart);
    
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
      } catch (error) {
        console.error('Lỗi khi xử lý giỏ hàng:', error);
      }
    };
    
    
    
    
    

    
    const removeDuplicateItems = (cart) => {
      console.log('Cart before removing duplicates:', cart);
      const uniqueCart = [...new Map(cart.map(item => [item.id, item])).values()];
      console.log('Unique Cart:', uniqueCart);
      return uniqueCart;
    };
    
    
    
    
  
    const handleDecreaseQuantity = (itemId) => {
      const updatedCart = cart.map(item => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    
      console.log('Updated Cart after decrease:', updatedCart);
    
      setCart(updatedCart);
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    
  
    const handleClearCart = () => {
      setCart([]);
      AsyncStorage.removeItem('cart');
    };
  
    const renderCartItem = ({ item }) => (
      <View style={styles.cartItem}>
    <Image style={styles.productImage} source={{ uri: item.image || 'https://example.com/default-image.jpg' }} />
    <View style={styles.productInfo}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>
        ${item.price ? (item.price * (item.quantity || 1)) : 0} x {item.quantity || 0}
      </Text>
      <View style={styles.quantityButtons}>
        <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
    );
    
    
  
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
    return (
      <View style={styles.container}>
      <Header showBackButton={false} title="Shopping Cart" />
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={cart}
        keyExtractor={(item) => `${item.id}_${Math.random()}`}
        renderItem={renderCartItem}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>${totalAmount}</Text>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
        <Text style={styles.clearButtonText}>Clear Cart</Text>
      </TouchableOpacity>
      <Footer />
    </View>
      );
    };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff', // Thêm màu nền để phân biệt các sản phẩm
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10, // Thay đổi giá trị này nếu cần
    marginBottom: 6, // Thay đổi giá trị này nếu cần
  },
  productImage: {
    width: 80,
    height: 100,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 18,
    color: '#007BFF',
  },
  clearButton: {
    backgroundColor: '#ff5252', // Màu đỏ hoặc màu bạn muốn
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 250,
  },
  flatListContent: {
    paddingBottom: 20, // Điều chỉnh giá trị này nếu cần
    marginTop: 144,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    fontSize: 20,
    marginHorizontal: 8,
    color: '#007BFF',
  },
  quantity: {
    fontSize: 16,
  },
});

export default Cart;