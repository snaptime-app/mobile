// PhotoCard.tsx
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Card, Button, Title, Caption, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

type PhotoCardProps = {
  username: string;
  postedTime: Date;
  imageUrl: string;
  onPress?: () => void;
  isComplete: boolean;
};

const { width: screenWidth } = Dimensions.get("window");

export const PhotoCard = ({
  username,
  postedTime,
  imageUrl,
  onPress,
  isComplete,
}: PhotoCardProps) => {
  const { colors } = useTheme();
  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: isComplete
            ? colors.primaryContainer
            : colors.tertiaryContainer,
        },
      ]}
      mode="contained"
    >
      <Card.Title
        style={styles.title}
        title={username}
        subtitle={dayjs(postedTime).fromNow()}
        titleVariant="headlineSmall"
      />
      <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
      {onPress ? (
        <Card.Actions style={styles.footer}>
          <Button
            mode="contained"
            style={[
              styles.button,
              {
                backgroundColor: isComplete ? colors.primary : colors.tertiary,
              },
            ]}
            onPress={onPress}
          >
            {isComplete ? (
              <Text style={{ color: colors.onPrimary }}>Details</Text>
            ) : (
              <Text style={{ color: colors.onPrimary }}>Attempt</Text>
            )}
          </Button>
        </Card.Actions>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
    overflow: "hidden",
    width: screenWidth * 0.8,
  },
  title: {
    margin: 8,
  },
  image: {
    borderRadius: 0,
  },
  footer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 16,
  },
  button: {
    alignSelf: "flex-end",
  },
});
