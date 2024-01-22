// LoginComponent.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginComponent = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Đây là nơi để bạn xử lý logic đăng nhập, kiểm tra tên người dùng và mật khẩu
    if (username === 'ngochai' && password === '12345') {
      // Đăng nhập thành công, chuyển đến trang chính
      navigation.navigate('Home');
    } else {
      // Đăng nhập thất bại, hiển thị thông báo
      Alert.alert('Thông báo', 'Đăng nhập thất bại. Vui lòng kiểm tra lại tên người dùng và mật khẩu.');
    }
  };

  const goToRegister = () => {
    // Chuyển đến màn hình Đăng ký khi người dùng bấm nút đăng ký
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên người dùng:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Nhập tên người dùng"
      />
      <Text style={styles.label}>Mật khẩu:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Nhập mật khẩu"
        secureTextEntry
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Text style={styles.registerLink} onPress={goToRegister}>
        Chưa có tài khoản? Đăng ký ngay!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  registerLink: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginComponent;