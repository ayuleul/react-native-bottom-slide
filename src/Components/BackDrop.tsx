import React from 'react';
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

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
  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isBottomSlideOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
        { duration: 700 }
      ),
    };
  });

  if (!isBottomSlideOpen || hideBackdrop) return null;

  return (
    <Animated.View
      style={[styles.backdrop, animatedBackdropStyle, backdropStyle]}
    >
      <Pressable style={styles.backdropButton} onPress={handleClose} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropButton: {
    width: '100%',
    height: '100%',
  },
});
