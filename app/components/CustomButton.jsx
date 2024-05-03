import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({
    title, handlePress, containerStyle, textStyles, isLoading
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center 
            ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading} >

            <Text className={`text-center text-slate-950 text-lg font-psemibold ${textStyles}`}> {title} </Text>
        </TouchableOpacity>
    )
}

export default CustomButton