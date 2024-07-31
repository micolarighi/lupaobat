import { StyleSheet, View, Text, TextInput, Alert, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { realtimedb } from "../../firebaseConfig";
import { ref, set, onValue, off } from "firebase/database";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [status1, setStatus1] = useState(0);
  const [status2, setStatus2] = useState(0);
  const [status3, setStatus3] = useState(0);
  const [temperatur, setTemperatur] = useState();

  useEffect(() => {
    const statusRef = ref(realtimedb, "status");
    const unsubscribe = onValue(
      statusRef,
      (snapshot: any) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setStatus1(data.pagi);
          setStatus2(data.siang);
          setStatus3(data.malam);
          setTemperatur(data.suhu);
        } else {
          console.log("No data available");
        }
      },
      (error: any) => {
        console.error("Error fetching data:", error);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => off(statusRef, "value", unsubscribe);
  }, []);

  const resetStatus = () => {
    setStatus1(0);
    setStatus2(0);
    setStatus3(0);
    try {
      set(ref(realtimedb, "status"), {
        pagi: 0,
        siang: 0,
        malam: 0,
        suhu: temperatur,
      });
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Status</ThemedText>
        <ThemedText>Cek status obat harian pasien anda</ThemedText>
      </ThemedView>
      <ThemedView style={styles.groupContainer}>
        <View style={styles.timeStatusContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>Pagi</Text>
            <Text style={styles.timeText}>{status1 ? "✅" : "❌"}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>Siang</Text>
            <Text style={styles.timeText}>{status2 ? "✅" : "❌"}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>Malam</Text>
            <Text style={styles.timeText}>{status3 ? "✅" : "❌"}</Text>
          </View>
        </View>

        <View style={styles.temperatureContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>Suhu</Text>
            <Text style={styles.timeText}>{temperatur} °c</Text>
          </View>
        </View>
        <Button title="Reset Status" onPress={resetStatus} />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#161719",
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
    gap: 8,
  },

  flatlist: {
    width: "100%",
  },
  groupContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    justifyContent: "center",
  },
  timeStatusContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  temperatureContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  timePeriodText: {
    color: "white",
    fontSize: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 110,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
  },
  btn: {
    backgroundColor: "#2196f3",
    padding: 20,
    borderRadius: 2,
  },
  btnText: {
    color: "white",
  },
  timeText: {
    color: "white",
    fontSize: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});
