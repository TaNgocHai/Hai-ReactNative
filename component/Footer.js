// Footer.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  const goToCart = () => {
    // Chuyển đến trang giỏ hàng khi người dùng click vào biểu tượng giỏ hàng
    navigation.navigate('Cart');
  };

  const goToHome = () => {
    // Chuyển đến trang chủ khi người dùng click vào biểu tượng home
    navigation.navigate('Home');
  };

  const goToLogin = () => {
    // Chuyển đến trang đăng nhập khi người dùng click vào biểu tượng user
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToHome}>
        <Icon name='home' type='font-awesome' color='#007BFF' style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <Icon name='user' type='font-awesome' color='#6C757D' style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToCart}>
        <Icon name='shopping-cart' type='font-awesome' color='#6C757D' style={styles.icon} />
      </TouchableOpacity>
      <Icon name='bell' type='font-awesome' color='#6C757D'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 60,
  },
});

export default Footer;