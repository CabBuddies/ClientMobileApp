import React from 'react'
import { Text } from 'native-base'

export default function ViewsAtom({views = 0}) {
    const viewsCount = views;
    return (
        <>
            <Text>{viewsCount} views</Text>
        </>
    )
}
