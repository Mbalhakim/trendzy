import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { images } from '../../constants/'
import SearchInput from '../components/SearchInput'
import Trending from '../components/Trending'
import EmptyState from '../components/EmptyState'
import { getAllPosts, getLatestVideos } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
const Home = () => {
    const { user, isLoggedIn } = useGlobalContext();

    const [refreshing, setRefreshing] = useState(false)
    const { data: posts, refetch } = useAppwrite(getAllPosts);
    const { data: latestVideos } = useAppwrite(getLatestVideos);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);

    }

    return (
        <SafeAreaView className="bg-slate-950 h-full">


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
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 ">
                        <View className="justify-between items-start flex-row mb-6 ">
                            <View className="">
                                <Text className="text-sm font-pmedium text-gray-100">Welcome Back</Text>
                                <Text className="text-2xl text-white font-psemibold">{!isLoggedIn ? 'Guest' : user?.username}</Text>
                            </View>
                            <View>
                                <Image source={images.logo}
                                    className="w-20 h-20"
                                    resizeMode='contain' />
                            </View>
                        </View>

                        <SearchInput />


                        <View className="w-full flex-1 pt-5 pb-8 space-y-6">

                            <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos </Text>

                            <Trending posts={latestVideos ?? []} />

                        </View>

                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No videos found"
                        subtitle="Be the first one to upload!" />)}

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />

        </SafeAreaView>
    )
}

export default Home