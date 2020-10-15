import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Form, Text } from 'native-base';
import { FormField } from '../atoms';
import { CButton as Button } from "../atoms";
import { Grid } from 'react-native-easy-grid';
import { useFormik } from 'formik';
export const FieldTypes = {
    INPUT : "input",
    PICKER: "picker",
    ICON_INPUT : "iconInput",
    BUTTON : "button"
}

export default function FormBuilder({schema, style = {flex:1},formik=null}) {

    let [fields,setFields] = useState([]);
    let [formData,setFormData] = useState(formik.values); 
    console.log(`formik values: ${JSON.stringify(formik.values,null,4)}`);
    
    useEffect(() => {
        fields = getFormFields(schema,formik);
        setFields(fields);
    },[]);

    // useEffect(()=>{
    //     fields.value = formik.values[name]
    // }
    // ,[formData]);


    const changeHandler = (name,value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: prevState.value + value
        })
        )
        formik.handleChange(name);
    }

    
    const getFormFields = (formSchema,formik) =>
    {
        fields = formSchema;
        for(let i=0;i<fields.length;i++)
        {
            const fieldName = fields[i].name;
            switch(fields[i].type)
            {
                case FieldTypes.INPUT: 
                    fields[i] = <FormField key ={`${i}`} name = {fieldName} label = {fields[i]["label"]}
                                itemProps = {fields[i].itemProps} inputProps = {fields[i].inputProps}
                                changeHandler = {() => changeHandler(fieldName,value)}
                                blurHandler = {formik.handleBlur(fieldName)}
                                value = {formik.values[fieldName]} 
                                />;
                    break;

                case FieldTypes.ICON_INPUT:
                    fields[i] = <FormField key ={`${i}`}  name = {fields[i].name} hasIcon icon = {fields[i].icon} 
                                    iconType = {fields[i].iconType} iconStyle = {fields[i].iconStyle}  
                                    label = {fields[i]["label"]} itemProps = {fields[i].itemProps} 
                                    inputProps = {fields[i].inputProps} changeHandler = {formik.handleChange(name)}
                                    blurHandler = {formik.handleBlur(fieldName)}
                                    value = {formik.values[fieldName]}
                                    />;
                    break;

                // case FieldTypes.PICKER:
                //     fields[i] = <FormField  id ={`${i}`} name = {fields[i].name} label = {fields[i]["name"]} 
                //                 itemProps = {fields[i].itemProps} inputProps = {fields[i].inputProps}
                //                 pickerInput pickerProps = {fields[i].pickerProps}
                //                 />;
                //     break;

                case FieldTypes.BUTTON:
                    fields[i] = <Button key ={`${i}`} onPress= {formik.handleSubmit} {...fields[i].buttonProps}/>;
                    break;

                default:
                    fields[i] = <Text key ={`${i}`} style={{color:"red"}}>Unsupported Field</Text>;
                    break;

            }
        }
        return fields;
        
    }
    return (
        <Form style={style}>
            {fields}
        </Form>
    )
}

const styles = StyleSheet.create({})
