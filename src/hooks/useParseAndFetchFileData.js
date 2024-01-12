import xml2js from "xml2js";

import { useConvertToHTML } from "./useConvertToHTML";

export const useParseAndFetchFileData = () => {
  const { parseEditionReference, parseEditionContent } = useConvertToHTML();

  const fetchAndParseXML = (parsedContent) => {
    return new Promise((resolve, reject) => {
      const parser = new xml2js.Parser();

      parser.parseString(parsedContent, (error, result) => {
        if (!error) {
          let htmlContent = {};

          // Sending teiHeader from the parsed XML document
          const EditionHeader = parseEditionReference(result.TEI.teiHeader[0]);
          const EditionContent = parseEditionContent(
            result.TEI.text[0].body[0]
          );

          htmlContent = {
            EditionMetaData: EditionHeader,
            EditionContent: EditionContent,
          };

          resolve(htmlContent);
        } else {
          reject(error);
        }
      });
    });
  };

  return { fetchAndParseXML };
};
