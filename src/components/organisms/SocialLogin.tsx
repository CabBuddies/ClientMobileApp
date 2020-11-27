import React from 'react'
import { View, Text } from 'react-native'
import {CButton as Button} from '../atoms';
import { Grid, Row, Col } from 'react-native-easy-grid';

export default function SocialLogin({ google }) {
    return (
    <Grid>
        <Col>
            <Row>
                <Button hasIcon rounded
                bordered
                icon= "logo-google"
                title = "google"
                iconLeft
                onPress={google}
                />
            </Row>
            <Row>
                <Button hasIcon rounded
                bordered
                icon= "logo-linkedin"
                title = "linkedIn"
                iconLeft
                />
            </Row>
        </Col>
        
        <Col>
            <Row>
                <Button hasIcon rounded
                bordered
                icon= "logo-facebook"
                title = "facebook"
                iconLeft
                />
            </Row>
            <Row>
                <Button hasIcon rounded
                bordered
                icon= "logo-twitter"
                title = "twitter"
                iconLeft
                />
            </Row>
        </Col>
    </Grid>
    )
}
