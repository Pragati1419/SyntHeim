import React, { useState } from "react";
import { Button, Text, View, TextInput, Image } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";

const PLACEHOLDER_IMG =
  "https://ehs.stanford.edu/wp-content/uploads/missing-image.png";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the characters limit"),
});

const PostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const img_url = "http://img_url";
  const caption = "hi ";
  const userId = "userId";

  // for post api
  // 1. user Id
  //2. caption
  //3 img url
  const CreatePost = async () => {};

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            image: img_url,
            caption: caption,
          }),
        };

        try {
          fetch(
            "https://postapisy.herokuapp.com/api/posts/create",
            requestOptions
          ).then((response) => {
            response.json().then((data) => {
              Alert.alert("Post created at : ", data.createdAt);
              navigation.goBack();
            });
          });
        } catch (error) {
          console.error(error);
        }
        console.log(values);
        console.log("Your post was submitted succesfully!");
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                mutiline={true}
                style={{ color: "white", fontSize: 20 }}
                onChangeText={handleChange("caption")}
                value={values.caption}
                onBlur={handleBlur("caption")}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            placeholder="Enter image url"
            placeholderTextColor="gray"
            style={{ color: "white", fontSize: 18 }}
            onChangeText={handleChange("imageUrl")}
            value={values.imageUrl}
            onBlur={handleBlur("imageUrl")}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
          {/* onPress={()=>CreatePost()} */}
        </>
      )}
    </Formik>
  );
};

export default PostUploader;
