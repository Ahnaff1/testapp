import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Responsive from '../constants/Responsive';

interface LoaderProps {
  visible: boolean;
}

const LoaderModal: React.FC<LoaderProps> = ({visible}) => (
  <Modal
    statusBarTranslucent
    style={styles.modalContainer}
    animationType="fade"
    transparent
    visible={visible}>
    <View style={styles.modalBody}>
      <ActivityIndicator size={Responsive.font(50)} animating color={'black'} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalBody: {
    flex: 1,
    backgroundColor: '#00000080',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoaderModal;
