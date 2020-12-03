import { Icon } from 'native-base';
import React from 'react';
import { View, Text, FlatList, ImageBackground, TouchableHighlight, Image, Alert } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import ImagePicker from './ImagePicker';
import { dh, dw } from '../../utils/rn-utils';
function ImageContainer({ src, deletable, onDelete, onClick }) {
    return (
        <TouchableHighlight
            onPress={() => onClick(src)}>
            <ImageBackground source={{ uri: src }} style={{ height: 100, width: 100 }} >
                {
                    deletable && <TouchableHighlight
                        onPress={() => onDelete(src)}>
                        <Icon name="close-circle" type="MaterialCommunityIcons" style={{ height: 30, width: 30, marginTop: 10, marginLeft: 65, color: 'red' }} />
                        {/* <Image source={require('../../../assets/favicon.png')} style={{ height: 40, width: 40, margin: 15 }} /> */}
                    </TouchableHighlight>
                }
            </ImageBackground>
        </TouchableHighlight>
    );
}
function ImageSelectionContainer({ defaultValue = [], onChange = () => { }, readOnly = false }: { defaultValue?: string[], onChange?(values: string[]): void, readOnly?: boolean }) {
    
    const [values, setValues] = React.useState<any[]>(defaultValue);

    React.useEffect(() => {
        onChange(values)
    }, [values]);

    const imageUploaded = (image: string) => {
        setValues([...values, image]);
    }
    const imageDeleted = (image: string) => {
        setValues(values.filter((i) => i !== image));
    }
    const imageClicked = (image:string) => {
        setModalState({show:true,src:image});
    }
    const [modalState, setModalState] = React.useState({show:false,src:''});
    const hideModal = () => setModalState({show:false,src:''});
    const containerStyle = {backgroundColor: 'white'};
    return (
        <View>
            {!readOnly && <ImagePicker props={{ title: "Select Image", icon: "image" }} imageCB={imageUploaded} allowEditing={false}/>}
            <Portal>
                <Modal visible={modalState.show} onDismiss={hideModal} contentContainerStyle={containerStyle} >
                    <Image source={{uri:modalState.src}} style={{ flex:1,alignSelf:"center",resizeMode:'contain',minWidth:dw(0.75),minHeight:dh(0.75),maxWidth:dw(0.85),maxHeight:dh(0.85) }} />
                </Modal>
            </Portal>
            <FlatList
                data={values}
                listKey="Image-Container-key"
                renderItem={({ item, index }) => (
                    <ImageContainer key={index.toString()} src={item} deletable={!readOnly} onDelete={imageDeleted} onClick={imageClicked} />
                )}
                numColumns={4}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: "space-around"
                }}
            />
        </View>
    );
}

export default ImageSelectionContainer;