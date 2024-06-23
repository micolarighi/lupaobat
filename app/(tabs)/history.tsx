import { Image, StyleSheet, View, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from 'react-native'
import { format } from 'date-fns';

interface DocumentData {
  id: string;
  nilai: string;
  timestamp?: {
    toDate: () => Date;
  };
  periode : string;
}

export default function HomeScreen() {
    const [data, setData] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'kondisi'));
      const documents = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        nilai: doc.data().dataObat.nilai ? "✅︎" : "❌" ,
        timestamp: doc.data().dataObat.waktu,
        periode: doc.data().dataObat.periode
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
  return (
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Histori</ThemedText>
          <ThemedText>Cek riwayat minum obat pasien !</ThemedText>
        </ThemedView>
        <ThemedView style={styles.itemHeader}>
          <ThemedText type='subtitle'>Tgl</ThemedText>
          <ThemedText type='subtitle'>Jam</ThemedText>
          <ThemedText type='subtitle'>Cek</ThemedText>
        </ThemedView>
        <FlatList
          data={data}
          style={styles.flatlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={styles.item}>
              <ThemedText>{item.timestamp ? format(item.timestamp.toDate(), 'dd-MM') : ''}</ThemedText>
              <ThemedText>{item.timestamp ? format(item.timestamp.toDate(), ' HH:mm') : ''}</ThemedText>
              <ThemedText>{item.nilai}</ThemedText>
            </ThemedView>
          )}
        />
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
    width: '80%',
    flexDirection : 'row',
    marginBottom: 10,
    justifyContent : 'space-between',
  },
  item: {
    borderColor : 'gray',
    borderWidth : 0.8,
    borderRadius : 10,
    flex : 1,
    flexDirection : 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical : 5,
    fontSize: 18,
  },
  flatlist: {
    width: '80%',
  }
});
