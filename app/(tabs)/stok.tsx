import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { realtimedb } from "../../firebaseConfig";
import { ref, set, get } from "firebase/database";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const sendRealtimeData = () => {
    try {
      if (input1 != "") {
        set(ref(realtimedb, "stok"), {
          pagi: input1,
          siang: input2,
          malam: input3,
        });
      }

      fetchData();
      setInput1("");
      setInput2("");
      setInput3("");
    } catch (e) {}
  };

  const changeMode = () => {
    try {
      set(ref(realtimedb, "mode"), {
        value: stokMode,
      });
      fetchData();
    } catch (e) {}
  };

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [stok1, setStok1] = useState("");
  const [stok2, setStok2] = useState("");
  const [stok3, setStok3] = useState("");
  const [stokMode, setStokMode] = useState(0);

  const handleModeOff = () => {
    setStokMode(1);
    changeMode();
  };
  const handleModeOn = () => {
    setStokMode(0);
    changeMode();
  };

  const fetchData = async () => {
    try {
      const snapshot = await get(ref(realtimedb, "stok"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setStok1(data.pagi);
        setStok2(data.siang);
        setStok3(data.malam);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Stok Obat</ThemedText>
        <ThemedText>Cek dan Setel jumlah stok obat</ThemedText>
      </ThemedView>
      <ThemedView style={styles.groupContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.timePeriodText}>Pagi</Text>
          <Text style={styles.timeText}>{stok1}</Text>

          <TextInput
            value={input1.toString()}
            onChangeText={setInput1}
            keyboardType="numeric"
            style={styles.input}
            placeholder={"input.."}
            placeholderTextColor={"white"}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.timePeriodText}>Siang</Text>
          <Text style={styles.timeText}>{stok2}</Text>

          <TextInput
            value={input2.toString()}
            onChangeText={setInput2}
            keyboardType="numeric"
            style={styles.input}
            placeholder={"input.."}
            placeholderTextColor={"white"}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.timePeriodText}>Malam</Text>
          <Text style={styles.timeText}>{stok3}</Text>

          <TextInput
            value={input3.toString()}
            onChangeText={setInput3}
            keyboardType="numeric"
            style={styles.input}
            placeholder={"input.."}
            placeholderTextColor={"white"}
          />
        </View>
        <View style={styles.buttonContainer}>
          {stokMode ? (
            <Button
              color={"green"}
              title="Mode Isi Ulang : ON"
              onPress={handleModeOn}
            />
          ) : (
            <Button
              color={"red"}
              title="Mode Isi Ulang : OFF"
              onPress={handleModeOff}
            />
          )}
          <Button title="Konfirmasi Stok" onPress={sendRealtimeData} />
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#161719",
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
    flex: 3,
    gap: 10,
    justifyContent: "center",
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
    justifyContent: "space-evenly",
    alignContent: "center",
    gap: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 8,
    color: "white",
    textAlign: "center",
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
