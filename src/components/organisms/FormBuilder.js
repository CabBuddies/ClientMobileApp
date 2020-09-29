import React from 'react';
import { StyleSheet } from 'react-native';
import { Form } from 'native-base';
import { FormField } from '../atoms';
import { CButton as Button } from "../atoms";
import { Grid } from 'react-native-easy-grid';
export const FieldTypes = {
    INPUT : "input",
    PICKER: "picker",
    ICON_INPUT : "iconInput",
    BUTTON : "button"
}

export default function FormBuilder({schema, style = {flex:0}}) {

    
    const getFormFields = (formSchema) =>
    {
        fields = formSchema;
        for(let i=0;i<fields.length;i++)
        {
            if(fields[i].type === undefined)
            {
                fields[i].type = "input";
            }

            switch(fields[i].type)
            {
                case FieldTypes.INPUT: 
                    fields[i] = <FormField label = {fields[i]["label"]} itemProps = {fields[i].itemProps} inputProps = {fields[i].inputProps}/>;
                    break;

                case FieldTypes.ICON_INPUT:
                    fields[i] = <FormField hasIcon icon = {fields[i].icon} iconType = {fields[i].iconType}
                                    iconStyle = {fields[i].iconStyle}    label = {fields[i]["label"]} 
                                    itemProps = {fields[i].itemProps} inputProps = {fields[i].inputProps} 

                                    />;
                    break;

                // case FieldTypes.PICKER:
                //     fields[i] = <FormField label = {fields[i]["name"]} 
                //                 itemProps = {fields[i].itemProps} inputProps = {fields[i].inputProps}
                //                 pickerInput pickerProps = {fields[i].pickerProps}
                //                 />;
                //     break;

                case FieldTypes.BUTTON:
                    fields[i] = <Button {...fields[i].buttonProps}/>;
                    break;

                default:
                    fields[i] = <FormField label = {fields[i]["label"]} itemProps = {fields[i].itemProps} inputProps = {fields[i].inputProps}/>;
                    break;

            }
        }
        return fields;
        
    }
    console.log(`schema: ${schema}`)
    let fields = getFormFields(schema);
    console.log(`fields: ${fields}`)
    return (
        <Form style={style}>
            {fields}
        </Form>
    )
}

const styles = StyleSheet.create({})
