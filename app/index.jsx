import { ScrollView, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { images } from '../constants';
import CustomButton from './components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
import { signOut } from '../lib/appwrite';
const App = () => {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
    return (
        <SafeAreaView className="bg-slate-950 h-full">

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
            >
                <View className="w-full flex justify-start mt-7 items-center min-h-[85vh] px-4">
                    <View className="flex  flex-column items-center mt-2 justify-center">
                        <Image
                            source={images.logo}
                            style={{ height: 150, width: 150 }}
                            className=""

                            resizeMode="contain"
                        />
                        <Text className="text-primary text-7xl mt-1 ">Trend<Text className="text-secondary-100 text-7xl mt-2 ">Zy</Text></Text>
                    </View>

                    <Image
                        source={images.thumbnail}
                        className="max-w--[580px] w-full h-[300px]"
                        resizeMode="contain"
                    />
                    <Text className="text-white text-start text-lg mt-1 ">
                        <Text className="text-primary text-2xl ">Trend<Text className="text-secondary-100 text-2xl py-3 ">Zy</Text></Text> {" "}Descover Endless Possibilities.{"\n"}

                        <Text className="text-gray-500 dark:text-gray-400" >
                            At  <Text className="text-primary ">Trend</Text>
                            <Text className="text-secondary-100 " >Zy</Text> creativity fuels innovation.
                            It's where imagination meets action,
                            pushing boundaries and reshaping the future</Text>


                    </Text>



                    <CustomButton title="Continue wtih Email"
                        handlePress={() => router.push("/sign-in")}
                        containerStyle="w-full mt-6" />

                    <CustomButton title="Sign Out"
                        handlePress={() => signOut()}
                        containerStyle="w-full mt-6"
                        bgStyle='bg-red-500' />

                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622'
                style='light'
            />
        </SafeAreaView>
    )
}

export default App


