import React from "react";
import { View, Text, Dimensions } from "react-native";
import { StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
    // Extracting the 'item' parameter from the route
    const { item, isDarkMode } = route.params;

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.card}>
                {/* Heading for the detail page */}
                <Text style={styles.title}>Details</Text>
                <View>
                    {/* Label for the name */}
                    {/* <Text style={styles.label}>Naam:</Text> */}
                    {/* Displaying the name */}
                    <Text style={styles.text}>{item.title}</Text>
                </View>
                <View>
                    {/* Label for the address */}
                    {/* <Text style={styles.label}>Adres:</Text> */}
                    {/* Displaying the address */}
                    <Text style={styles.text}>{item.location}</Text>
                </View>
                {/* <View> */}
                    {/* Label for the phone number */}
                    {/* <Text style={styles.label}>Telefoonnummer:</Text> */}
                    {/* Displaying the phone number */}
                    {/* <Text style={styles.text}>{item.phoneNumber}</Text> */}
                {/* </View> */}
                <View>
                    {/* Label for the website */}
                    {/* <Text style={styles.label}>Website:</Text> */}
                    {/* Displaying the website */}
                    <Text style={styles.text}>{item.website}</Text>
                </View>
            </View>
        </View>
    );
}

// Stylesheet for applying styles to components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF", // Background color of the container
        alignItems: "center", // Center alignment of the content
        justifyContent: "center", // Center alignment of the content
    },
    darkContainer: {
        backgroundColor: "#000", // Background color for dark mode
    },
    card: {
        backgroundColor: "#E9F8EC", // Background color of the card
        borderRadius: 10, // Rounded corners for the card
        borderWidth: 1, // Border width of the card
        borderColor: "#000000", // Border color of the card
        padding: 16, // Padding around the content of the card
        marginBottom: 16, // Bottom margin of the card
        width: Dimensions.get("window").width - 32, // Width of the card based on the device window width
    },
    title: {
        fontSize: 18, // Font size of the title
        fontWeight: "bold", // Font weight of the title
        marginBottom: 16, // Bottom margin of the title
    },
    label: {
        fontSize: 16, // Font size of the label
        fontWeight: "bold", // Font weight of the label
        marginBottom: 4, // Bottom margin of the label
    },
    text: {
        fontSize: 16, // Font size of the text
        marginBottom: 12, // Bottom margin of the text
    },
});
