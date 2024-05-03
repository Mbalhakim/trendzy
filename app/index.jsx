import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const RootLayout = () => {
    return (
        <View style={styles.container}>
            <Text>index</Text>
            <StatusBar style="auto" />
            <Link href="/profile" style={{ color: 'blue' }} >Go to Profile</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backGroundColor: 'fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default RootLayout


