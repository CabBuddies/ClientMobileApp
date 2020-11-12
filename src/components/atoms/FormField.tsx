import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { Item , Input, Icon, Label } from 'native-base';

type IconType = "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial" | undefined;
export interface FormFieldProps{
    itemProps: any;
    changeHandler?: Function | null;
    blurHandler ?: Function | null;
    inputProps?: any;
    label: string;
    hasIcon?: boolean;
    icon?: string;
    iconType?: IconType;
    iconStyle?: TextStyle;
    value?: string;
    [val:string]:any;
}

export default function FormField({itemProps,changeHandler= null,blurHandler=null, inputProps,label = "input",
                                   hasIcon = false, icon = undefined, iconType=undefined,iconStyle,
                                    value = ''}: FormFieldProps) 
{
    return (
        <Item {...itemProps}>
            {(hasIcon)?<Icon name={icon} type={iconType} style = {iconStyle}/>: <></>}
            <Label>{label}</Label>
            <Input {...inputProps} onChangeText = {changeHandler} onBlur = {blurHandler} value = {value}/>
            {(itemProps.error)?<Icon name="close-circle"/>:<></>}
        </Item>
    )
}

const styles = StyleSheet.create({})
