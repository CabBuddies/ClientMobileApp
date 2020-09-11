import React from 'react';
import { View, Text } from 'react-native';
import { CForm }   from '../../components/organisms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Container, Content} from 'native-base';
export default function SignUpScreen() {
    return(
        <KeyboardAwareScrollView>
            <Container>
                <Content>
                    <CForm/>
                </Content>
            </Container>
        </KeyboardAwareScrollView>
    )
}