import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Alert,
  View,
  SafeAreaView,
  RefreshControl,
  ImageBackground,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFetch } from "../hooks/api_hook";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome6 } from "@expo/vector-icons";
const SingleShopScreen = ({ route }) => {
  const navigation = useNavigation();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const index = route.params?.index;
  let { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
  let [quantity, setQuantity] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [rated, setRated] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [trigger, setTrigger] = useState(false);
  const [inputHandler, setInputHandler] = useState({
    reviewContent: " ",
    rating: " ",
  });
  const {
    productId,
    productName,
    productDetais,
    productImage,
    productCategory,
    productPrice,
    productReview,
    productRating,
    productQuantity,
    productUnits,
  } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const { data: reviews = [], setData: setReviews } = useFetch(
    `/api/getReviewById/${productId}`
  );
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const userData = JSON.parse(userString);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {}, [reviews]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    if (cart) {
      let totalPrice = 0;
      for (let i = 0; i < cart.products.length; i++) {
        totalPrice +=
          cart.products[i]?.productId?.price * cart.products[i]?.units;
      }
      setTotal(totalPrice);
    }
  }, [cart]);
  const safeReviews = reviews?.reviews || [];
  const averageRating =
    safeReviews.length > 0
      ? Math.round(
          safeReviews.reduce((sum, review) => sum + review.rating, 0) /
            safeReviews.length
        )
      : 0;

  // const fetchReviews = async () => {
  //   try {
  //     setRefreshing(true);
  //     const response = await axios.get(
  //       `https://backend.twicks.in/api/getReviewById/${productId}`
  //     );
  //     console.log(response.data.data);
  //     if (response.data && response.data.data.reviews) {
  //       const formattedReviews = response.data.data.reviews.map((review) => ({
  //         ...review,
  //         // Assuming userId is an object with a userName property
  //         userId: review.userId.userName, // Adjust this line based on the actual structure of userId
  //       }));
  //       console.log(formattedReviews);
  //       setReviews(formattedReviews);
  //       console.log(reviews);
  //     } else {
  //       console.error("No reviews found in the response.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error.message);
  //   } finally {
  //     setRefreshing(false);
  //   }
  // };

  const ReviewAddHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You can't Add review until you are logged in");
    } else {
      const { reviewContent, rating } = inputHandler;
      try {
        const { data } = await axios.post(
          "https://backend.twicks.in/api/addReview",
          {
            reviewContent: reviewContent,
            rating: rated,
            productId: productId,
            userId: userData?._id,
          }
        );
        if (data.success) {
          setInputHandler({
            ...inputHandler,
            reviewContent: "",
            rating: "",
          });
          // await fetchReviews(); // Await the completion of fetchReviews
          navigation.navigate("Back");
        }
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  useEffect(() => {
    if (cart) {
      const productInCart = cart.products.find(
        (product) => product.productId?._id === route.params.productId
      );
      if (productInCart) {
        setQuantity(productInCart.units);
      }
    }
  }, [cart, route.params.productId]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigation.navigate("Login");
        }
      } catch (error) {
        // console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [navigation]);

  const onChangeInputHandler = (text) => {
    setInputHandler((prevState) => ({ ...prevState, reviewContent: text }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const user = JSON.parse(userString);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const decreaseValueHandler = async () => {
    try {
      const { data } = await axios.delete(
        `https://backend.twicks.in/api/dropFromCart/${userData._id}/${productId}`
      );
      if (data.success) {
        if (quantity != 1) {
          setQuantity((prevQuantity) => prevQuantity - 1); // Correct
        } else {
          setInCart(false);
        }
      } else {
        console.log("error while decreasing the cart ");
      }
    } catch (error) {
      Alert("Failed to remove the cart", "Try Again Later");
    }
  };

  const increaseValueHandler = async () => {
    try {
      if (cart?.products[index]?.units == productQuantity) {
        alert("you react limit");
      } else {
        const { data } = await axios.put(
          `https://backend.twicks.in/api/addToCart`,
          {
            userId: userData._id,
            productId: productId,
            units: 1,
          }
        );
        if (data.success) {
          setQuantity((prevQuantity) => prevQuantity + 1); // Correct
        } else {
          Alert("Quantity Does not Added");
        }
      }
    } catch (error) {
      console.log(error, "catuch rro while increasing product");
    }
  };

  const onCartClick = async () => {
    try {
      if (userData._id) {
        await axios.put("https://backend.twicks.in/api/addToCart", {
          productId: productId,
          userId: userData._id,
          units: 1,
        });
        setInCart(true);
        setQuantity(quantity + 1);
      } else {
        Alert("please login to add product in cart");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <SafeAreaView
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "White",
          }}
        >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#28635D" // Customize the color of the refresh indicator
              />
            }
            style={{ backgroundColor: "white", width: "100%", height: "100%" }}
          >
            <View style={{ paddingBottom: 25, backgroundColor: "#28635D" }}>
              <Image
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 250,
                }}
                source={{ uri: productImage }}
              />
            </View>
            <View
              style={{
                // height: "160%",
                padding: 20,
                // paddingBottom:150,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: "white",
                marginTop: -25,
              }}
            >
              <View style={{ alignItems: "flex-start" }}>
                <Text style={{ color: "#28635D", fontSize: 20 }}>
                  {productCategory}
                </Text>
                <Text style={{ fontSize: 30 }}>{productName}</Text>
                <View style={styles.ratingAndReview}>
                  <View style={styles.rating}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Text key={i}>
                        {i < averageRating ? (
                          <View>
                            <Entypo name="star" size={17} color="#FFBB56" />
                          </View>
                        ) : (
                          <View style={{ paddingTop: "-5" }}>
                            <Entypo
                              name="star-outlined"
                              size={17}
                              color="#FFBB56"
                            />
                          </View>
                        )}
                      </Text>
                    ))}
                  </View>

                  <Text style={styles.review}>{productReview} Reviews</Text>
                </View>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.line}></View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    paddingBottom: 20,
                    paddingTop: "4%",
                  }}
                >
                  Description
                </Text>
                <Text style={{ fontSize: 17 }}>{productDetais}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: "8%",
                }}
              >
                <View>
                  <Text style={{ fontSize: 20 }}>{productPrice}/-</Text>
                  <Text style={{ color: "gray" }}>Total Price</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View style={styles.line}></View>
            </View>
            <View
              style={{ width: "100%", paddingTop: "2%", paddingHorizontal: 10 }}
            >
              <View
                style={{
                  display: "flex",
                  gap: 1,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>Add Review</Text>
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 3,
                  }}
                >
                  <Text style={{ flexDirection: "row", gap: 5 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name={i < rated ? "star" : "star-o"}
                        size={17}
                        color={i < rated ? "#FFBB56" : "#FFBB56"}
                        onPress={() => setRated(i + 1)}
                      />
                    ))}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "space-between",
                  alignItems: "",
                  paddingHorizontal: 10,
                  height: "3%",
                }}
              >
                <TextInput
                  placeholder="add your review"
                  onChangeText={onChangeInputHandler}
                  value={inputHandler.reviewContent}
                  name="reviewContent"
                  style={{
                    padding: 10,
                    borderRadius: 2,
                    borderColor: "grey",
                    borderWidth: 0.2,
                    flex: 4,
                  }}
                />
                <Pressable
                  onPress={ReviewAddHandler}
                  style={{
                    padding: 5,
                    backgroundColor: "#28635D",
                    flex: 1,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      paddingVertical: "auto",
                    }}
                  >
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>

            {reviews?.reviews?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{ paddingVertical: 10, paddingHorizontal: 20 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      paddingVertical: 10,
                    }}
                  >
                    <FontAwesome6 name="circle-user" size={17} color="black" />
                    <View>
                      <Text style={{ textAlign: "center", paddingTop: 2 }}>
                        {item?.userId?.userName}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Text key={i}>
                        {i < item.rating ? (
                          <View>
                            <Entypo name="star" size={17} color="#FFBB56" />
                          </View>
                        ) : (
                          <View style={{ paddingTop: "-5" }}>
                            <Entypo
                              name="star-outlined"
                              size={17}
                              color="#FFBB56"
                            />
                          </View>
                        )}
                      </Text>
                    ))}
                  </View>

                  <View>
                    <Text style={{ fontSize: 15 }}>{item.review}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {inCart ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                backgroundColor: "white",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={{
                  backgroundColor: "white",
                  padding: 14,
                  borderWidth: 1,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="shoppingcart" size={24} color="black" />
              </Pressable>
              <Pressable
                style={{
                  padding: 1,
                  borderRadius: 10,
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginVertical: 12,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 30,
                  }}
                >
                  <View>
                    <Pressable
                      onPress={() => decreaseValueHandler()}
                      style={{
                        backgroundColor: "#28635D",
                        padding: 13,
                        borderRadius: 10,
                      }}
                    >
                      <AntDesign
                        style={{ fontSize: 30, color: "white" }}
                        name="minus"
                        size={18}
                        color="black"
                      />
                    </Pressable>
                  </View>
                  <View>
                    <Text style={{ fontSize: 25, color: "black", padding: 14 }}>
                      {quantity}
                    </Text>
                  </View>
                  <View>
                    <Pressable
                      onPress={() => increaseValueHandler()}
                      style={{
                        backgroundColor: "#28635D",
                        padding: 13,
                        borderRadius: 10,
                      }}
                    >
                      <AntDesign
                        style={{ fontSize: 30, color: "white" }}
                        name="plus"
                        size={18}
                        color="black"
                      />
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                backgroundColor: "white",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={{
                  backgroundColor: "white",
                  padding: 14,
                  borderWidth: 1,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="shoppingcart" size={24} color="black" />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#28635D",
                  padding: 1,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 12,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    color: "white",
                    marginBottom: 2,
                    fontSize: 20,
                  }}
                >
                  <View style={{ marginVertical: -5 }}>
                    <Pressable
                      style={{
                        backgroundColor: "#28635D",
                        padding: 12,
                        borderRadius: 10,
                        alignItems: "center",
                        marginHorizontal: 10,
                        marginVertical: 10,
                        paddingBottom: 4,
                        marginTop: 10,
                        flexDirection: "row",
                        gap: 10,
                        bottom: 5,
                        justifyContent: "center",
                      }}
                      onPress={() => onCartClick()}
                    >
                      <Text style={{ color: "white", fontSize: 20 }}>
                        Add To Cart
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default SingleShopScreen;

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  ratingAndReview: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  rating: {
    flexDirection: "row",
    gap: 2,
  },
  review: {
    marginLeft: 10,
    fontSize: 14,
  },
});
