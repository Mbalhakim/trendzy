import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '../components/VideoCard';
import { deletePost } from '../../lib/appwrite'
const PostsCard = ({ listOfData }) => {
  const [posts, setPosts] = useState([]);
  const handleDeletePost = (collectionId) => {
    // Alert before deleting Post
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this Post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deletePost(collectionId);
              fetchData();

              Alert.alert('Success', 'Post deleted successfully');
              useEffect();
            } catch (error) {
              console.log(error)
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


    <View className="px-3">
      <Text className="font-bold	text-white text-3xl my-9">Posts: {posts.length}</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator === null ? 'Deleted User' : item.creator.username}
            avatar={item.creator === null ? 'Deleted User' : item.creator.avatar}
            onpressAction={() => { handleDeletePost(item.$id) }}
          />
        )} />
    </View>


  );
};

export default PostsCard;
