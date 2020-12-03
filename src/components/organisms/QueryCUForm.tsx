import React from 'react'
import { Alert, StyleSheet, View } from 'react-native';
import { CButton as Button, FormField } from '../atoms';
import {Form, Label, Text, Textarea, Badge, Item } from 'native-base'; 
import { FormikProps,FormikErrors, FormikHandlers, FormikHelpers } from "formik";
import { QueryFormType } from '../../definitions/common-definitions';
import { Chip, Colors, HelperText, TextInput as PaperInput } from 'react-native-paper';
import TagInput from '../molecules/TagInput';
import ImageSelectionContainer from './ImageSelectionContainer';
import { dh } from '../../utils/rn-utils';

interface QFormValues{
    title:string;
    tags:string[];
    body:string;
    server?:string;
    [val:string]:any
}
interface QueryFormProps{
    formik:any;
    mode:QueryFormType;
}
function QueryCUForm({formik,mode}:QueryFormProps){
    return (
        <Form style={{flex:1,padding:10}}>
            <PaperInput 
                style={styles.textStyle}
                mode="outlined" 
                label="Title"
                value={formik.values.title}
                onChangeText={(text) => formik.setFieldValue('title',text)}
                error={formik.touched.title && formik.errors.title}
            />
            {
               formik.touched.title && formik.errors.title && <HelperText style={styles.errorText} type="error" visible={formik.touched.title && formik.errors.title}>{formik.errors.title}</HelperText>
            }
            <PaperInput 
                style={[styles.textStyle,styles.description]}
                mode="outlined"
                multiline numberOfLines={10} 
                label="Description"
                value={formik.values.body}
                onChangeText={(text) => formik.setFieldValue('body',text)}
                onBlur={() => formik.handleBlur('body')}
                error={formik.touched.body && formik.errors.body}
            />
            {
                formik.touched.body && formik.errors.body && <HelperText style={styles.errorText} type="error" visible={formik.touched.body && formik.errors.body}>{formik.errors.body}</HelperText>
            }
           
           <ImageSelectionContainer defaultValue={formik.values.media} onChange={(values) => {formik.setFieldValue('media',values)} }/>
            
            <TagInput tags={formik.values.tags} onTagChange={formik.setFieldValue}/>
            {
               formik.touched.tags && formik.errors.tags && <HelperText style={styles.errorText} type="error" visible={formik.touched.tags && formik.errors.tags}>{formik.errors.tags}</HelperText>
            }
            {
               formik.errors.server && <HelperText style={styles.errorText} type="error" visible={formik.errors.server}>{formik.errors.server}</HelperText>
            }
           
        </Form>
    )
}
export default QueryCUForm

const styles = StyleSheet.create({
    btn:
    {
      marginTop: 20,
    },
    btnContainer:
    {
      flex:1,
      paddingVertical: 10,
      paddingHorizontal:24
    },
    txtContainer:{
        borderColor:"blue",
    },
    textStyle:{
        fontSize:20,
        backgroundColor:"rgba(245,255,240,0.1)"
    },
    errorText:{
        fontSize:18
    },
    description: {
        height: dh(0.2)
    }
})