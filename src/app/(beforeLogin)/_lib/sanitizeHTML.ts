import DOMPurify from "dompurify";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const sanitizeHtml = (html: string) => {
  return DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(html);
};

export default sanitizeHtml;
