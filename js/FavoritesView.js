import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function FavoritesScreen({ favorites, isDarkMode }) {

    useEffect(() => {
        console.log(favorites); // Log the favorites when it changes
    }, [favorites]);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <FlatList
                data={favorites}
                renderItem={({ item }) => (
                    <View style={[styles.listItem, isDarkMode && styles.darkListItem]}>
                        <Text style={styles.listItemText}>{item.title}</Text>
                    </View>
                )}
                // Function to generate unique keys for each item
                keyExtractor={(item) => item.title}
            />
        </View>
    );
}

// Stylesheet for applying styles to components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff", // Default background color
    },
    darkContainer: {
        backgroundColor: "#000", // Background color in dark mode
    },
    darkListItem: {
        borderBottomColor: "#000", // Color of the bottom border in dark mode
    },
    listItem: {
        flexDirection: "row", // Items inside the view are arranged in a row
        alignItems: "center", // Items are vertically aligned at the center
        backgroundColor: "#E9F8EC", // Background color of each list item
        padding: 16, // Spacing around the list item
        borderBottomWidth: 5, // Border width for the bottom border
        borderBottomColor: "#fff", // Color of the bottom border
    },
    listItemText: {
        marginLeft: 16, // Spacing on the left side of the text
        fontSize: 16, // Font size of the text
    },
});
