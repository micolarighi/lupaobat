import { Image, StyleSheet, View, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Riwayat Minum Obat Pasien</ThemedText>
      </ThemedView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText>{item.value}</ThemedText>
            <ThemedText>Waktu:  {item.timestamp ? format(item.timestamp.toDate(), 'MMM do, HH:mm') : ''}</ThemedText>
          </ThemedView>
        )}
      />
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  item : {
  }
});
