import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from "../../lib/appwrite";
import { useGlobalContext } from '../../context/GlobalProvider';

const Signin = () => {
    const { setUser, setIsLoggedIn } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
        }

        setSubmitting(true);

        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            setUser(result);
            setIsLoggedIn(true);

            Alert.alert("Success", "User signed in successfully");
            router.replace("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <SafeAreaView className="bg-slate-900 h-full" >

            <ScrollView
                contentContainerStyle={{
                    height: '100dvh',
                }}
            >
                <View className="w-full justify-center h-full px-4 my-2">
                    <View className="flex  flex-row items-center mt-2 justify-center">
                        <Image
                            source={images.logo}
                            style={{ height: 100, width: 100 }}
                            className=""

                            resizeMode="contain"
                        />

                        <Text className="text-primary text-6xl mt-2">Trend
                            <Text className="text-secondary-100">Zy</Text></Text>
                    </View>
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Login to your account
                    </Text>

                    <FormField title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({
                            ...form,
                            email: e
                        })}

                        otherStyles="mt-7"
                        keyboardType="email-address"

                    />

                    <FormField title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({
                            ...form,
                            password: e
                        })}
                        otherStyles="mt-7"

                    />


                    <CustomButton
                        title="Login"
                        containerStyle={"mt-7"}
                        handlePress={submit}
                        isLoading={isSubmitting} />

                    <View className=" justify-center pt-5 flex-row gap-3">
                        <Text className="text-red-600 text-lg font-pregular">
                            Don't have account?
                        </Text>
                        <Link href="sign-up"
                            className="text-lg font-pregular text-primary" >Sign Up </Link>

                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Signin