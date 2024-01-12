import React, { useEffect, useState } from "react";

import { useParseAndFetchFileData } from "../hooks/useParseAndFetchFileData";
import { PageLayout } from "../components/page-layout/PageLayout";
import { CheckBox } from "../components/checkbox";
import { Section } from "../components/section/Section";
import { ImageSlider } from "../components/image-slider";
import { EditionTranscriptionBody } from "./components";
import { EditionAboutBody } from "./components/EditionAboutBody";
import { useIPFSFilebaseClient } from "../hooks/useIPFSFilebaseClient";
import { DottedLoader } from "../components/loader";
import { ErrorComponent } from "../components/error-component";
import { UploadContainer } from "../upload";

import "./EditionsDashboard.css";

export const EditionsDashboard = () => {
  const { fetchAndParseXML } = useParseAndFetchFileData();
  const { getObjectList, fetchedContent, uploadObject } =
    useIPFSFilebaseClient();

  const [isUploaded, setIsUploded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [htmlEditionMetadata, setHtmlEditiontMetadata] = useState({});
  const [htmlEditionBody, setHtmlEditionBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  const [shownSection, setShownSection] = useState([
    { status: true, title: "About", value: "about" },
    { status: true, title: "Facsimile", value: "facsimile" },
    { status: true, title: "Transcription", value: "transcription" },
  ]);

  useEffect(() => {
    getObjectList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(fetchedContent).length && isUploaded) {
      fetchAndParseXML(fetchedContent["tei-xml"]?.[0]?.Body)
        .then((content) => {
          setHtmlEditiontMetadata({
            ...htmlEditionMetadata,
            ...content.EditionMetaData,
          });

          setHtmlEditionBody({
            ...htmlEditionBody,
            ...content.EditionContent,
          });

          setIsLoading(false);
          setErrorFetching(false);
        })
        .catch(() => {
          setErrorFetching(true);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedContent, isUploaded]);

  const handleCheckboxChange = (ev) => {
    const value = ev.target.value;
    setShownSection((prevSections) =>
      prevSections.map((section) =>
        section.value === value
          ? { ...section, status: !section.status }
          : section
      )
    );
  };

  const checkStatus = (value) => {
    const section = shownSection.find((section) => section.value === value);
    return section ? section.status : false;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // You can perform actions with the selected file here
    if (selectedFile) {
      setIsLoading(true);
      console.log(`Uploading file: ${selectedFile.name}`);
      uploadObject(selectedFile);
      setTimeout(() => setIsUploded(true), 5000);
    } else {
      console.log("No file selected.");
      setIsLoading(false);
      setIsUploded(false);
    }
  };

  return (
    <PageLayout>
      <UploadContainer
        selectedFile={selectedFile}
        handleUpload={handleUpload}
        handleFileChange={handleFileChange}
      />
      {isLoading ? (
        <DottedLoader />
      ) : isUploaded ? (
        <div className="container">
          <>
            <div className="edition-title">
              <span>{htmlEditionMetadata.editionTitle}</span>
            </div>

            <div>
              {shownSection.map((val) => (
                <CheckBox
                  title={val.title}
                  value={val.value}
                  status={val.status}
                  shownSection={shownSection}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>

            {errorFetching ? (
              <ErrorComponent message="Error Fetching and parsing XML document. Kindly, try again later!" />
            ) : (
              <div className="edition-content">
                {checkStatus("facsimile") ? (
                  <Section
                    title="Facsimile"
                    bodyComponent={
                      <ImageSlider slides={fetchedContent["images"]} />
                    }
                  />
                ) : null}

                {checkStatus("transcription") ? (
                  <Section
                    title="Transcription"
                    bodyComponent={
                      <EditionTranscriptionBody content={htmlEditionBody} />
                    }
                  />
                ) : null}

                {checkStatus("about") ? (
                  <Section
                    title="About"
                    bodyComponent={
                      <EditionAboutBody content={htmlEditionMetadata} />
                    }
                  />
                ) : null}
              </div>
            )}
          </>
        </div>
      ) : (
        <div className="no-file">
          <span>No digital edition found</span>
        </div>
      )}
    </PageLayout>
  );
};
