declare module '*.md' {
  let MDObject: {
    attributes: unknown;
    body: string;
    html: string;
  }
  export default MDObject;
}