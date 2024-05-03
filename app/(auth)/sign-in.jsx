import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
const Signin = () => {
    return (
        <SafeAreaView className="bg-slate-900 h-full" >

            <ScrollView>
                <View className="w-full justify-center h-full px-4 my-2">
                    <Image
                        source={images.logo}
                        style={{ height: 150, width: 150 }}
                        className="w-[115px] h-[35px]"

                        resizeMode="contain"
                    />

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Signin