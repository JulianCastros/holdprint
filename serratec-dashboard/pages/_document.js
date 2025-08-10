import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Serratec';
    return (
      <Html>
        <Head>
-         <title>HoldPrint</title>
+         <title>{APP_NAME}</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
