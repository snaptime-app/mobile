import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export const GroupDetail = () => {
  const route = useRoute();
  const { groupId } = route.params as { groupId: string };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Detail</Text>
      <Text style={styles.details}>Selected Group ID: {groupId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 18,
  },
});
