import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '../../lib/useAppwrite';
import { getAllUsers } from '../../lib/appwrite';
import UserCard from '../components/ListTabel';

const Users = () => {
  const { data: users } = useAppwrite(getAllUsers);

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <UserCard listOfData={users || []} />
    </SafeAreaView>
  );
};

export default Users;
