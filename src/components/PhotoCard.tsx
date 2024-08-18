// PhotoCard.tsx
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Card, Button, Title, Caption, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

type PhotoCardProps = {
  username: string;
  postedTime: Date;
  imageUrl: string;
  onPress: () => void;
  isComplete: boolean;
};

const { width: screenWidth } = Dimensions.get("window");

export const PhotoCard = ({
  username,
  postedTime,
  imageUrl,
  onPress,
  isComplete
}: PhotoCardProps) => {
  const { colors } = useTheme();
  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: colors.primaryContainer,
        },
      ]}
      mode="contained"
    >
      <Card.Title
        title={username}
        subtitle={postedTime.toString()} 
        titleVariant="headlineSmall"/>
      <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
      <Card.Actions style={styles.footer}>
        <Button mode="contained" style={[styles.button, {backgroundColor: colors.primary}]} onPress={onPress}>
          {isComplete ? <Text style={{color:colors.onPrimary}}>Details</Text> : <Text style={{color:colors.onPrimary}}>Attempt</Text>}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    width: screenWidth * 0.8,
  },
  image: {
    borderRadius: 0,
  },
  footer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    alignSelf: "flex-end",
  },
});
