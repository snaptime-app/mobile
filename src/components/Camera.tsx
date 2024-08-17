import { View } from "react-native";
import { Text, Button, FAB, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  type CameraCapturedPicture,
} from "expo-camera";
import { Image } from "expo-image";
import { createContext, useContext, useRef, useState } from "react";

export { CameraCapturedPicture };
export type CameraEventHandler = (picture: CameraCapturedPicture) => void;

interface CameraContextProps {
  captured: CameraCapturedPicture | null;
  onCapture: CameraEventHandler;
}
const CameraContext = createContext<CameraContextProps | null>(null);

interface CameraProviderProps {
  children: React.ReactNode;
  onCapture?: CameraEventHandler;
}

export function CameraProvider({ children, onCapture }: CameraProviderProps) {
  const [capturedPicture, setCapturedPicture] =
    useState<CameraCapturedPicture | null>(null);

  return (
    <CameraContext.Provider
      value={{
        captured: capturedPicture,
        onCapture: (picture: CameraCapturedPicture) => {
          setCapturedPicture(picture);
          if (onCapture) {
            onCapture(picture);
          }
        },
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }

  return context;
}

interface CameraProps {
  onCapture?: CameraEventHandler;
}
export function Camera({ onCapture: onCaptureFromProp }: CameraProps) {
  const { onCapture: onCaptureFromContext } = useCamera();
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [picture, setPicture] = useState<CameraCapturedPicture | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const camera = useRef<CameraView>(null);

  if (!permission) {
    return null;
  }

  async function takePicture() {
    if (!camera.current || !isCameraReady) {
      return;
    }

    const captured = await camera.current.takePictureAsync();
    if (!captured) {
      return;
    }

    setPicture(captured);
  }

  async function resetPicture() {
    setPicture(null);
  }

  async function confirmPicture() {
    if (picture) {
      onCaptureFromContext(picture);
      if (onCaptureFromProp) {
        onCaptureFromProp(picture);
      }
    }
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
            {!picture ? (
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
                <Image style={styles.image} source={picture.uri}></Image>
                <View style={styles.imageOverlay}>
                  <View style={styles.fabBar}>
                    <FAB
                      style={styles.fab}
                      onPress={confirmPicture}
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
