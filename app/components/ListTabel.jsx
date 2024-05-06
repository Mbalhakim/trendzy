import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserCard = ({ listOfData }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
     
      setUsers(listOfData);
    };

    fetchData();
  }, [listOfData]);

  if (users.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950">
        <View className="px-3 py-6">
          <Text className="font-bold	text-white text-3xl my-9">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView>
        <View className="px-3 py-6">
          <Text className="font-bold	text-white text-3xl my-9">Users: {users.length}</Text>
          {users.map((user, index) => (
            <View key={index} className="space-y-2">
              <View className="flex-row items-center mb-7">
                <Image
                  style={{ width: 60, height: 60, borderRadius: 20, marginRight: 12 }}
                  source={{ uri: user.avatar }}
                  alt={`${user.username} profile`}
                />
                <View className="border-red-500">
                  <Text className="font-bold text-3xl text-white">{user.username}</Text>
                  <Text className="font-bold text-sm text-white">{user.email}</Text>
                </View>
              </View>
              <View className="border-t-2 border-t-teal-800 pt-8">
                <Text className="font-bold text-sm text-white">Role: {user.role}</Text>
                <Text className="font-bold text-sm text-white">Account ID: {user.accountId}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserCard;
