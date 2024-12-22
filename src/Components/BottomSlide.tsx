import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  type ReactNode,
} from 'react';
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const EXTRA_SPACE = 75;

interface BottomSlideProps {
  children: ReactNode;
  snapPoints?: number[];
  initialSnapIndex?: number;
  hideBackdrop?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  handleStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
}

export interface BottomSlideRef {
  /**
   * Opens the bottom sheet at the specified index.
   * @param index - The index to open (optional).
   */
  open: (index?: number) => void;

  /**
   * Closes the bottom sheet.
   */
  close: () => void;
}

export const BottomSlide = forwardRef<BottomSlideRef, BottomSlideProps>(
  (
    {
      snapPoints = [],
      initialSnapIndex = 0,
      children,
      containerStyle,
      handleStyle,
      contentStyle,
      backdropStyle,
      hideBackdrop = false,
    },
    ref
  ) => {
    const { height: windowHeight } = useWindowDimensions();
    const flattenedStyle: ViewStyle | undefined =
      StyleSheet.flatten(containerStyle);
    const containerHeight = flattenedStyle?.height;
    if (flattenedStyle) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { height: _, ...restStyle } = flattenedStyle;
      containerStyle = restStyle;
    }

    const [contentHeight, setContentHeight] = useState<number>(0);
    const [isBottomSlideOpen, setIsBottomSlideOpen] = useState<boolean>(false);
    const [activeHeight, setActiveHeight] = useState<number>(0);

    const snapPointsInPixels = snapPoints.map(
      (point) => (point / 100) * windowHeight
    );
    const useContentHeight = snapPointsInPixels.length === 0;

    const translateY = useSharedValue(
      snapPointsInPixels[initialSnapIndex] ?? 0
    );

    const handleOpen = (index: number) => {
      const BottomSlideHeight =
        (useContentHeight
          ? Math.min(Number(containerHeight) || contentHeight, windowHeight)
          : snapPointsInPixels[index]) ?? 0;
      setActiveHeight(BottomSlideHeight);
      setIsBottomSlideOpen(true);

      translateY.value = withSpring(BottomSlideHeight, {
        mass: 1,
        damping: 12,
        stiffness: 80,
      });
    };

    const handleClose = () => {
      setIsBottomSlideOpen(false);
      setActiveHeight(0);
      translateY.value = withSpring(0, {
        overshootClamping: true,
      });
    };

    useImperativeHandle(ref, () => ({
      open: (index = 1) => {
        handleOpen(index);
      },
      close: () => {
        handleClose();
      },
    }));

    const animatedStyle = useAnimatedStyle(() => ({
      height: translateY.value,
    }));

    const onContentLayout = useCallback((event: any) => {
      const { height } = event.nativeEvent.layout;
      setContentHeight(height + EXTRA_SPACE);
    }, []);

    const gesture = Gesture.Pan()
      .onUpdate((e) => {
        translateY.value = activeHeight - e.translationY;
      })
      .onEnd((e) => {
        if (e.velocityY > 0) {
          runOnJS(handleClose)();
        } else {
          runOnJS(handleOpen)(0);
        }
      });

    return (
      <>
        {isBottomSlideOpen && !hideBackdrop && (
          <View style={[styles.backdrop, backdropStyle]}>
            <Pressable style={styles.backdropButton} onPress={handleClose} />
          </View>
        )}
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.container, animatedStyle, containerStyle]}
          >
            <View style={[styles.handleStyle, handleStyle]} />
            <View style={[styles.contentStyle, contentStyle]}>{children}</View>
            <View style={styles.mockContentStyle} onLayout={onContentLayout}>
              {children}
            </View>
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  backdropButton: {
    flex: 1,
  },
  handleStyle: {
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignSelf: 'center',
    marginVertical: 10,
  },
  contentStyle: {
    zIndex: 1,
    flex: 1,
    paddingHorizontal: 20,
  },
  mockContentStyle: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
  },
});
