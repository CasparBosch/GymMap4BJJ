import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';

export default function MapsScreen({ jsonData }) {

    // Fetches the user's current location when the component mounts
    useEffect(() => {
        getLocationAsync();
    }, []);

    // Handles the press event on a marker and navigates to the details screen
    const handleMarkerPress = (item) => {
        navigation.navigate("Details", { item: item });
    };

    // Requests and retrieves the user's current location
    const getLocationAsync = async () => {
        try {
            // Requests permission to access the user's location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            // Retrieves the current location coordinates
            const location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
        } catch (error) {
            console.error(error);
        }
    };

    const navigation = useNavigation();
    const [currentLocation, setCurrentLocation] = useState(null);

    const [region, setRegion] = useState({
        // Default latitude if current location is not available
        latitude: currentLocation ? currentLocation.latitude : 51.909126,
        // Default longitude if current location is not available
        longitude: currentLocation ? currentLocation.longitude : 4.48583,
        // Delta value for zoom level on latitude
        latitudeDelta: 0.0922,
        // Delta value for zoom level on longitude
        longitudeDelta: 0.0421,
    });

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={true}
            >
                {/* Renders markers for each item in the jsonData array */}
                {jsonData.map((item) => (
                    <Marker
                        key={item.title}
                        coordinate={{
                            latitude: parseFloat(item.latitude),
                            longitude: parseFloat(item.longitude),
                        }}
                        title={item.title}
                        onPress={() => handleMarkerPress(item)}
                    />
                ))}
            </MapView>
        </View>
    );
}

// Stylesheet for applying styles to components
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
