import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import Box from "../components/Box";
import { cloneElement, useState, useEffect } from "react";
import Transaction from "../components/Transaction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {api} from '../api'
import { useUser } from "../context/UserContext";
import { handlerError } from "../utils/handlerError";
import { useIsFocused } from "@react-navigation/native";

export default function Transfer({ navigation }) {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState("");

  const {myData, refreshData} = useUser()
  const isFocused = useIsFocused()
  useEffect(() => {refreshData()}, [isFocused])

  const createTransfer = async () => {
    console.log('hai')
    console.log(receiver)
    if(amount > myData.balance) {
      alert('Balance is not enough')
      return
    }
    let payload = {
      type: 'd',
      from_to: receiver,
      amount: amount,
    }
    console.log('ok')
    if(notes != '') payload.description = notes
    try {
      console.log('token')
      const token = await AsyncStorage.getItem('userToken')
      const response = await api.post('/transactions', payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data)
      alert('Transfer Success!')
    } catch (error) {
      handlerError(error)
    }
  }

  return (
    <SafeAreaView>
      <Pressable onPress={Keyboard.dismiss} accessible={false} >

      <View
        style={{ flexDirection: 'column', justifyContent: "space-between", height: '100%' }}
        >
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              backgroundColor: "#19918F",
              flexDirection: "row",
              padding: 10,
              paddingLeft: 20,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            >
            <Text style={{ color: "white" }}>To:</Text>
            <TextInput
              style={{ color: "white", width: '100%' }}
              value={receiver}
              onChangeText={setReceiver}
              placeholder="Penerima"
              placeholderTextColor="white"
              keyboardType="numeric"
              />
          </View>
          <View style={{backgroundColor: 'white', marginTop: 20, paddingHorizontal: 20, paddingVertical: 30}}>
            <Text style={{ color: '#B3B3B3' }}>Amount</Text>
            <View
              style={{
                flexDirection: "row",
                // marginHorizontal: 20,
                borderBottomWidth: 0.5,
                marginTop: 10,
                borderColor: '#B3B3B3'
              }}
              >
              <Text
                style={{ marginRight: 5, verticalAlign: "top", fontSize: 18 }}
                >
                IDR
              </Text>
              <TextInput
                style={{ verticalAlign: "middle", fontSize: 28, width: '100%' }}
                value={
                  !Number.isNaN(amount) ? (amount == 0 ? "" : Intl.NumberFormat("id").format(amount)) : ''
                }
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(text) =>
                  setAmount(reverseFormatNumber(text, "id"))
                }
                />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // marginHorizontal: 20,
              }}
              >
              <Text style={{color: '#B3B3B3'}}>Balance</Text>
              <Text style={{color: '#B3B3B3'}}>IDR {Intl.NumberFormat('id-ID').format(myData.balance)}</Text>
            </View>
          </View>
          
          <View style={{backgroundColor: 'white', marginTop: 20, paddingHorizontal: 20, paddingBottom: 20}}>
            <TextInput
              style={{
                fontSize: 18,
                borderBottomWidth: 0.5,
                // marginHorizontal: 20,
                height: 80,
                // marginTop: 20,
                verticalAlign: 'top',
                color: '#B3B3B3',
                borderColor: '#B3B3B3'
              }}
              placeholderTextColor={'#B3B3B3'}
              value={notes}
              placeholder="Notes"
              onChangeText={setNotes}
              multiline={true}
              numberOfLines={3}
              />
          </View>
        </View>
        <View style={{flex: 1}}></View>
        <View style={{ width: "100%", alignSelf: 'flex-end'}}>
          <TouchableOpacity style={styles.btnLogin} onPress={() => createTransfer()}>
            <Text style={{ textAlign: "center", color: "white" }}>
              Transfer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
    </SafeAreaView>
  );
}

function reverseFormatNumber(val, locale) {
  var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
  var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
  var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
  reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
  return Number.isNaN(reversedVal) ? 0 : Number(reversedVal);
}

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: "#19918F",
    marginHorizontal: 20,
    marginVertical: 50,
    padding: 15,
    borderRadius: 10,
  },
  textAccount: {
    fontSize: 16,
    color: "white",
  },
  container: {
    // flex: 1,
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
    margin: 0,
    padding: 0,
  },
  button: {
    width: 40,
    height: 40,
    margin: 5,
    marginRight: 10,
    backgroundColor: "#19918F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
