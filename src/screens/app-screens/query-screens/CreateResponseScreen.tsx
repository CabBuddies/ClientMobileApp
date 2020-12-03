import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Container } from 'native-base';
import { Row } from 'react-native-easy-grid';
import { IQuery, IResponse } from 'node-rest-objects/dist/data/queries';
import RESTObject from 'node-rest-objects/dist/rest/rest.object';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {TextInput, Button as PaperButton, Text, Title, HelperText, Colors, Badge} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as yup from "yup";
import reactotron from '../../../../dev/ReactotronConfig';
import { updateResponse } from '../../../api/query-api';
import ImageSelectionContainer from '../../../components/organisms/ImageSelectionContainer';
import { writeResponse } from '../../../redux/actions/query-actions';
import { IAppState } from '../../../redux/initialState';
import { goToQueryView } from '../../../utils/nav-utils';
import { VirtualizedContent } from '../../../components/organisms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface CResponseProps{
    query:RESTObject<IQuery> | undefined;
    newResponse:any;
    route:any;
}
const CreateResponseScreen = ({query,newResponse,route}:CResponseProps) => {

    const [loading,setLoading] = useState(false);
    let isUpdate = false;
    type RespFormValues = {
        title:string;
        tags:string[];
        media:string[];
        body:string;
        server?:string;
    }
    let responseInitialValues:RespFormValues = {
        title:"",
        tags: [],
        media:[],
        body:""
    }
    let response:IResponse
    const navigation = useNavigation();
    if(route && route.params && route.params.formData){
        response= route.params.formData;
        responseInitialValues.media = response.published.media as string[];
        responseInitialValues.body = response.published.body;
        isUpdate=true;
    }
    
    const responseSchema = yup.object({
        // title: yup.string().required("A title is Required"),
        body: yup.string().required("description is required"),
        media:yup.array()
    });
    return (
        <Container>
            <KeyboardAwareScrollView>
            <Title >
                <Text>Response to:</Text>
                <Text style={styles.title}>{query?.data.published.title}</Text>
            </Title>
                <Formik
                        initialValues = {responseInitialValues}
                        validationSchema={responseSchema}
                        onSubmit = {(values,actions) => {
                            reactotron.log!(values);
                            setLoading(true);
                            if(query){
                                if(!isUpdate){
                                    newResponse(query,values).then(() => {
                                        setLoading(false);
                                        goToQueryView(navigation);
                                    }).catch(error => {
                                        actions.setFieldError('server',"Could not create response please try again");
                                        setLoading(false);
                                    })
                                }
                                else{
                                    updateResponse(response,values).then(() => {
                                        setLoading(false);
                                        goToQueryView(navigation);
                                    }).catch(error => {
                                        actions.setFieldError('server',`Could not update response please try again`,);
                                        setLoading(false);
                                    })
                                }
                            }
                            else{
                                actions.setFieldError('server',"Unexpected error! please try again");
                                setLoading(false);
                            }
                            actions.resetForm();
                        }}
                    >
                        {(props) =>  (
                        <View style={styles.formContainer}>
                            {
                                props.errors.server && <HelperText style={{fontSize:15}} type="error" >{props.errors.server}</HelperText>
                            }
                            
                            <TextInput onChangeText={(text) => props.setFieldValue('body',text) } 
                                multiline numberOfLines={10} 
                                placeholder="enter your response here" 
                                mode="outlined"
                                style={styles.input}
                            />
                            <ImageSelectionContainer defaultValue={props.values.media} onChange={(values) => {props.setFieldValue('media',values)} }/>

                            <PaperButton disabled={props.values.title!==""} mode="contained" 
                            onPress={props.handleSubmit}style={styles.btn}
                            color={Colors.blue600} 
                            >
                                Post
                            </PaperButton>
                            
                        </View>
                        )
                         }
                </Formik>
                </KeyboardAwareScrollView>
        </Container>
    )
}

function mapStateToProps(state:IAppState){
    const { queryState } =  state;
    return {
        query:queryState.query
    }
}

function mapDispatchToProps(dispatch){
    return {
        newResponse: bindActionCreators(writeResponse,dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateResponseScreen);

const styles = StyleSheet.create({
    input:{
        backgroundColor:'rgba(245,255,240,0.4)'
    },
    btn:{
        marginHorizontal:40,
        marginTop:30
    },
    title:{
        color:'black',
        backgroundColor:"rgba(192,192,192,0.4)",
        fontSize:20,
        marginTop:15
    },
    formContainer:{
        flex:1, 
        justifyContent:"center"
    }


})
