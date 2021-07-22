import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import StarRating from "react-native-star-rating";

export default function RatingComponent({ rate, review, reviewStatus }) {
  const [starCount, setStarCount] = useState(0);
  useEffect(() => {
    setStarCount(rate);
  }, []);
  const declOfNum = (number, words) => {
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
    ];
  };
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <StarRating
          starSize={11}
          disabled={false}
          maxStars={5}
          rating={parseInt(starCount)}
          fullStarColor={"red"}
          starStyle={{ marginRight: 1 }}
        />
      </View>
      <Text
        style={{
          alignSelf: "center",
          color: "#ff0707",
          fontSize: 12,
          paddingLeft: 5,
        }}
      >
        {starCount}{" "}
      </Text>
      <Text
        style={
          reviewStatus
            ? {
                alignSelf: "center",
                color: "#313131",
                fontSize: 11,
                fontFamily: "RobotoLight",
              }
            : { display: "none" }
        }
      >
        ({`${review} ${declOfNum(review, ["отзыв", "отзыва", "отзывов"])}`})
      </Text>
    </View>
  );
}
