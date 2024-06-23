import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider as PaperProvider } from 'react-native-paper';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from './js/HomeView';
import MapsScreen from './js/MapView';
import SettingsScreen from './js/SettingsView';
import DetailScreen from './js/DetailsView';
import FavoritesScreen from "./js/FavoritesView";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Light theme colors customization
const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

// Dark theme colors customization
const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(28, 28, 30)',
        card: 'rgb(44, 44, 46)',
        text: 'rgb(242, 242, 242)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

// Mapping of tab names to icon names
const tabIconMappings = {
    Home: 'home',
    Maps: 'map',
    Overview: 'list',
    Settings: 'cog',
    Favorites: 'star',
};

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [jsonData, setJsonData] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Function to retrieve favorites from AsyncStorage
    const getFavorites = async () => {
        try {
            // Retrieve stored favorites from AsyncStorage
            const storedData = await AsyncStorage.getItem('favorites');
            if (storedData !== null) {
                // If favorites exist, update the favorites state with the stored favorites
                setFavorites(JSON.parse(storedData));
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    useEffect(() => {
        // Call the getFavorites function when the component mounts
        getFavorites();
    }, []);

    // Function to update favorites state
    const updateFavorites = (newFavorites) => {
        setFavorites(newFavorites);
    };

    // Function to get the header title based on the focused route
    function getHeaderTitle(route) {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'Details') {
            return 'Details';
        } else {
            return 'Map';
        }
    }

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            // Fetch data from the API
            const response = await fetch('https://stud.hosted.hr.nl/1004288/api/gyms.json');
            const jsonData = await response.json();
            // Update the jsonData state with the fetched data
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    return (
        <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            const iconName = tabIconMappings[route.name];
                            return <Icon name={iconName} color={color} size={size} />;
                        },
                    })}
                >
                    <Tab.Screen name="Home">
                        {(props) => (
                            // HomeScreen component with props
                            <HomeScreen
                                {...props}
                                jsonData={jsonData.gym}
                                fetchData={fetchData}
                                isDarkMode={isDarkMode}
                                favorites={favorites}
                                setFavorites={setFavorites}
                                updateFavorites={updateFavorites}
                            />
                        )}
                    </Tab.Screen>

                    <Tab.Screen
                        name="Maps"
                        options={({ route }) => ({
                            title: getHeaderTitle(route),
                            tabBarStyle: {
                                display: route.name === 'Details' ? 'none' : 'flex',
                            },
                            headerShown: false,
                        })}
                    >
                        {(props) => (
                            <Stack.Navigator initialRouteName="Maps">
                                <Stack.Screen
                                    name="Maps"
                                    options={{
                                        headerShown: true,
                                    }}
                                >
                                    {(props) => (
                                        // MapsScreen component with props
                                        <MapsScreen
                                            {...props}
                                            jsonData={jsonData.gym}
                                            screenProps={{ isDarkMode }}
                                        />
                                    )}
                                </Stack.Screen>
                                <Stack.Screen
                                    name="Details"
                                    component={DetailScreen}
                                    initialParams={{ isDarkMode }}
                                />
                            </Stack.Navigator>
                        )}
                    </Tab.Screen>

                    <Tab.Screen name="Favorites">
                        {(props) => (
                            // FavoritesScreen component with props
                            <FavoritesScreen
                                {...props}
                                jsonData={jsonData.gym}
                                isDarkMode={isDarkMode}
                                favorites={favorites}
                                updateFavorites={updateFavorites}
                            />
                        )}
                    </Tab.Screen>

                    <Tab.Screen name="Settings">
                        {(props) => (
                            // SettingsScreen component with props
                            <SettingsScreen
                                {...props}
                                isDarkMode={isDarkMode}
                                setIsDarkMode={setIsDarkMode}
                            />
                        )}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );

}
