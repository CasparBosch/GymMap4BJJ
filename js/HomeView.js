import { FlatList, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ jsonData, fetchData, isDarkMode, updateFavorites }) {
    const [refreshing, setRefreshing] = useState(false);
    const [favorites, setFavorites] = useState([]);

    // Function to handle the press event on the favorite icon
    const handleFavoritePress = (item) => {
        // Check if the item is already a favorite
        if (isFavorite(item)) {
            // If it is a favorite, remove it from the favorites list
            deleteFromFavorites(item);
        } else {
            // If it is not a favorite, add it to the favorites list
            addToFavorites(item);
        }
    };

    // Function to add an item to favorites
    const addToFavorites = async (item) => {
        // Create a new array with the current favorites and the new item
        const updatedFavorites = [...favorites, item];
        // Update the favorites state with the new array
        setFavorites(updatedFavorites);
        // Store the updated favorites list in AsyncStorage
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        // Call the updateFavorites function with the updated favorites list
        updateFavorites(updatedFavorites);
    };

    // Function to delete an item from favorites
    const deleteFromFavorites = async (item) => {
        // Filter out the item to be deleted from the favorites list
        const updatedFavorites = favorites.filter(fav => fav.title !== item.title);
        // Update the favorites state with the updated list
        setFavorites(updatedFavorites);
        // Store the updated favorites list in AsyncStorage
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        // Call the updateFavorites function with the updated favorites list
        updateFavorites(updatedFavorites);
    };

    // Function to check if an item is a favorite
    const isFavorite = (item) => {
        // Check if the item's name exists in the favorites list
        return favorites.some((fav) => fav.title === item.title);
    };

    // Function to handle refreshing the data
    const handleRefresh = () => {
        // Set the refreshing state to true to indicate data is being refreshed
        setRefreshing(true);
        // Fetch new data using the fetchData function
        fetchData().then(() => {
            // Set the refreshing state to false after data has been fetched
            setRefreshing(false);
        });
    };

    useEffect(() => {
        // Retrieve favorites from AsyncStorage when the component mounts
        const fetchFavorites = async () => {
            try {
                // Retrieve the stored favorites from AsyncStorage
                const storedFavorites = await AsyncStorage.getItem('favorites');
                // Check if favorites exist in AsyncStorage
                if (storedFavorites) {
                    // If favorites exist, update the favorites state with the stored favorites
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        // Call the fetchFavorites function when the component mounts
        fetchFavorites();
    }, []);

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
            {/* StatusBar component */}
            <StatusBar style="auto" />
            <FlatList
                // Data to be rendered in the FlatList
                data={jsonData}
                // Rendering logic for each item
                renderItem={({ item }) => (
                    // View container for each item
                    <View style={styles.card}>
                        {/* Favorite icon */}
                        <TouchableOpacity
                            onPress={() => handleFavoritePress(item)}
                            style={styles.favoriteIcon}
                            activeOpacity={0.8}
                        >
                            <Entypo
                                // Display a filled star icon if the item is a favorite, otherwise display an outlined star icon
                                name={isFavorite(item) ? 'star' : 'star-outlined'}
                                size={24}
                                color="#FF2D55FF"
                            />
                        </TouchableOpacity>

                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.text}>{item.location}</Text>
                        {/* <Text style={styles.text}>{item.website}</Text> */}
                    </View>
                )}
                // Function to generate unique keys for each item
                keyExtractor={(item) => item.title}
                // Set the refreshing state of the FlatList
                refreshing={refreshing}
                // Function to handle the refresh event
                onRefresh={handleRefresh}
            />
        </SafeAreaView>
    );
}

// Stylesheet for applying styles to components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff", // Default background color (light mode)
        paddingHorizontal: 16, // Horizontal padding of 16 units
    },
    darkContainer: {
        backgroundColor: "#000", // Background color for dark mode
    },
    card: {
        backgroundColor: "#E9F8EC", // Light green background color
        borderRadius: 10, // Rounded corners with a radius of 10 units
        borderWidth: 1, // Border width of 1 unit
        borderColor: "#000000", // Black border color
        padding: 16, // Padding of 16 units around the content
        marginBottom: 16, // Margin bottom of 16 units for spacing between cards
        width: Dimensions.get("window").width - 32, // Width equal to the window width minus twice the horizontal padding
    },
    favoriteIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    title: {
        fontSize: 18, // Font size of 18 units
        fontWeight: "bold", // Bold font weight
        marginBottom: 8, // Margin bottom of 8 units for spacing between title and other text
    },
    text: {
        fontSize: 16, // Font size of 16 units
        marginBottom: 4, // Margin bottom of 4 units for spacing between text items
    },
});
