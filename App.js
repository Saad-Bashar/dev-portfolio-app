import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/space-grotesk";

export default function App() {
  const { width } = useWindowDimensions();
  let [fontsLoaded] = useFonts({
    "font-bold": SpaceGrotesk_500Medium,
    "font-regular": SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View>
        <LinearGradient
          colors={["rgba(36,36,36,0.01)", "rgba(36,36,36,1)"]}
          style={{
            alignSelf: "center",
            marginTop: 40,
            width: width / 2.2,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 28,
              textAlign: "center",
              fontFamily: "font-regular",
            }}
          >
            adamkeyes
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <Image source={require("./assets/akar-icons_github-fill.png")} />
            <Image source={require("./assets/akar-icons_twitter-fill.png")} />
            <Image source={require("./assets/LinkedIn.png")} />
            <Image
              source={require("./assets/simple-icons_frontendmentor.png")}
            />
          </View>
          <View style={{ paddingTop: 50 }}>
            <Image source={require("./assets/dev.png")} />
          </View>
        </LinearGradient>
        <View
          style={{
            position: "absolute",
            top: 150,
            marginLeft: -20,
            zIndex: -1,
          }}
        >
          <Image source={require("./assets/Group26.png")} />
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 290,
            marginRight: -60,
            height: 130,
            width: 130,
            borderRadius: 75,
            borderColor: "white",
            borderWidth: 1,
          }}
        />
      </View>
      <View
        style={{ marginTop: 30, marginHorizontal: 25, alignSelf: "center" }}
      >
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            fontFamily: "font-bold",
          }}
        >
          Nice to meet you! I’m{" "}
          <Text
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#FF6B6B",
            }}
          >
            Adam Keyes.
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151515",
    paddingTop: 40,
  },
});
