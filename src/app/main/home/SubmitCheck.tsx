import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "./layout";
import { View, StyleSheet } from "react-native";
import { useCamera } from "@/components/Camera";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { Image } from "expo-image";
import { useCreateSubmission } from "@/lib/query/submission";
import { useEffect, useState } from "react";
import { imageKeytoUrl } from "@/lib/utils/image";
import type { ChallengeAttemptResponse } from "@/lib/schema/challenges";
import type { SubmissionCreateResponse } from "@/lib/schema/submission";

type SubmitCheckProps = StackScreenProps<RootStackParamList, "SubmitCheck">;

export function SubmitCheck({ route, navigation }: SubmitCheckProps) {
  const { challengeId } = route.params;
  const { key } = useCamera();
  const { mutate } = useCreateSubmission();
  const [result, setResult] = useState<SubmissionCreateResponse | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!key) return;
    mutate(
      { challengeid: challengeId, imagekey: key },
      {
        onSuccess: (result) => {
          setResult(result);
        },
      },
    );
  }, [mutate, challengeId, key]);

  if (!key) {
    return null;
  }

  let card: {
    isComplete: boolean;
    title: string;
    subtitle: string;
    backgroundColor: string;
    textColor: string;
    actionText: string;
  };
  if (result === null) {
    card = {
      isComplete: false,
      title: "Checking...",
      subtitle: "Our AI is analyzing your submission.",
      backgroundColor: theme.colors.surface,
      textColor: theme.colors.onSurface,
      actionText: "What??",
    };
  } else if (result.isCorrect === true) {
    card = {
      isComplete: true,
      title: "Success!",
      subtitle: "Your submission has been accepted.",
      backgroundColor: theme.colors.primaryContainer,
      textColor: theme.colors.onPrimaryContainer,
      actionText: "Yay!",
    };
  } else {
    card = {
      isComplete: true,
      title: "Failed",
      subtitle: "Your submission has been rejected.",
      backgroundColor: theme.colors.errorContainer,
      textColor: theme.colors.onErrorContainer,
      actionText: "Okay...",
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageKeytoUrl(key)} />
        <View style={styles.imageOverlay}>
          <Card
            style={[styles.card, { backgroundColor: card.backgroundColor }]}
          >
            <Card.Title
              titleStyle={{ color: card.textColor }}
              subtitleStyle={{ color: card.textColor }}
              title={card.title}
              subtitle={card.subtitle}
            />
            {card.isComplete ? (
              <Card.Actions>
                <Button
                  labelStyle={{ color: card.textColor }}
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => {
                    if (result) {
                      navigation.navigate("GroupDetail", {
                        groupId: result.challenge.groupId,
                      });
                    } else {
                      navigation.navigate("GroupList");
                    }
                  }}
                >
                  {card.actionText}
                </Button>
              </Card.Actions>
            ) : null}
          </Card>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    flex: 1,
    margin: 30,
    borderRadius: 20,
    borderWidth: 3,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  card: {
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
});
