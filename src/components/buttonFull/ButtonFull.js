import React from 'react';
import {
    Text,
    ActivityIndicator,
    TouchableOpacity,
    View
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { ColorsStyles } from '../../constants/ColorsStyles';


export const ButtonFull = ({ data }) => {
    return (
        <TouchableOpacity
        style={[styles.button, data?.styles ? data.styles : null ]}
        onPress={() => data.change()}
        >   
            {data.loading ? (
                <View style={styles.block_loader}>
                    <ActivityIndicator size={40} color={ColorsStyles.colorTextError} style={styles.loader}/>
                </View>
            ) : (
                <Text style={[GlobalStyle.CustomFontRegular, styles.button_text]}>
                    {data.value}
                </Text>
            )}
        </TouchableOpacity>    
    );
}

