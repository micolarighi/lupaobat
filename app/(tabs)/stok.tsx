import { Pressable, StyleSheet, View, Text, TextInput, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
import { realtimedb } from '../../firebaseConfig';
import { ref, set } from 'firebase/database';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

    const sendRealtimeData = () => {
      try {
        set(ref(realtimedb, 'stok'), {
          pagi: inputs.input1,
          siang: inputs.input2,
          malam: inputs.input3,
        });
      } catch (e) {
        
      }
    } 
    const [inputs, setInputs] = useState({
      input1: '',
      input2: '',
      input3: '',
    });
  

  const handleChange = (text : any, field : any) => {
    if (/^\d*$/.test(text) && (text === '' || parseInt(text, 10) <= 30)) {
      setInputs({
        ...inputs,
        [field]: text
      });
    }
  };

  return (
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Stok Obat</ThemedText>
            <ThemedText>Cek dan Setel jumlah stok obat pasien anda!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.groupContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>
              Pagi
            </Text>
            <TextInput
            value={inputs.input1}
            onChangeText={(text) => handleChange(text, 'input1')}
            keyboardType="numeric"
            style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>
              Siang
            </Text>
            <TextInput
            value={inputs.input2}
            onChangeText={(text) => handleChange(text, 'input2')}
            keyboardType="numeric"
            style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.timePeriodText}>
              Siang
            </Text>
            <TextInput
            value={inputs.input3}
            onChangeText={(text) => handleChange(text, 'input3')}
            keyboardType="numeric"
            style={styles.input}
            />
          </View>
        </ThemedView>
			  <Pressable style={styles.btn} onPress={sendRealtimeData}>
          <Text style={styles.btnText}>Update Stok Obat</Text>
        </Pressable>
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

  flatlist: {
    width: '100%',
  },
  groupContainer : {
    flex : 3,
    gap : 20,
    justifyContent : "center",
    marginBottom : 20,
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
    gap : 8,
    paddingHorizontal : 100,
    paddingVertical : 10,
    borderRadius : 12,
    borderWidth : 2,
    borderColor : "white"
  },
  input : {
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical : 10,
    fontWeight : 'bold',
    fontSize : 16,
    paddingHorizontal: 8,
    color : "white",
    textAlign : "center",
  },
  btn : {
    backgroundColor : '#2196f3',
    padding : 20,
    borderRadius : 2,
  },
  btnText : {
    color : 'white',
    
  }

});
