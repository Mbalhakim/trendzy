import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router"


export default function App() {
    return (
        <Stack>

            <Stack.Screen name="index" options={{ headerShown: false }} />

        </Stack>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backGroundColor: 'fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});