import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {baseUrl} from '../applicationProperties';
import LoaderModal from '../components/LoaderModal';
import PostItem from '../components/PostItem';
import Responsive from '../constants/Responsive';
import {PostInterface} from '../interface';

export default function HomeScreen() {
  // types
  type RenderItemType = ListRenderItem<PostInterface>;

  // states
  const [postsData, setPostsData] = useState<PostInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // functions to get list of posts
  const getPostsData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(baseUrl);
      if (response.status === 200) {
        setPostsData(response.data);
      }
    } catch (error) {
      Alert.alert('Network Error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // get all post when component mounts
  useEffect(() => {
    getPostsData();
  }, []);

  // Render each item in FlatList
  const renderItem: RenderItemType = useCallback(({item}) => {
    return <PostItem post={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />

      {/* List of posts */}
      <FlatList
        data={postsData}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        windowSize={5}
      />

      <LoaderModal visible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: Responsive.width(10),
  },
});
