import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView } from 'react-native';

export default function Transaction({ item, myData }) {
    return (
            <View style={{width: '100%', flexDirection: 'row', paddingVertical: 5}}>
              <Image source={(myData.avatar_url != null ? {uri: myData.avatar_url} : require('../assets/icon.png'))} style={{width: 46, height: 46}}></Image>
              <View style={{flexDirection: 'column'}}>
                <Text>
                  {myData.full_name}
                </Text>
                <Text style={{fontSize: 12}}>
                  {item.type == 'c' ? 'Top Up' : 'Transfer'}
                </Text>
                <Text style={{fontWeight: 100, fontSize: 12}}>
                  {new Date(item.created_at).toLocaleString('id-ID')}
                </Text>
              </View>
              <View style={{flex: 1}}></View>
              <Text style={{verticalAlign: 'middle', color: (item.type == 'd' ? 'red' : 'green')}}>
                {`${item.type == 'd' ? '-' : '+' } Rp ${Intl.NumberFormat('id-ID').format(Math.abs(item.amount))}`}
              </Text>
            </View>
    )
}