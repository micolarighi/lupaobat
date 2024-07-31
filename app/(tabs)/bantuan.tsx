import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={280} name="medkit" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      <ThemedText style={styles.header}>
        Halaman ini akan membantu anda memahami cara menggunakan aplikasi
        LupaObat.
      </ThemedText>
      <Collapsible title="Mengatur jadwal">
        <ThemedText>
          Pada halaman
          <ThemedText type="defaultSemiBold"> Home</ThemedText> tekan tombol
          atur waktu pada periode yang anda inginkan dan sesuaikan dengan
          keinginan anda. {"\n"}
          <ThemedText>
            {"\n"}Pada tampilan pilihan waktu, tentukan jam dan lepaskan handle
            kemudian pilih menit dan jika sudah yakin tekan ok. {"\n"}
          </ThemedText>
          {"\n"}Jika sudah yakin, tekan{" "}
          <ThemedText type="defaultSemiBold">Konfirmasi Waktu</ThemedText>
        </ThemedText>
      </Collapsible>
      <Collapsible title="Mengecek Status">
        <ThemedText>
          Pada halaman
          <ThemedText type="defaultSemiBold"> Status </ThemedText>
          cek penggunaan obat pasien dan kondisi suhu laci obat.{"\n"}
          <ThemedText type="defaultSemiBold">
            {"\n"}Simbol ✅ menandakan pasien sudah minum obat.{"\n"}
          </ThemedText>
          <ThemedText type="defaultSemiBold">
            {"\n"}Simbol ❌ menandakan pasien belum minum obat.{"\n"}
          </ThemedText>
          {"\n"}Tekan tombol{" "}
          <ThemedText type="defaultSemiBold">Reset Status</ThemedText> setiap
          selesai melakukan pengecekan setiap harinya.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Mengatur stok obat">
        <ThemedText>
          Pada halaman
          <ThemedText type="defaultSemiBold"> Stok </ThemedText>
          Tekan tombol{" "}
          <ThemedText type="defaultSemiBold"> Mode Isi Ulang </ThemedText>
          kemudian mulai masukkan obat pada laci obat pintar dan sesuaikan
          jumlah yang dimasukkan pada tiap periode waktu.{"\n"}
          {"\n"}Jika sudah yakin, tekan tombol{" "}
          <ThemedText type="defaultSemiBold"> Konfirmasi Stok</ThemedText> dan
          matikan mode isi ulang untuk memastikan alat dapat berfungsi seperti
          semula.
        </ThemedText>
      </Collapsible>
      <ThemedText>
        <ThemedText>
          Aplikasi
          <ThemedText type="defaultSemiBold"> LupaObat </ThemedText>
          ini dibuat oleh{" "}
          <ThemedText type="defaultSemiBold">Micola Arighi Dwitya </ThemedText>
          untuk memperoleh gelar Ahli Madya.
        </ThemedText>
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  header: {
    fontSize: 20,
  },
});
