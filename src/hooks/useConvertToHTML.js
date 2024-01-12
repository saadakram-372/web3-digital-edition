import { useMemo } from "react";

export const useConvertToHTML = () => {
  // Function to parse edition reference information from the current document
  const parseEditionReference = useMemo(() => {
    return (currentDocument) => {
      const { editionStmt, titleStmt, seriesStmt, sourceDesc } =
        currentDocument.fileDesc[0];

      // Extract relevant information and create editionReference object
      const editionReference = {
        editionHeader: editionStmt[0].edition[0],
        transcribedBy: editionStmt[0].respStmt[0].persName[0],
        encodedBy: editionStmt[0].respStmt[1].persName[0],
        editionTitle: titleStmt[0].title[0],
        seriesStatement: `${seriesStmt[0].title[0]._}${seriesStmt[0].title[1]._}`,
        author: sourceDesc[0].biblFull[0].titleStmt[0].author[0].persName,
      };

      return editionReference;
    };
  }, []);

  // Function to parse edition content information from the current document
  const parseEditionContent = useMemo(() => {
    return (currentDocument) => {
      const { head, div2 } = currentDocument.div1[0];
      const { p, head: div2_head } = div2[0];

      // Extract information for Div1 header transcription and translation
      const Div1HeaderTranscription = convertAndFormatArrayToString({
        w: head[0].w,
      });
      const Div1HeaderTranslation = convertAndFormatArrayToString({
        w: head[0].note[0].p[0].w,
      });

      // Function to extract information for Div2 header and body transcription
      const div2ContentExtraction = () => {
        const div2TranscriptionParas = [];
        const div2HeaderTranscription = convertAndFormatArrayToString({
          w: div2_head[0].w,
        });

        // Extract information for each paragraph in Div2 body
        p.map((content) =>
          div2TranscriptionParas.push(
            convertAndFormatArrayToString({
              pc: content.pc,
              w: content.w,
            })
          )
        );

        return { div2TranscriptionParas, div2HeaderTranscription };
      };

      // Create editionReference object for Div1 and Div2
      const editionReference = {
        div1: {
          header: {
            transcription: Div1HeaderTranscription,
            translation: Div1HeaderTranslation,
          },
        },
        div2: {
          header: {
            transcription: div2ContentExtraction().div2HeaderTranscription,
            translation: null,
          },
          body: {
            transcription: div2ContentExtraction().div2TranscriptionParas,
          },
        },
      };

      return editionReference;
    };
  }, []);

  return { parseEditionReference, parseEditionContent };
};

/**
 * Function to convert array of strings into a concatenate string with proper formatting of symbols
 * The format of obj is as following:
 * {w: [this is our transcripted text], pc: [this is array of symbols to be integrated in text]}
 */
const convertAndFormatArrayToString = (xmlObject) => {
  const xmlSections = Object.keys(xmlObject);

  // Flatten and sort the content based on the 'xml:id' attribute
  const sortedXmlContent = xmlSections
    .flatMap((section) => xmlObject[section])
    .sort((itemA, itemB) => {
      const xmlIdA = itemA["$"]["xml:id"];
      const xmlIdB = itemB["$"]["xml:id"];
      return xmlIdA.localeCompare(xmlIdB);
    });

  // Extract the strings in interleaved order
  const interleavedStrings = sortedXmlContent
    .map((item) => item["_"])
    .filter(Boolean);

  return interleavedStrings.join(" ");
};
