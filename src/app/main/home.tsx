import { useStatus } from '@/lib/query/status';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export function Home() {
  const { isSuccess, isError, data, error } = useStatus();

  let text = 'Loading...';
  if (isSuccess) {
    text = data.message;
  }
  if (isError) {
    text = error.message;
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
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
