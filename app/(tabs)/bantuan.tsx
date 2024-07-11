import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={280} name="medkit" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      <ThemedText style={styles.header}>Halaman ini akan membantu anda memahami cara menggunakan aplikasi LupaObat.</ThemedText>
      <Collapsible title="Mengatur jadwal">
        <ThemedText>Pada halaman
          <ThemedText type="defaultSemiBold"> Home  
          </ThemedText> tekan tombol atur waktu dan kemudian sesuaikan dengan keinginan anda.
        </ThemedText>
        <ThemedText>
          Pada tampilan pilihan waktu, pertama tentukan jam dan lepaskan handle kemudian pilih menit dan jika sudah yakin tekan ok.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Melihat histori">
        <ThemedText>
          Pada halaman 
          <ThemedText type="defaultSemiBold"> Histori </ThemedText>
          cek penggunaan obat pasien dalam beberapa waktu kebelakang.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Mengatur stok obat">
      <ThemedText>
          Pada halaman 
          <ThemedText type="defaultSemiBold"> Stok </ThemedText>
          anda bisa mengatur stok dari obat pada tiap periode waktu.
        </ThemedText>
      </Collapsible>
      <ThemedText>
        <ThemedText>
          Aplikasi
          <ThemedText type="defaultSemiBold"> LupaObat </ThemedText>
         ini dibuat oleh <ThemedText type="defaultSemiBold"> Micola Arighi Dwitya </ThemedText> yang dibuat guna memperoleh gelar Ahli Madya.
        </ThemedText>
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  header : {
    fontSize : 20,
  }
});
