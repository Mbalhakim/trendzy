import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { images, icons } from '../../constants';
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={` space-y-2 ${otherStyles} `} >
      <Text className="text-white text-lg" >{title}</Text>
      <View className="w-full flex-row h-16 px-4 bg-black-100 border-2 rounded-2xl
       border-slate-700 focus:border-secondary-200 items-center">
        <TextInput className="flex-1 w-full text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#e2896f'}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword} />
        {title === 'Password' && (<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={!showPassword ? icons.eye : icons.eyeHide}
            className="w-6 h-6"
            resizeMode='contain'
          />
        </TouchableOpacity>)}
      </View>
    </View>
  )
}

export default FormField