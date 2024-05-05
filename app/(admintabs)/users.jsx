import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '../../lib/useAppwrite';
import { getAllUsers } from '../../lib/appwrite';
import ListTable from '../components/ListTabel';

const Users = () => {
  const { data: users } = useAppwrite(getAllUsers);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'slategray' }}>
      <ListTable listOfData={users || []} dataHead={['Account ID', 'Username', 'Email', 'Role']} />
    </SafeAreaView>
  );
};

export default Users;
