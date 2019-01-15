import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Translation from '../assets/translation';

const VerificationButton = (props) => {
  return(
    <TouchableOpacity
      style={{ 
        backgroundColor: '#3f8ca1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        height: 35,
        width: 200,
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row'
      }}
      onPress={props.onPress}
    >
      <Text style={{ color: 'white', fontWeight: '600', paddingRight: props.loading ? 5 : 0 }}>
        {Translation.newTranslation.resendVerification[props.lang]}
      </Text>
      {props.loading && <ActivityIndicator size="small" color="#2d3436" />}
    </TouchableOpacity>
  )
} 

export default VerificationButton;