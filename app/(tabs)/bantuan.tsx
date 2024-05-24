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
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Tentang Aplikasi">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
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
