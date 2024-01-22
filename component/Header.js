//header
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name="menu-outline" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>  Ngọc Hải </Text>
                <TouchableOpacity>
                </TouchableOpacity>
            </View>
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue', // Đổi màu nền thành blue
        padding: 10,
        width: width,
        position: 'absolute',
        top: 35,
        zIndex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchBar: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
    },
    input: {
        height: 40,
        paddingLeft: 10,
    },
});

export default Header;
