import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Button, View, SafeAreaView, Pressable, ScrollView} from 'react-native';

export default function  ModalComp({modalText, modalState = useState(false)}) {
  const [modalVisible, setModalVisible] = modalState;
  return (
    <SafeAreaView style={styles.centeredView}>
        <Modal 
        onRequestClose={() => setModalVisible(false)} //perintah menutup modal
        visible={modalVisible} // mengatur modal muncul
        animationType="fade" // untuk mengatur animasi modal
        >
        <ScrollView>
            <View style={styles.modalView}>
            <Text style={{fontSize: 20, fontWeight: 500, textDecorationLine: 'underline', marginBottom: 10}}>Terms and Condition</Text>
            <Text style={styles.modalText}>{modalText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
        </ScrollView>
        </Modal>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'justify',
  },
});