import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }


  render() {
    return (
      <Html
        lang="en"
        className={`text-gray-500 antialiased ${
          this.props.dangerousAsPath.startsWith('/examples/') ? '' : 'bg-white'
        } ${
          this.props.dangerousAsPath.startsWith('/embed/') ? 'embed-page' : ''
        }`}
      >
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00b4b6" />
          {/* <link rel="stylesheet" media="all" href="/css/tailwind-min.css" /> */}
  
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script src={`https://hm.baidu.com/hm.js?${process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID}`}/>
      </Html>
    )
  }
}
