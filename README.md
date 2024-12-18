

# react-native-bottom-slide

A lightweight and customizable bottom sheet library for React Native. It provides smooth animations, gesture support, and multi-state layouts, making it perfect for creating modals, menus, and expandable views.

## Features
- Customizable bottom slide component.
- Smooth animations for sliding in and out.
- Gesture support for a responsive experience.
- Compatible with Android, iOS, and Web.

## Installation

### Using Yarn:
```bash
yarn add react-native-bottom-slide
```

### Using npm:
```bash
npm install react-native-bottom-slide
```

For React Native Web, ensure you also install the required dependencies:

### Using Yarn:
```bash
yarn add react-native-gesture-handler react-native-reanimated
```

### Using npm:
```bash
npm install react-native-gesture-handler react-native-reanimated
```

## Usage Example

Here’s a simple example of how to use `react-native-bottom-slide` in your React Native app:

```tsx
import React, { useRef } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { BottomSlide, type BottomSlideRef } from 'react-native-bottom-slide';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App: React.FC = () => {
  const bottomSlideRef = useRef<BottomSlideRef>(null);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Text style={styles.title}>Bottom Slide with the Content Height</Text>
        <Button
          title="Open Bottom Slide"
          onPress={() => bottomSlideRef.current?.open(1)}
        />
        <BottomSlide ref={bottomSlideRef}>
          <View>
            <Text style={styles.description}>
              This is some content inside the bottom slide. The height will
              adjust based on the content.
            </Text>
            <Button
              title="Close"
              onPress={() => bottomSlideRef.current?.close()}
            />
          </View>
        </BottomSlide>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default App;
```

### Explanation:
- **BottomSlide**: The bottom sheet component that can be opened and closed using `open()` and `close()` methods.
- **GestureHandlerRootView**: Required for gesture handling in React Native.
- **bottomSlideRef**: A reference to control the BottomSlide component programmatically.

## API

### Methods

| Method              | Description                                      |
|---------------------|--------------------------------------------------|
| `open(height: number)` | Opens the bottom slide with the specified height. |
| `close()`           | Closes the bottom slide.                        |

### Props

| Prop                | Type                                        | Default Value     | Description                                                    |
|---------------------|---------------------------------------------|-------------------|----------------------------------------------------------------|
| `children`          | `ReactNode`                                 | -                 | The content inside the bottom slide.                           |
| `snapPoints?`       | `number[]`                                  | []                | Array of snap points defining the slide's height positions.    |
| `initialSnapIndex?` | `number`                                    | `0`               | The index of the snap point where the bottom slide will open initially. |
| `hideBackdrop?`     | `boolean`                                   | `false`           | Whether to hide the backdrop (default: `false`).               |
| `containerStyle?`   | `StyleProp<ViewStyle>`                      | -                 | Custom styles for the container of the bottom slide.          |
| `handleStyle?`      | `StyleProp<ViewStyle>`                      | -                 | Custom styles for the handle that triggers the slide.         |
| `contentStyle?`     | `StyleProp<ViewStyle>`                      | -                 | Custom styles for the content area inside the bottom slide.   |
| `backdropStyle?`    | `StyleProp<ViewStyle>`                      | -                 | Custom styles for the backdrop behind the bottom slide.       |

## License

MIT License
