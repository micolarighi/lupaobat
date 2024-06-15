import { Image, StyleSheet, View, FlatList} from 'react-native';
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
  return (
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Stok Obat</ThemedText>
            <ThemedText>Cek dan Setel jumlah stok obat pasien anda!</ThemedText>
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
  }
});
