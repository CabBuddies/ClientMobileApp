import React from 'react'
import { View, Text } from 'react-native';
import { Placeholder, PlaceholderLine, PlaceholderMedia, Shine } from 'rn-placeholder';
import { PlaceholderSize } from '../../definitions/common-definitions';

 
interface ContentLoadingProps{
    size: PlaceholderSize;
}
const ContentLoading = ({size}:ContentLoadingProps) => {
    const loadComponent = () => {
        switch(size){
            case PlaceholderSize.SHORT:
                return(
                    <Placeholder
                        Left={PlaceholderMedia}
                        Animation={(props) => <Shine {...props} reverse={false}/>}
                        style = {{paddingTop:20,paddingHorizontal:10}}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                );
            case PlaceholderSize.MEDIUM:
                return (
                    <Placeholder
                        Left={PlaceholderMedia}
                        Animation={(props) => <Shine {...props} reverse={false}/>}
                        style = {{paddingTop:20,paddingHorizontal:10}}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                );
            case PlaceholderSize.LONG:
                return (
                    <Placeholder
                        Left={PlaceholderMedia}
                        Animation={(props) => <Shine {...props} reverse={false}/>}
                        style = {{paddingTop:20}}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                );
        }
    }
    return loadComponent();
}

export default ContentLoading
