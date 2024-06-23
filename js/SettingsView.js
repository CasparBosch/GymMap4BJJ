import { StyleSheet, View, StatusBar, Text } from 'react-native';
import React from 'react';
import { Switch } from "react-native";

export default function SettingsScreen({ isDarkMode, setIsDarkMode }) {
    // Determine the switch text based on the current mode
    const switchText = isDarkMode ? "Light mode" : "Dark mode";

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                {/* Text for the switch */}
                <Text style={[styles.switchText, isDarkMode && styles.switchTextLight]}>
                    {isDarkMode ? "Schakel naar Light mode" : "Schakel naar Dark mode"}
                </Text>
                {/* Switch component */}
                <Switch
                    value={isDarkMode}
                    onValueChange={value => setIsDarkMode(value)}
                    thumbColor={isDarkMode ? '#FF2D55FF' : '#FF2D55FF'} // Red when dark mode, white when light mode
                    trackColor={{ false: '#FF2D55FF', true: '#FFFFFF' }} // White when off, red when on
                />
            </View>
            {/* StatusBar component with dynamic style */}
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        </View>
    );
}

// Stylesheet for applying styles to components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchContainer: {
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Align items vertically at the center
        marginBottom: 10,
    },
    switchText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10, // Add spacing between the text and switch
    },
    switchTextLight: {
        color: '#FFF', // Set the text color to white
    },
});
