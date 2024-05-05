import { View, Text, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { signOut } from '../../lib/appwrite';
import { Stack } from 'expo-router'
import React from 'react'

const AdminLayout = () => {
    // signOut();
    return (
        <>
            <Stack>
                <Stack.Screen name="users" options={{ headerShown: false }} />
                <Stack.Screen name="posts" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default AdminLayout