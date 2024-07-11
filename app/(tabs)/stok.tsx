import { Button, StyleSheet, View, Text, TextInput, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';

interface DocumentData {
  id: string;
  value: string;
  timestamp?: {
    toDate: () => Date;
  };
}

export default function HomeScreen() {
    const [data, setData] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({
      input1: '',
      input2: '',
      input3: ''
    });
  
    const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'waktu'));
      const documents = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        value: doc.data().value,
        timestamp: doc.data().timestamp
      }));
      setData(documents);
      setLoading(false);
    } catch (e) {
      console.error('Firestore Error:', e);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  const handleChange = (text : any, field : any) => {
    // Validate input and set state accordingly
    if (/^\d*$/.test(text) && (text === '' || parseInt(text, 10) <= 30)) {
      setInputs({
        ...inputs,
        [field]: text
      });
    } else if (parseInt(text, 10) > 30) {
      Alert.alert('Input tidak valid', 'Nilai maksimum yang diizinkan adalah 30.');
    } else {
      Alert.alert('Input tidak valid', 'Masukkan hanya angka positif.');
    }
  };

  return (
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Stok Obat</ThemedText>
            <ThemedText>Cek dan Setel jumlah stok obat pasien anda!</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stockGroupContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>
              Pagi
            </Text>
            <TextInput
            value={inputs.input1}
            onChangeText={(text) => handleChange(text, 'input1')}
            keyboardType="numeric"
            placeholder="Masukkan jumlah obat"
            style={styles.input}
            />
          </View>

        </ThemedView>

        <ThemedView style={styles.stockGroupContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>
              Pagi
            </Text>
            <TextInput
            value={inputs.input2}
            onChangeText={(text) => handleChange(text, 'input2')}
            keyboardType="numeric"
            placeholder="Masukkan jumlah obat"
            style={styles.input}
            />
          </View>

        </ThemedView>

        <ThemedView style={styles.stockGroupContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>
              Pagi
            </Text>
            <TextInput
            value={inputs.input3}
            onChangeText={(text) => handleChange(text, 'input3')}
            keyboardType="numeric"
            placeholder="Masukkan jumlah obat"
            style={styles.input}
            />
          </View>

        </ThemedView>
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor : "#161719",
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  itemHeader : {
    flex : 1,
    width: '100%',
    flexDirection : 'row',
    paddingHorizontal : 40,
    gap : 10,
    justifyContent : 'space-between'
  },
  item: {
    width: '100%',
    backgroundColor : '#525252',
    padding: 10,
    fontSize: 18,
  },
  flatlist: {
    width: '100%',
  },
  stockGroupContainer : {
    flex : 3,
    gap : 20,
    justifyContent : "center",
  },
  timePeriodText : {
    color : 'white',
    fontSize : 28,
  },
  inputContainer : {
    flex: 1,
    flexDirection : "column",
    alignItems : "center",
    justifyContent : "center",
    gap : 12,
    paddingHorizontal : 100,
    paddingVertical : 20,
    borderRadius : 12,
    borderWidth : 2,
    borderColor : "white"
  },
  input : {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    color : "white",
  },

});
