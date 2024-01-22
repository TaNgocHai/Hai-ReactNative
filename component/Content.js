import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Product = ({ item, addToCart }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Productdetail', { item });
  };

  return (
    <View style={styles.product}>
      <TouchableOpacity onPress={handlePress}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title.length > 10 ? item.title.substring(0, 10) + '...' : item.title}</Text>
      <Text style={styles.price}>{item.price} USD</Text>
      <Button title="Thêm vào giỏ hàng" onPress={() => addToCart(item)} />
    </View>
  );
};

const Content = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(25);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách categories
        const responseCategories = await fetch('https://fakestoreapi.com/products/categories');
        const categoriesData = await responseCategories.json();
        setCategories(categoriesData);

        // Lấy danh sách sản phẩm
        const responseProducts = await fetch('https://fakestoreapi.com/products');
        const productsData = await responseProducts.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  

  const addToCart = async (item) => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const existingCartArray = existingCart ? JSON.parse(existingCart) : [];

      const existingItemIndex = existingCartArray.findIndex((cartItem) => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        existingCartArray[existingItemIndex].quantity += 1;
      } else {
        existingCartArray.push({ ...item, quantity: 1 });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(existingCartArray));

      setCart(existingCartArray);
      Alert.alert('Thông báo', 'Đã thêm sản phẩm vào giỏ hàng!');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Lọc sản phẩm dựa trên truy vấn tìm kiếm và category
  const filteredProducts = products.filter(
    (item) =>
      (!currentCategory || item.category === currentCategory) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const renderProducts = currentProducts.map((item) => (
    <Product key={item.id} item={item} addToCart={addToCart} />
  ));

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <View style={styles.container}>
          {/* Thêm ô nhập liệu tìm kiếm */}
          <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm sản phẩm..."
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Text style={styles.sectionTitle}>Danh mục</Text>
      <ScrollView horizontal>
        {/* Nút hiển thị tất cả */}
        <TouchableOpacity
          style={[styles.categoryButton, styles.showAllButton]}
          onPress={() => {
            setCurrentCategory(null);
            setSearchQuery('');
          }}
        >
          <Text style={{ color: 'black' }}>All</Text>
        </TouchableOpacity>

        {/* Danh sách các nút category */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setCurrentCategory(category)}
            style={[
              styles.categoryButton,
              { backgroundColor: currentCategory === category ? '#007BFF' : '#ddd' },
            ]}>
            <Text style={{ color: currentCategory === category ? 'white' : 'black' }}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
  
      <Text style={styles.sectionTitle}>Sản phẩm</Text>
      <ScrollView horizontal>{renderProducts}</ScrollView>
      {/* Nút chuyển trang */}
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 140,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 250,
  },
  image2: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginRight: 50,
  },
  product: {
    alignItems: 'center',
    backgroundColor: '#808080',
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: '#007BFF',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  searchBar: {
 
    marginBottom: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  categoryButton: {
    height: 40,
    padding: 10,
    margin: 5,
    textAlign:'center',
    borderRadius: 5,
  },
  showAllButton: {
    marginRight: 10,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor:'#ddd',
  },
});

export default Content;
