import AWS from "aws-sdk";
import { useState } from "react";

export const useIPFSFilebaseClient = () => {
  const [fetchedContent, setFetchedContent] = useState({});

  const {
    REACT_APP_REGION: REGION,
    REACT_APP_FILEBASE_BUCKET: BUCKET,
    REACT_APP_FILEBASE_ACCESS_KEY: FILEBASE_ACCESS_KEY,
    REACT_APP_FILEBASE_SECRET_KEY: FILEBASE_SECRET_KEY,
    REACT_APP_FILEBASE_ENDPOINT: FILEBASE_ENDPOINT,
  } = process.env;

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    accessKeyId: FILEBASE_ACCESS_KEY,
    secretAccessKey: FILEBASE_SECRET_KEY,
    endpoint: FILEBASE_ENDPOINT,
    region: REGION,
    s3ForcePathStyle: true,
  });

  const uploadObject = async (file) => {
    // Implement the logic to upload file to decentralised storage
    const uploadParams = {
      Bucket: BUCKET,
      Key: file.name,
      ContentType: "text/xml",
      Body: file,
      ACL: "public-read",
    };

    try {
      const request = s3.putObject(uploadParams);

      const data = await request.promise();
      request.send();
      return data.$response.httpResponse.headers["x-amz-meta-cid"];
    } catch (err) {
      console.log("Error uploading TEI files: ", err);
      return null;
    }
  };

  const unit8ArrayToText = (uint8Array) => {
    const textDecoder = new TextDecoder("utf-8");
    return textDecoder.decode(uint8Array).toString();
  };

  const unit8ArrayToImage = (uint8Array) => {
    const blob = new Blob([uint8Array], { type: "image/png" });
    return URL.createObjectURL(blob);
  };

  const getObjectList = async () => {
    const listObjectsParams = {
      Bucket: BUCKET,
      MaxKeys: 20,
    };

    try {
      // Get list of objects in a bucket with keys
      const listObjectsResponse = await new Promise((resolve, reject) => {
        s3.listObjectsV2(listObjectsParams, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });

      // Use Promise.all to handle multiple async operations concurrently
      const fetchedObjects = await Promise.all(
        listObjectsResponse.Contents.map(async (object) => {
          const getObjectParams = {
            Bucket: BUCKET,
            Key: object.Key,
          };

          try {
            const getObjectResponse = await new Promise((resolve, reject) => {
              s3.getObject(getObjectParams, (err, res) => {
                if (err) reject(err);
                else resolve(res);
              });
            });

            const convertedUint8Array =
              getObjectResponse.ContentType !== "image/png"
                ? unit8ArrayToText(getObjectResponse.Body)
                : unit8ArrayToImage(getObjectResponse.Body);

            const updatedObject = {
              ...getObjectResponse,
              Body: convertedUint8Array,
            };
            return updatedObject;
          } catch (err) {
            console.error(`Error fetching ${object.Key}:`, err);
            return null; // or handle the error accordingly
          }
        })
      );

      const filteredObjects = fetchedObjects.filter(Boolean); // Filter out null values if an error occurred
      setFetchedContent(organizeByContentType(filteredObjects));

      return filteredObjects;
    } catch (error) {
      console.error("Error when listing objects or fetching content:", error);
      throw error;
    }
  };

  const organizeByContentType = (filteredObjects) => {
    const organizedContent = {
      "tei-text": [],
      "tei-xml": [],
      images: [],
    };

    filteredObjects.forEach((object) => {
      const contentType = object.ContentType;

      switch (contentType) {
        case "text/javascript":
          organizedContent["tei-text"].push(object);
          break;
        case "text/xml":
          organizedContent["tei-xml"].push(object);
          break;
        case "image/png":
          organizedContent["images"].push(object);
          break;
        default:
          // Handle other content types if needed
          break;
      }
    });

    return organizedContent;
  };

  return { uploadObject, getObjectList, fetchedContent };
};
