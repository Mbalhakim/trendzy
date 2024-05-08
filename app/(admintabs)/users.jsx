import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '../../lib/useAppwrite';
import { getAllPosts, getAllUsers } from '../../lib/appwrite';
import UserCard from '../components/UserCard';

const Users = () => {
  const { data: users } = useAppwrite(getAllUsers);

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <Text>Users : </Text>
      <UserCard listOfData={users || []} />
    </SafeAreaView>
  );
};

export default Users;
