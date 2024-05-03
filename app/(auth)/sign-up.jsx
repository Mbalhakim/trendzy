import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

const SignUp = () => {

    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });



    return (
        <SafeAreaView className="bg-slate-900 h-full">
            <ScrollView
                contentContainerStyle={{
                    height: '100dvh',
                }}
            >
                <View
                    className="w-full flex justify-center h-full px-4 my-2"
                    style={{
                        minHeight: Dimensions.get("window").height - 100,
                    }}
                >
                    <View className="flex  flex-row items-center  justify-center">
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
                        Create your account
                    </Text>



                    <FormField
                        title="Username"
                        otherStyles="mt-5"
                    />

                    <FormField
                        title="Email"
                        otherStyles="mt-5"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        otherStyles="my-5"
                    />

                    <CustomButton
                        title="Sign Up"
                        containerStyles="mt-5"
                        bgStyle="bg-primary"
                        textStyles="text-stale-800 text-xl"
                    />


                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Have an account already?
                        </Text>
                        <Link
                            href="/sign-in"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Login
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;