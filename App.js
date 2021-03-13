import React from 'react';
import type {Node} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  var bluetoothDevice;
  let bleService = '00000000-0000-0000-0000-00000cacce00';
  let bleCharacteristic = '00000000-0000-0000-0000-00000000000a';
  let valueOn = 'AQ=='; // value of 1 in base64
  let valueOff = 'AA=='; // value of 0 in base64

  manager = new BleManager();

  async function scanAndConnect() {
    console.log('Scanning...');
    manager.startDeviceScan(null, null, (error, device) => {
      console.log(device);
      if (error) {
        console.log(error);
        return;
      }
      if (device.name === 'RoomLight') {
        console.log('Device found!');
        manager.stopDeviceScan();
        bluetoothDevice = device;
        device.connect()
        .then((device) => {
          return device.discoverAllServicesAndCharacteristics();
        }).then(() => {
          console.log('Device connected.');
        }).catch((error) => {
          console.log(error);
        });
      }
    })
  }

  function stopScan() {
    console.log('Stopping...');
    bluetoothDevice.cancelConnection()
    .then(() => {
      console.log('Disconnected.');
    }).catch((error) => {
      console.log(error);
    });
  }

  function switchOn() {
    bluetoothDevice.writeCharacteristicWithResponseForService(bleService, bleCharacteristic, valueOn)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  function switchOff() {
    bluetoothDevice.writeCharacteristicWithResponseForService(bleService, bleCharacteristic, valueOff)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>RoomLightBLE</Text>
      </View>

      <View style={styles.connectBox}>
        <View style={styles.subHeadings}>
          <Text style={styles.subtitle}>CONNECT</Text>
        </View>
        <View style={styles.buttonBox}>
          <Button onPress={scanAndConnect} title='Connect' color='#fca311'/>
          <Button onPress={stopScan} title='Disconnect' color='#fca311'/>
        </View>
      </View>

      <View style={styles.switchBox}>
        <View style={styles.subHeadings}>
          <Text style={styles.subtitle}>SWITCH</Text>
        </View>
        <View style={styles.buttonBox}>
          <Button onPress={switchOn} title='ON' color='#fca311'/>
          <Button onPress={switchOff} title='OFF' color='#fca311'/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    flex: 20,
  },
  title: {
    color: '#fff',
    fontSize: 48,
  },
  subtitle: {
    color: '#fff',
    fontSize: 24,
  },
  connectBox: {
    flex: 40,
  },
  switchBox: {
    flex: 40,
  },
  subHeadings: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBox: {
    flex: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    height: 50,
    width: 120,
    borderRadius: 10,
    backgroundColor: '#fca311',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
});

export default App;
