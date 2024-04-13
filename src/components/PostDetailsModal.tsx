import axios from 'axios';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {baseUrl} from '../applicationProperties';
import Responsive from '../constants/Responsive';
import {PostInterface} from '../interface';
import LoaderModal from './LoaderModal';

interface PostDetailsModalProps {
  visible: boolean;
  onRequestClose: () => void;
  postId: number | null;
}

const PostDetailsModal: React.FC<PostDetailsModalProps> = ({
  visible,
  onRequestClose,
  postId,
}) => {
  // states
  const [postDetails, setPostDetails] = useState<PostInterface | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  // Memoize the fetch function
  const getPostDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl}/${postId}`);
      if (response.status === 200) {
        setPostDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsDataFetched(true);
    }
    ToastAndroid.show(
      `Details modal Rerendered ID : ${postId}`,
      ToastAndroid.SHORT,
    );
    console.log(`Details modal Rerendered ID : ${postId}`);
  }, [postId]);

  // Fetch post details when visible changes
  useEffect(() => {
    if (visible && postId && !isDataFetched) {
      getPostDetails();
    }
  }, [visible]);

  // Memoize JSX elements that depend on postDetails
  const memoizedPostDetails = useMemo(() => {
    if (postDetails) {
      return (
        <View style={{flex: 1}}>
          <Text style={styles.title}>{postDetails.title}</Text>
          <Text style={styles.body}>{postDetails.body}</Text>
          <Text style={styles.userId}>User ID: {postDetails.userId}</Text>
        </View>
      );
    }
    return null;
  }, [postDetails]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <Text style={styles.heading}>Post Details ID : {postId}</Text>
          {memoizedPostDetails}

          <Button title="Close" onPress={onRequestClose} />
        </View>
      </View>

      <LoaderModal visible={isLoading} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000080',
  },
  modalBody: {
    marginTop: Responsive.height(400),
    backgroundColor: 'white',
    padding: Responsive.width(20),
    borderTopLeftRadius: Responsive.width(10),
    borderTopRightRadius: Responsive.width(10),
    flex: 1,
  },
  title: {
    fontSize: Responsive.font(18),
    fontWeight: '600',
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

  heading: {
    fontSize: Responsive.font(18),
    fontWeight: '800',
    color: 'black',
    marginBottom: Responsive.width(18),

    alignSelf: 'center',
  },
});

export default PostDetailsModal;
