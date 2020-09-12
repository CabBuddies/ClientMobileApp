import React from 'react'
import { View, Text } from 'react-native'
import {CButton as Button} from '../atoms';
import { Grid, Row, Col } from 'react-native-easy-grid'; 
export default function SocialLogin() {
    return (
    <Grid>
        <Col>
            <Row>
                <Button hasIcon rounded
                bordered
                icon= "logo-google"
                title = "google"
                />
            </Row>
            <Row>
                <Button hasIcon rounded
                bordered
                icon= "logo-linkedin"
                title = "linkedIn"
                />
            </Row>
        </Col>
        
        <Col>
            <Row>
                <Button hasIcon rounded
                bordered
                icon= "logo-facebook"
                title = "facebook"
                />
            </Row>
            <Row>
                <Button hasIcon rounded
                bordered
                icon= "logo-twitter"
                title = "twitter"
                />
            </Row>
        </Col>
    </Grid>
    )
}
