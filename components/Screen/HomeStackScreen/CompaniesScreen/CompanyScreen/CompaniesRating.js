import React, { useState } from 'react';
import { Text, View } from 'react-native';
import StarRating from 'react-native-star-rating';

export default function CompaniesRating({rate}) {
    const [starCount, setStarCount] = useState()

    return(
        <View style={{flex:1, flexDirection:'row', width:'100%'}}>
            <View style={{
                alignSelf:'center'
                }}>
                <StarRating
                starSize={10}
                disabled={false}
                maxStars={5}
                rating={rate}
                fullStarColor={'red'}
                starStyle={{
                    marginRight:'2%'
                }}
                />
            </View>
        </View>
    )
}
