import React, {useCallback, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Responsive from '../constants/Responsive';
import {PostInterface} from '../interface';
import PostDetailsModal from './PostDetailsModal';

const PostItem: React.FC<{
  post: PostInterface;
}> = React.memo(({post}) => {
  // states
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);

  // Memoize the callback function using useCallback
  const toggleDetailsVisible = useCallback((isVisible: boolean) => {
    setDetailsVisible(isVisible);
  }, []);

  // Simulate heavy computation
  const computeHeavyDetail = () => {
    const startTime = performance.now(); // Start measuring time
    let result = post.body;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    result = `${result.slice(0, 50)}...`;
    const endTime = performance.now(); // End measuring time
    const finalTime = (endTime - startTime).toFixed(2);
    console.log(
      'Time taken for the loop  (heavy computation):',
      finalTime,
      'ms',
      'Post ID:',
      post.id,
    ); // Log time taken
    return {result, finalTime};
  };

  // Memoize the heavy computation
  const heavyDetail = React.useMemo(() => computeHeavyDetail(), [post]);

  return (
    <View style={styles.postContainer}>
      <Text style={styles.title}>Id : {post.id}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{heavyDetail.result}</Text>
      <Text style={styles.userId}>User ID: {post.userId}</Text>
      <Text style={styles.userId}>
        Heavy function time : {heavyDetail.finalTime} ms
      </Text>

      <Button title="Details" onPress={() => toggleDetailsVisible(true)} />

      {/* Post details modal */}
      <PostDetailsModal
        visible={detailsVisible}
        onRequestClose={() => toggleDetailsVisible(false)}
        postId={post.id}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  postContainer: {
    borderWidth: Responsive.font(1),
    borderColor: 'black',
    borderRadius: Responsive.width(5),
    padding: Responsive.width(10),
    marginBottom: Responsive.width(10),
  },
  title: {
    fontSize: Responsive.font(18),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: Responsive.width(5),
    textTransform: 'capitalize',
  },
  body: {
    fontSize: Responsive.font(16),
    marginBottom: Responsive.width(5),
    color: 'black',
  },
  userId: {
    fontSize: Responsive.font(14),
    color: 'gray',
  },
});

export default PostItem;
