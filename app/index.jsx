import { StatusBar, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const RootLayout = () => {
    return (
        <View className="flex-1 items-center justify-center bg-red-200">
            <Text className="text-3xl">index</Text>
            <StatusBar style="auto" />
            <Link href="/profile" style={{ color: 'blue' }} >Go to Profile</Link>
        </View>
    )
}

export default RootLayout


