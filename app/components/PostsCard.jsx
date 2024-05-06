import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostsCard = ({ listOfData }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      setPosts(listOfData);
    };

    fetchData();
  }, [listOfData]);

  if (posts.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950">
        <View className="px-3 py-6">
          <Text className="font-bold	text-white text-3xl my-9">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (

    <ScrollView>
      <View className="px-3 py-6">
        <Text className="font-bold	text-white text-3xl my-9">Posts: {posts.length}</Text>
        {posts.map((post, index) => (
          <View key={index} className="space-y-2">
            <Text className="text-white">{post.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>

  );
};

export default PostsCard;
