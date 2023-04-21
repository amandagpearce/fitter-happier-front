import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head />
      <body>
        <div id="backdrop-portal"></div>
        <div id="modal-portal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
