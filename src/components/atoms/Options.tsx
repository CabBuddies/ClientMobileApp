import React,{ useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Menu,IconButton, Divider,Colors } from "react-native-paper";
import { MenuModes } from '../../definitions/common-definitions';

interface OptionProps{
    mode: MenuModes;
    optionsArray?:Array<any>;
    onDelete?: () => void;
    onEdit?: () => void;
    onReport?:() => void;
}

const createCrudItems =(onDelete,onEdit,onReport) =>{

    return [
        {
            key:"1234ABC",
            icon: "pencil",
            title:"edit",
            onPress:onEdit
    
        },
        {
            key:"1234BCA",
            icon:"delete",
            title:"delete",
            onPress: onDelete
        },
        {
            key:"1234bcB",
            icon:"alert-octagon",
            title:"report spam",
            onPress:onReport
    
        },
    
    ]
} 

const Options = ({mode=MenuModes.CRUD, 
    optionsArray=[],
    onDelete = () => {Alert.alert('delete pressed')},
    onEdit = () => {Alert.alert('edit pressed')},
    onReport = () => {Alert.alert('report pressed')}
    }:OptionProps
) => {
    const [isVisible,setVisible] = useState(false);
    const open = () => setVisible(true);
    const close = () => setVisible(false);
    if(optionsArray.length === 0){
        switch(mode){
            case MenuModes.CRUD: 
                optionsArray = createCrudItems(onDelete,onEdit,onReport);
                break;
            case MenuModes.TEXT:
                optionsArray = ["copy","paste"];
                break;
        }
        optionsArray.push({
            key:"1234CBA",
            icon:"close-circle",
            title:"cancel",
            onPress:close
        });
    }
    const renderItems = () => {
        let components = optionsArray.slice(0,-1).map(itemProps => <Menu.Item {...itemProps}/>)
        const cancelProps = optionsArray[optionsArray.length-1];
        components = components.concat([<Divider key="divider121" style={styles.divider}/>,<Menu.Item {...cancelProps}/>]);
        return components
    }

    return (
        <View style ={styles.menuContainer}>
            <Menu 
                visible={isVisible}
                onDismiss={close}
                anchor={<IconButton icon="dots-vertical" onPress={open}></IconButton>}
            >
                {renderItems()}
            </Menu>
        </View>
    )
}

export default Options

const styles = StyleSheet.create({
    menuContainer:{
        justifyContent:"center"
    },
    divider:{
        backgroundColor:Colors.grey500
    }
})

