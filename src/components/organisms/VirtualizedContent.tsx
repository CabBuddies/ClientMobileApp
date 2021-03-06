import React from 'react';
import { View, Text } from 'react-native';
import {KeyboardAwareFlatList as KBFlatList} from 'react-native-keyboard-aware-scroll-view';
import reactotron from '../../../dev/ReactotronConfig';

const VirtualizedContent = ({children}) => {
    
    return (
        <KBFlatList
        data={[]}
        ListEmptyComponent={null}
        keyExtractor={() => "dummy"}
        renderItem={null}
        ListHeaderComponent={() => (<>{children}</>)}
    />
    )
}

export default VirtualizedContent

