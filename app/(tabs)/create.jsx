import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    Alert,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import icons from "../../constants/icons";
import { createVideoPost } from "../../lib/appwrite";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
    const { user } = useGlobalContext();
    const [uploading, setUploading] = useState(false);
    const [videoSizeCheck, setVideoSizeCheck] = useState(false);
    const [imageSizeCheck, setImageSizeCheck] = useState(false);
    const [form, setForm] = useState({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
        videoExternalUrl: "",
        thumbnailExternalUrl: "", // Add thumbnailExternalUrl field
    });

    const openPicker = async (selectType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type:
                selectType === "image"
                    ? [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/bmp",
                        "image/webp", // Additional type supported by both Android and iOS
                    ]
                    : ["video/mp4", "video/gif"],
        });

        if (!result.canceled) {
            if (selectType === "image") {
                const selectedImage = result.assets[0];
                if (selectedImage.size > 1548) {
                    setImageSizeCheck(true);
                    setForm({ ...form, thumbnail: null, thumbnailExternalUrl: "Enter Thumnail Url" });
                } else {
                    setForm({ ...form, thumbnail: selectedImage, thumbnailExternalUrl: null });
                }
            }

            if (selectType === "video") {
                const selectedVideo = result.assets[0];
                if (selectedVideo.size > 1548) {
                    setVideoSizeCheck(true);
                    setForm({ ...form, video: null, videoExternalUrl: "Enter Video Url" });
                } else {
                    setForm({ ...form, video: selectedVideo, videoExternalUrl: null });
                }
            }
        } else {
            if (selectType === "image") {
                setImageSizeCheck(false);
                setForm({ ...form, thumbnail: null, thumbnailExternalUrl: null });
            } else {
                setVideoSizeCheck(false);
                setForm({ ...form, video: null, videoExternalUrl: null });
            }
            setTimeout(() => {
                Alert.alert("Document picked", JSON.stringify(result, null, 2));
            }, 100);
        }
    };

    const submit = async () => {
        if (
            (form.prompt === "") |
            (form.title === "")
        ) {
            return Alert.alert("Please provide all fields");
        }

        if (!form.video && !form.videoExternalUrl) {
            if (!form.video) {
                return Alert.alert("Please upload a video");
            }
            if (!form.videoExternalUrl) {
                return Alert.alert("Please provide a video external URL");
            }
        }
        if (!form.thumbnail && !form.thumbnailExternalUrl) {
            if (!form.thumbnail) {
                return Alert.alert("Please upload a thumbnail");
            }
            if (!form.thumbnailExternalUrl) {
                return Alert.alert("Please provide a thumbnail external URL");
            }
        }

        setUploading(true);
        try {
            await createVideoPost({
                ...form,
                userId: user.$id,
                video: videoSizeCheck ? form.videoExternalUrl : form.video,
                thumbnail: imageSizeCheck ? form.thumbnailExternalUrl : form.thumbnail,
            });

            Alert.alert("Success", "Post uploaded successfully");
            router.push("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setForm({
                title: "",
                video: null,
                thumbnail: null,
                prompt: "",
                videoExternalUrl: "",
                thumbnailExternalUrl: "",
            });

            setUploading(false);
            setImageSizeCheck(false);
            setVideoSizeCheck(false);
        }
    };


    return (
        <SafeAreaView className="bg-slate-950 h-full">
            <ScrollView className="px-4 my-6">
                <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

                <FormField
                    title="Video Title"
                    value={form.title}
                    placeholder="Give your video a catchy title..."
                    handleChangeText={(e) => setForm({ ...form, title: e })}
                    otherStyles="mt-10"
                />

                {!videoSizeCheck ? (
                    <View className="mt-7 space-y-2">
                        <Text className="text-base text-gray-100 font-pmedium">
                            Upload Video
                        </Text>

                        <TouchableOpacity onPress={() => openPicker("video")}>
                            {form.video ? (
                                <Video
                                    source={{ uri: form.video.uri }}
                                    className="w-full h-64 rounded-2xl"
                                    useNativeControls
                                    resizeMode={ResizeMode.COVER}
                                    isLooping
                                />
                            ) : (
                                <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                                    <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                                        <Image
                                            source={icons.upload}
                                            resizeMode="contain"
                                            alt="upload"
                                            className="w-3/4 h-3/4"
                                        />
                                    </View>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FormField
                        title="Video External URL"
                        value={form.videoExternalUrl}
                        placeholder="Paste the URL of your video..."
                        handleChangeText={(e) => setForm({ ...form, videoExternalUrl: e })}
                        otherStyles="mt-7"
                    />
                )}

                {!imageSizeCheck ? (
                    <View className="mt-7 space-y-2">
                        <Text className="text-base text-gray-100 font-pmedium">
                            Upload Thumbnail
                        </Text>

                        <TouchableOpacity onPress={() => openPicker("image")}>
                            {form.thumbnail ? (
                                <Image
                                    source={{ uri: form.thumbnail.uri }}
                                    resizeMode="cover"
                                    className="w-full h-64 rounded-2xl"
                                />
                            ) : (
                                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                                    <Image
                                        source={icons.upload}
                                        resizeMode="contain"
                                        alt="upload"
                                        className="w-5 h-5"
                                    />
                                    <Text className="text-sm text-gray-100 font-pmedium">
                                        Choose a file
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FormField
                        title="Thumbnail External URL"
                        value={form.thumbnailExternalUrl}
                        placeholder="Paste the URL of your thumbnail..."
                        handleChangeText={(e) => setForm({ ...form, thumbnailExternalUrl: e })}
                        otherStyles="mt-7"
                    />
                )}

                <FormField
                    title="AI Prompt"
                    value={form.prompt}
                    placeholder="The AI prompt of your video...."
                    handleChangeText={(e) => setForm({ ...form, prompt: e })}
                    otherStyles="mt-7"
                />

                <CustomButton
                    title="Submit & Publish"
                    handlePress={submit}
                    containerStyles=""
                    bgStyle="bg-red-100 my-7"
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;
