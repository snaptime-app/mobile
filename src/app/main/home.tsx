import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}
      >
        Press me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
