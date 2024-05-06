import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

const AdminTabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="flex items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    );
};

const AdminTabLayout = () => {

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#e2896f",
                    tabBarInactiveTintColor: "#5c75be",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                        height: 84,
                    },
                }}
            >
                <Tabs.Screen
                    name="users"
                    options={{
                        title: "Users",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <AdminTabIcon
                                icon={icons.home}
                                color={color}
                                name="Users"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="posts"
                    options={{
                        title: "Posts",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <AdminTabIcon
                                icon={icons.bookmark}
                                color={color}
                                name="Posts"
                                focused={focused}
                            />
                        ),
                    }}
                />



            </Tabs>

            <StatusBar backgroundColor="#020617" style="light" />
        </>
    );
};


export default AdminTabLayout;
