import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Item , Input, Icon, Label } from 'native-base';

export default function FormField({itemProps, inputProps,label = "input", hasIcon = false, icon = null, iconType=null,iconStyle, pickerInput, pickerProps}) {
    return (
        <Item {...itemProps}>
            {(hasIcon)?<Icon name={icon} type={iconType} style = {iconStyle}/>: null}
            <Label>{label}</Label>
            <Input {...inputProps}/>
        </Item>
    )
}

const styles = StyleSheet.create({})
