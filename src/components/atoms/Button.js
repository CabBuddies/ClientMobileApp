import React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { Grid , Col, Row } from 'react-native-easy-grid';
import { PropTypes } from 'prop-types';

const containerStyle = {
    flex:1,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignContent: "center",
    justifyContent:"center"

}

export default function CButton({container = containerStyle, title = "Button", style,icon = null,iconType = null,hasIcon = false, iconOnly=false, ...rest}) {
    return(
        <Grid style = {container}>
            <Button style = {style} {...rest}>
                {hasIcon?(<Icon name={icon}/>):null}
                {(!iconOnly)?(<Text>{title}</Text>):null}
            </Button>
        </Grid>
    )
}

CButton.propTypes = {
    title: PropTypes.string,
    container: PropTypes.object
}
