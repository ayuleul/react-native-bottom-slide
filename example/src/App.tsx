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
