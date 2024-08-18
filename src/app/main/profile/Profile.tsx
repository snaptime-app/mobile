import React, { useState } from 'react';
import { useAuthenticatedUser, useUserUpdate } from "@/lib/query/user";
import { setSession } from "@/lib/utils/session";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text, Dialog, Portal, TextInput } from "react-native-paper";

export function Profile() {
  const { isSuccess, data } = useAuthenticatedUser();
  const { mutate } = useUserUpdate();

  // State for modal visibility and new username input
  const [visible, setVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  // Handle modal visibility
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // Handle name change
  const handleChangeName = () => {
    if (newUsername.trim()) {
      mutate({ newUsername });
      setNewUsername(''); // Clear input field
      hideModal(); // Close modal
    }
  };

  let greeting = "Loading...";
  if (isSuccess) {
    greeting = `Hey, ${data.username}!`;
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title={greeting} />
        <Card.Actions>
          <Button onPress={showModal}>Change Name</Button>
          <Button onPress={() => setSession(null)}>Sign Out</Button>
        </Card.Actions>
      </Card>

      {/* Modal for changing username */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideModal}>
          <Dialog.Title>Change Username</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="New Username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Cancel</Button>
            <Button onPress={handleChangeName}>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
});
