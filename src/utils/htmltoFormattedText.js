function HtmlToFormattedText({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
export default HtmlToFormattedText;
