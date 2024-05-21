import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

// notifications imports
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants"; // Optional
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
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
async function schedulePushNotification(id : any, time : any) {
  await Notifications.cancelScheduledNotificationAsync(id); // Cancel any existing notification with the same id

  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: {
      title: "You've got a notification! 🔔",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { hour: time.getHours(), minute: time.getMinutes(), repeats: true }, // Schedule notification at specified time daily
  });
}

export default function App() {
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

  const handleTimeChange1 = (event : any, selectedTime : any) => {
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

  const handleTimeChange2 = (event : any, selectedTime : any) => {
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

  const handleTimeChange3 = (event : any, selectedTime : any) => {
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
  }, []);

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.titleWave}>
            <ThemedText type="title">Halo Perawat</ThemedText>
            <HelloWave />
        </View>
        <ThemedText>Setel jadwal obat untuk pasien anda!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.timeGroupContainer}>

      <View style={styles.timeContainer}>

        <Text style={styles.timeText}>
          Pagi
        </Text>
        <Text style={styles.timeText}>{selectedTime1.toLocaleTimeString()}</Text>
        <Button title="Setel Waktu" onPress={showPicker1} />
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
        <Text style={styles.timeText}>
          Siang
        </Text>
        <Text style={styles.timeText}>{selectedTime2.toLocaleTimeString()}</Text>
        <Button title="Setel Waktu" onPress={showPicker2} />
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
        <Text style={styles.timeText}>
          Malam
        </Text>
        <Text style={styles.timeText}>{selectedTime3.toLocaleTimeString()}</Text>
        <Button title="Setel Waktu" onPress={showPicker3} />
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
      </ThemedView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 60,
    backgroundColor : "#161719",
  },
  timeContainer : {
    flex: 1,
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "space-around",
    gap : 12,
    paddingHorizontal : 10,
    borderRadius : 12,
    borderWidth : 2,
    borderColor : "white"
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    gap: 8,
  },
  timeGroupContainer : {
    flex : 3,
    gap : 20,
    justifyContent : "center",
  },
  titleWave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText : {
    color : 'white',
    fontSize : 20,
  }, 
});
