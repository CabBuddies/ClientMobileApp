import React from 'react';
import { View, Text } from 'react-native';
import { CForm }   from '../../components/organisms';
import {Container, Content} from 'native-base';
export default function SignUpScreen() {
    return(
            <Container>
                <Content>
                    <CForm/>
                </Content>
            </Container>
    )
}