import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {
  const [country, setCountry] = useState<string | undefined>('Ukraine');
  const accessibilityValue = country === undefined ? undefined : { text: country };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <Pressable
          accessibilityLabel="Country"
          accessibilityValue={accessibilityValue}
          style={styles.subject}
          testID="pressable-subject">
          <Text>Pressable: {country ?? 'no value'}</Text>
        </Pressable>
        <View
          accessible
          accessibilityLabel="Country"
          accessibilityValue={accessibilityValue}
          style={styles.subject}
          testID="view-subject">
          <Text>View: {country ?? 'no value'}</Text>
        </View>
        <Button title="Remove the value" onPress={() => setCountry(undefined)} testID="remove" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    padding: 24,
  },
  subject: {
    borderWidth: 1,
    padding: 16,
  },
});

export default App;
