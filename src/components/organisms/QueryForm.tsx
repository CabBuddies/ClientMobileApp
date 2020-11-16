import React from 'react'
import { Alert, StyleSheet, View } from 'react-native';
import { CButton as Button, FormField } from '../atoms';
import {Form, Label, Text, Textarea, Badge, Item } from 'native-base'; 
import { FormikProps,FormikErrors, FormikHandlers, FormikHelpers } from "formik";
import Tags from 'react-native-tags';
import Reactotron from '../../../dev/ReactotronConfig';

interface QFormValues{
    title:string;
    tags:string[];
    body:string;
    server?:string;
    [val:string]:any
}
// type QFormik = FormikProps<QFormValues>  & FormikHandlers & FormikHelpers<QFormValues>;
function QueryForm({formik}:any){
    // Reactotron.log!("formik-touched:",formik.touched);
    Reactotron.log!(typeof formik)
    return (
        <Form style={{flex:1,paddingHorizontal:10}}>
            <FormField
                label = "Title"
                itemProps = {{floatingLabel:true, error:(formik.errors.title)?true:false}}
                inputProps = {{maxLength:100,style:styles.textStyle}}
                changeHandler = {formik.handleChange('title')}
                blurHandler = {formik.handleBlur('title')}
                value = {formik.values.title}
            />
            {
                formik.touched.title && formik.errors.title && <Text style = {{marginLeft:10,fontSize:20,color:"red"}}>{formik.errors.title}</Text>
            }
            
            <Tags
                initialText = ""
                textInputProps = {{
                    placeholder: "Type your tags, comma-separated",
                }}
                initialTags = {formik.values.tags}
                inputStyle={styles.tagInput}
                onChangeTags = {tags => formik.setFieldValue('tags',tags)}
                containerStyle={styles.tagContainer}
                tagTextStyle = {styles.textStyle}
                style = {styles.tagsField}
                
            />
            
            {
                formik.touched.tags && formik.errors.tags && <Text style = {{marginLeft:10,fontSize:20,color:"red"}}>{formik.errors.tags}</Text>
            }
            <Textarea 
                rowSpan={15} bordered={true} 
                underline={false} 
                placeholder="Enter your description here"
                onChangeText={formik.handleChange('body')}
                onBlur = {formik.handleBlur('body')}
                style = {styles.textStyle}
                value = {formik.values.body}
            />
            {
                formik.touched.body && formik.errors.body && <Text style = {{marginLeft:10,fontSize:20,color:"red"}}>{formik.errors.body}</Text>
            }
            {
                formik.errors.server && <Text style = {{marginLeft:10,fontSize:20,color:"red"}}>{formik.errors.server}</Text>
            }
            {/* <Button
                rounded success bordered
                title = "save as draft"
                onPress= {() => Alert.alert("this will save it as draft")}
            />
             <Button 
                rounded primary
                onPress= {formik.handleSubmit}
                title = "Publish"
              />
              <Button
                    onPress = {() => Alert.alert("Are you sure?")}
                    bordered danger rounded
                    container={{ flex: 1, justifyContent: "center" }}
                    title = "Discard"
                /> */}
        </Form>
    )
}

// function mapStateToProps(state){
//     return {

//     }
// }
// function mapDispatchToProps(dispatch){
//     return {
        
//     }
// }
export default QueryForm

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
    textStyle:{
        fontSize:20,
    },
    tagsField:{
        paddingVertical:20
    },
    tagContainer:{
        justifyContent:"center"
    },
    tagInput:{
        backgroundColor:"white",
        fontSize:20
    }
})