// PhotoCard.tsx
import React from 'react';
import { View, StyleSheet , Dimensions } from 'react-native';
import { Card, Button, Title, Caption } from 'react-native-paper';

type PhotoCardProps = {
  username: string;
  postedTime: string;
  imageUrl: string;
  onPress: () => void;
};

const { width: screenWidth } = Dimensions.get('window');

export const PhotoCard = ({ username, postedTime, imageUrl, onPress }: PhotoCardProps) => {
  return (
    <Card style={styles.card} mode='contained'>
      <Card.Content>
        <Title>{username}</Title>
        <Caption>{postedTime}</Caption>
      </Card.Content>
      <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
      <Card.Actions style={styles.footer}>
        <Button mode="contained" style={styles.button} onPress={onPress}>
          Attempt
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    width: screenWidth * 0.8,
    backgroundColor: 'purple',
  },
  image: {
    borderRadius: 0,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    alignSelf: 'flex-end',
  },
});
