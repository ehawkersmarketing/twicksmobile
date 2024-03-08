import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
// import { ScrollView } from "react-native-gesture-handler";

const TermAndCondition = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView>
          <ScrollView>
            <View style={{ padding: 15 }}>
              <Text
                style={{ fontSize: 40, fontWeight: "bold", color: "#000000" }}
              >
                Terms and Conditions
              </Text>
              <View style={styles.line}></View>
              <Text style={styles.text}>
                These Terms and Conditions outline the rules and regulations for
                the use of our website. By accessing this website, you accept
                these terms and conditions.
              </Text>
              <Text style={styles.HeadMain}>Intellectual Property Rights:</Text>
              <Text style={styles.text}>
                The content and materials on this website, including text,
                graphics, logos, and images, are the property of TAFI and are
                protected by applicable copyright and trademark laws.
              </Text>
              <Text style={styles.HeadMain}>Use License:</Text>
              <Text style={styles.text}>
                Permission is granted to temporarily download one copy of the
                materials on TAFI's website for personal, non-commercial
                transitory viewing only. This is the grant of a license, not a
                transfer of title.
              </Text>
              <Text style={styles.HeadMain}>Disclaimer:</Text>
              <Text style={styles.text}>
                The materials on TAFI's website are provided on an 'as is'
                basis. TAFI makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </Text>
              <Text style={styles.HeadMain}>Limitations:</Text>
              <Text style={styles.text}>
                In no event shall TAFI or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on TAFI's website, even if
                TAFI or a TAFI authorized representative has been notified
                orally or in writing of the possibility of such damage.
              </Text>
              <Text style={styles.HeadMain}>Revisions:</Text>
              <Text style={styles.text}>
                TAFI does not warrant that any of the materials on its website
                are accurate, complete, or current. TAFI may make changes to the
                materials contained on its website at any time without notice.
              </Text>
              <Text style={styles.text}>
                By using this website, you agree to abide by these terms and
                conditions. If you do not agree with any of these terms, please
                do not use our website.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default TermAndCondition;

const styles = StyleSheet.create({
  HeadMain: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#000000",
    paddingVertical: 10,
  },
  subMain: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#000000",
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    color: "#000000",
    paddingVertical: 10,
    textAlign: "justify",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});
