import { View, Text } from 'react-native'
import React from 'react'
import { getAllPosts } from '../../lib/appwrite';
import PostsCard from '../components/PostsCard';
import useAppwrite from '../../lib/useAppwrite';
import { SafeAreaView } from 'react-native-safe-area-context';

const Posts = () => {
  const { data: posts } = useAppwrite(getAllPosts);
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <PostsCard listOfData={posts || []} />
    </SafeAreaView>
  )
}

export default Posts