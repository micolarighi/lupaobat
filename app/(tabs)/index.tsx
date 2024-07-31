import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { realtimedb } from "../../firebaseConfig";
import { ref, set, get } from "firebase/database";

// notifications imports
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants"; // Optional
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Initialize the notification service
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Register for push notifications
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    if (Constants.easConfig?.projectId) {
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.easConfig.projectId,
        })
      ).data;
      console.log(token);
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

// Send the notification
async function schedulePushNotification(id: any, time: any) {
  await Notifications.cancelScheduledNotificationAsync(id); // Cancel any existing notification with the same id

  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: {
      title: "Notifikasi dari LupaObat 🔔",
      body: "Sudah waktunya untuk pasien anda minum obat",
      data: { data: "" },
    },
    trigger: {
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeats: true,
    }, // Schedule notification at specified time daily
  });
}

export default function App() {
  const sendRealtimeData = () => {
    try {
      set(ref(realtimedb, "waktu"), {
        pagi: selectedTime1.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
        siang: selectedTime2.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
        malam: selectedTime3.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
        // timestamp: Date.now(),
      })
        .then(() => {
          console.log("Data sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending data: ", error);
        });
    } catch (e) {
      console.error("Exception: ", e);
    }
  };

  function convertTimeStringToDate(timeString: any) {
    const [time, period] = timeString.split(" ");
    let [hours, minutes, seconds] = time.split(":");

    // Convert to numbers
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    seconds = parseInt(seconds, 10);

    // Adjust hours for AM/PM
    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    // Create a new Date object with today's date and the specified time
    const now = new Date();
    now.setHours(hours, minutes, seconds, 0);
    return now;
  }

  const fetchData = async () => {
    try {
      const snapshot = await get(ref(realtimedb, "waktu"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSelectedTime1(convertTimeStringToDate(data.pagi));
        setSelectedTime2(convertTimeStringToDate(data.siang));
        setSelectedTime3(convertTimeStringToDate(data.malam));
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const [showTimePicker1, setShowTimePicker1] = useState(false);
  const [selectedTime1, setSelectedTime1] = useState(new Date());

  const [showTimePicker2, setShowTimePicker2] = useState(false);
  const [selectedTime2, setSelectedTime2] = useState(new Date());

  const [showTimePicker3, setShowTimePicker3] = useState(false);
  const [selectedTime3, setSelectedTime3] = useState(new Date());

  const showPicker1 = () => {
    setShowTimePicker1(true);
  };

  const hidePicker1 = () => {
    setShowTimePicker1(false);
  };

  const handleTimeChange1 = (event: any, selectedTime: any) => {
    if (selectedTime) {
      setSelectedTime1(selectedTime);
      schedulePushNotification("timer1", selectedTime);
      hidePicker1();
    } else {
      hidePicker1();
    }
  };

  const showPicker2 = () => {
    setShowTimePicker2(true);
  };

  const hidePicker2 = () => {
    setShowTimePicker2(false);
  };

  const handleTimeChange2 = (event: any, selectedTime: any) => {
    if (selectedTime) {
      setSelectedTime2(selectedTime);
      schedulePushNotification("timer2", selectedTime);
      hidePicker2();
    } else {
      hidePicker2();
    }
  };

  const showPicker3 = () => {
    setShowTimePicker3(true);
  };

  const hidePicker3 = () => {
    setShowTimePicker3(false);
  };

  const handleTimeChange3 = (event: any, selectedTime: any) => {
    if (selectedTime) {
      setSelectedTime3(selectedTime);
      schedulePushNotification("timer3", selectedTime);
      hidePicker3();
    } else {
      hidePicker3();
    }
  };

  useEffect(() => {
    const initializeNotification = async () => {
      await registerForPushNotificationsAsync();
      await schedulePushNotification("timer1", selectedTime1);
      await schedulePushNotification("timer2", selectedTime2);
      await schedulePushNotification("timer3", selectedTime3);
    };

    initializeNotification();
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.titleWave}>
          <ThemedText type="title">Halo Perawat</ThemedText>
          <HelloWave />
        </View>
        <ThemedText>Setel jadwal obat untuk pasien anda</ThemedText>
      </ThemedView>

      <ThemedView style={styles.timeGroupContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timePeriodText}>Pagi</Text>
          <Text style={styles.timeText}>
            {selectedTime1.toLocaleTimeString()}
          </Text>
          <Button title="Atur Waktu" onPress={showPicker1} />
          {showTimePicker1 && (
            <DateTimePicker
              testID="dateTimePicker1"
              value={selectedTime1}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange1}
            />
          )}
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timePeriodText}>Siang</Text>
          <Text style={styles.timeText}>
            {selectedTime2.toLocaleTimeString()}
          </Text>
          <Button title="Atur Waktu" onPress={showPicker2} />
          {showTimePicker2 && (
            <DateTimePicker
              testID="dateTimePicker2"
              value={selectedTime2}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange2}
            />
          )}
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timePeriodText}>Malam</Text>
          <Text style={styles.timeText}>
            {selectedTime3.toLocaleTimeString()}
          </Text>
          <Button title="Atur Waktu" onPress={showPicker3} />
          {showTimePicker3 && (
            <DateTimePicker
              testID="dateTimePicker3"
              value={selectedTime3}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange3}
            />
          )}
        </View>
        <Button title="Konfirmasi Waktu" onPress={sendRealtimeData} />
      </ThemedView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#161719",
  },
  timeContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 110,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
    gap: 8,
  },
  timeGroupContainer: {
    flex: 3,
    gap: 10,
    justifyContent: "center",
  },
  titleWave: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeText: {
    color: "white",
    fontSize: 20,
  },
  timePeriodText: {
    color: "white",
    fontSize: 20,
  },
});
