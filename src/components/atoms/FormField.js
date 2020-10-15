import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Item , Input, Icon, Label } from 'native-base';

export default function FormField({itemProps,name,changeHandler= null,blurHandler=null, inputProps,label = "input",
                                   hasIcon = false, icon = null, iconType=null,iconStyle, pickerInput, pickerProps,
                                    value = ''}) 
{
    return (
        <Item {...itemProps}>
            {(hasIcon)?<Icon name={icon} type={iconType} style = {iconStyle}/>: null}
            <Label>{label}</Label>
            <Input {...inputProps} onChangeText = {changeHandler} onBlur = {blurHandler} value = {value}/>
        </Item>
    )
}

const styles = StyleSheet.create({})
