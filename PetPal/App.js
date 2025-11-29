import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabNavigator from "./navigation/TabNavigator";
import Auth from "./screens/Auth";
import { enableScreens } from 'react-native-screens';

enableScreens(false);

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUser(null);
    } catch (e) {
      console.error("Failed to clear user token", e);
    }
  };

  return (
    <NavigationContainer>
      {user ? <TabNavigator user={user} onLogout={handleLogout} /> : <Auth onLoginSuccess={setUser} />}
    </NavigationContainer>
  );
}
