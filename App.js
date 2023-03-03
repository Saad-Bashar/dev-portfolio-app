import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import PersonalPortfolio from "./app/screens/PersonalPortfolio";
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
  SpaceGrotesk_600SemiBold,
  useFonts,
} from "@expo-google-fonts/space-grotesk";

export default function App() {
  const [fontsLoaded] = useFonts({
    heading: SpaceGrotesk_700Bold,
    body: SpaceGrotesk_500Medium,
    subheading: SpaceGrotesk_600SemiBold,
  });

  if (!fontsLoaded) {
    <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <PersonalPortfolio />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
