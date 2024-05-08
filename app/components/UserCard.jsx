import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../constants/icons';
import { router } from 'expo-router';
import { deleteUser, signOut } from "../../lib/appwrite"
import { useGlobalContext } from '../../context/GlobalProvider';

const UserCard = ({ listOfData }) => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  const [users, setUsers] = useState([]);


  const handleDeleteUser = (collectionId, userId) => {
    // Alert before deleting user
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteUser(collectionId, userId);
              // Update the user list after deleting the user
              // setUsers(prevUsers => prevUsers.filter(user => user.accountId !== userId));
              Alert.alert('Success', 'User deleted successfully');
              useEffect();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete user');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };


  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data asynchronously
      // Replace this with your actual data fetching logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(listOfData);

    };

    fetchData();
  }, [listOfData]);

  if (users.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950">
        <View className="px-3 py-6">
          <Text className="font-bold text-white text-3xl my-9">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 px-1">
      <TouchableOpacity
        onPress={logout}
        className="flex w-full items-end"
      >
        <Image
          source={icons.logout}
          resizeMode="contain"
          className="w-6 h-6"
        />

      </TouchableOpacity>
      <View className="">
        <Text className="font-bold	text-white text-3xl my-9">Users: {users.length}</Text>
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="space-y-2  ">
              <View className="flex flex-row justify-between mb-10 ">
                <Image
                  style={{ width: 50, height: 50, borderRadius: 20, marginLeft: 3, marginBottom: 28 }}
                  source={{ uri: item.avatar }}
                  alt={`${item.username} profile`}
                />
                <View className="max-w-[250px] ">
                  <Text className="font-bold text-2xl text-white">{item.username} </Text>
                  <Text className="font-bold text-lg text-white">{item.email} </Text>
                  <Text className="font-bold text-sm text-white">ID: {item.accountId} Role {item.Role}</Text>

                </View>

                <View className="">
                  <TouchableOpacity onPress={() => handleDeleteUser(item.$id, item.accountId)}>
                    <Image

                      source={icons.minus}
                      alt={`${item.username} delete user`}
                      className="w-11 h-11"
                    />
                  </TouchableOpacity>
                </View>
              </View>


            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserCard;
