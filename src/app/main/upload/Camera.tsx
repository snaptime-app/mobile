import { View } from "react-native";
import { Text, Button, FAB, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  type CameraCapturedPicture,
  type CameraViewRef,
} from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";

export function Camera() {
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [pictureUri, setPictureUri] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const camera = useRef<CameraView>(null);

  if (!permission) {
    return null;
  }

  async function takePicture() {
    if (!camera.current || !isCameraReady) {
      return;
    }

    setPictureUri((await camera.current.takePictureAsync())?.uri ?? null);
  }

  async function resetPicture() {
    setPictureUri(null);
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.cameraContainer,
          {
            backgroundColor: theme.colors.secondaryContainer,
            borderColor: theme.colors.secondary,
          },
        ]}
      >
        {permission.granted ? (
          <>
            {!pictureUri ? (
              <CameraView
                style={styles.camera}
                onCameraReady={() => setIsCameraReady(true)}
                ref={camera}
                facing="back"
                animateShutter={false}
                autofocus="on"
                flash="off"
                videoStabilizationMode="standard"
              >
                <View style={styles.fabBar}>
                  <FAB
                    style={styles.fab}
                    onPress={takePicture}
                    icon="camera-outline"
                    key="camera"
                    mode="flat"
                  />
                </View>
              </CameraView>
            ) : (
              <>
                <Image style={styles.image} source={pictureUri}></Image>
                <View style={styles.imageOverlay}>
                  <View style={styles.fabBar}>
                    <FAB
                      style={styles.fab}
                      onPress={() => console.log("Pressed")}
                      icon="check"
                      key="check"
                      mode="flat"
                    />
                    <FAB
                      style={styles.fab}
                      onPress={resetPicture}
                      icon="close"
                      key="close"
                      mode="flat"
                    />
                  </View>
                </View>
              </>
            )}
          </>
        ) : (
          <View style={styles.permission}>
            <Text>We need your permission to show the camera</Text>
            <Button mode="contained" onPress={requestPermission}>
              Grant Permission
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
  },
  cameraContainer: {
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
  camera: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  fabBar: {
    marginTop: "auto",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  fab: {
    flexShrink: 1,
    margin: 16,
  },
  permission: {
    flexShrink: 1,
    gap: 10,
  },
});
