import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';

interface BottomSlideProps {
  isBottomSlideOpen: boolean;
  hideBackdrop?: boolean;
  backdropStyle?: StyleProp<ViewStyle>;
  handleClose: () => void;
}

export const BackDrop: React.FC<BottomSlideProps> = ({
  isBottomSlideOpen,
  hideBackdrop = false,
  backdropStyle,
  handleClose,
}) => {
  if (!isBottomSlideOpen || hideBackdrop) return null;

  return (
    <View style={[styles.backdrop, backdropStyle]}>
      <Pressable style={styles.backdropButton} onPress={handleClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropButton: {
    flex: 1,
  },
});
