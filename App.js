import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import ArcView from './ArcView';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Zain_400Regular,
  Zain_700Bold,
} from '@expo-google-fonts/zain';

const { width } = Dimensions.get('window');
const BASE_URL = 'https://yolo-backend-production-1094.up.railway.app';

export default function App() {
  const [fontsLoaded] = useFonts({
    Zain_400Regular,
    Zain_700Bold,
  });

  const [isUnfrozen, setIsUnfrozen] = useState(false);

  const toggleFreeze = async () => {
    try {
      const res = await fetch(`${BASE_URL}/card/freeze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unfreeze: !isUnfrozen }),
      });

      const data = await res.json();
      if (data.success) {
        setIsUnfrozen(!isUnfrozen);
      }
    } catch (err) {
      console.error('Error toggling freeze:', err);
    }
  };

  const makePayment = async (method) => {
    try {
      const res = await fetch(`${BASE_URL}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ method, amount: 100 }),
      });

      const data = await res.json();
      console.log('Payment response:', data);
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  if (!fontsLoaded) return <AppLoading />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}></View>

      <Text style={styles.title}>select payment mode</Text>
      <Text style={styles.subtitle}>
        choose your preferred payment method to make payment.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <LinearGradient
          colors={['#ffffff', '#1C1C1C']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.payBtnWrapper}
        >
          <TouchableOpacity style={styles.payBtnInner} onPress={() => makePayment('pay')}>
            <Text style={styles.payText}>pay</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#ff5f5f', '#1C1C1C']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.cardBtnWrapper}
        >
          <TouchableOpacity style={styles.cardBtnInner} onPress={() => makePayment('card')}>
            <Text style={styles.cardText}>card</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <Text style={styles.label}>YOUR DIGITAL DEBIT CARD</Text>

      <View style={styles.cardAndFreezeWrapper}>
        <LinearGradient
          colors={['#ffffff', '#1C1C1C']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.cardGlowBorder}
        >
          <Image
            source={
              isUnfrozen
                ? require('./assets/cardDetails.png')
                : require('./assets/card.png')
            }
            style={styles.cardImage}
          />
        </LinearGradient>

        <View style={styles.freezeWrapper}>
          <LinearGradient
            colors={
              isUnfrozen
                ? ['#ffffff', '#1C1C1C']
                : ['rgba(255, 0, 0, 0.5)', 'rgba(255, 0, 0, 0.3)']
            }
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.freezeCircleGradient}
          >
            <TouchableOpacity style={styles.freezeCircleInner} onPress={toggleFreeze}>
              <Ionicons
                name="snow"
                size={19}
                color={isUnfrozen ? '#fff' : 'red'}
              />
            </TouchableOpacity>
          </LinearGradient>
          <Text
            style={[
              styles.freezeText,
              { color: isUnfrozen ? '#fff' : 'red' },
            ]}
          >
            {isUnfrozen ? 'freeze' : 'unfreeze'}
          </Text>
        </View>
      </View>

      <ArcView />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Image source={require('./assets/home.png')} style={styles.iconImage} />
          <Text style={styles.navText}>home</Text>
        </View>

        <View style={[styles.navItem, styles.activeNavItem]}>
          <Image source={require('./assets/yolo.png')} style={styles.activeIconImage} />
          <Text style={styles.navTextActive}>yolo pay</Text>
        </View>

        <View style={styles.navItem}>
          <Image source={require('./assets/ginie.png')} style={styles.iconImage} />
          <Text style={styles.navText}>ginie</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  title: {
    color: '#fff',
    fontSize: 38,
    fontFamily: 'Zain_700Bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 22,
    fontFamily: 'Zain_400Regular',
    marginBottom: 19,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 39,
  },
  payBtnWrapper: {
    borderRadius: 999,
    padding: 1.8,
  },
  payBtnInner: {
    backgroundColor: '#1C1C1C',
    borderRadius: 1400,
    paddingVertical: 4,
    paddingHorizontal: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBtnWrapper: {
    borderRadius: 999,
    padding: 2,
  },
  cardBtnInner: {
    backgroundColor: '#1C1C1C',
    borderRadius: 1400,
    paddingVertical: 4,
    paddingHorizontal: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'Zain_400Regular',
    textTransform: 'lowercase',
  },
  cardText: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Zain_400Regular',
    textTransform: 'lowercase',
  },
  label: {
    color: '#888',
    fontSize: 16,
    marginBottom: 12,
    textTransform: 'uppercase',
    fontFamily: 'Zain_400Regular',
    opacity: 0.6,
  },
  cardAndFreezeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 30,
  },
  cardGlowBorder: {
    padding: 0.6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: width * 0.47,
    height: width * 0.69,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  freezeWrapper: {
    alignItems: 'center',
  },
  freezeCircleGradient: {
    padding: 0.5,
    borderRadius: 30,
  },
  freezeCircleInner: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  freezeText: {
    fontSize: 19,
    fontWeight: '400',
    marginTop: 6,
    fontFamily: 'Zain_400Regular',
    textTransform: 'lowercase',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 97,
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingHorizontal: 26,
    zIndex: 2,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeNavItem: {
    marginTop: -10,
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 1,
  },
  activeIconImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: -17,
  },
  navText: {
    color: '#666',
    fontSize: 16,
    marginTop: -2,
    fontFamily: 'Zain_400Regular',
    textTransform: 'lowercase',
  },
  navTextActive: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: -2,
    fontFamily: 'Zain_400Regular',
    textTransform: 'lowercase',
  },
});
