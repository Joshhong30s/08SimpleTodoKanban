import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import Document from 'next/document'

export default class MyDocuments extends Document {
  render() {
    return (
      <Html lang='zh-TW'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,600;1,700&family=Zen+Maru+Gothic:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   )
// }
