import {
  useRef,
  useState,
  useEffect,
  createContext,
  Fragment,
  useCallback,
  isValidElement,
  useContext,
} from 'react'

import Error from 'next/error'
import dynamic from 'next/dynamic'

import { SidebarLayout } from '@/layouts/SidebarLayout'
import ArticleLayout from '@/layouts/ArticleLayout'
import tinytime from 'tinytime'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { PageHeader } from '@/components/PageHeader'
import { getPost, getBlog, getPosts } from '@/lib/blog';
import {NextSeo} from 'next-seo'
// const {serialize} = require('next-mdx-remote/serialize')
// import { MDXRemote } from 'next-mdx-remote'
import { Heading } from '@/components/Heading';
import { Markdown } from '@/components/Markdown'

const components = {
  Heading,
}

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}) {

  const { blog_slug, post_slug } = params;
  const blog = await getBlog(blog_slug);
  const post = blog? await getPost(blog_slug, post_slug):null;
  const errorCode = !blog || !post?404: 0;
  
  return {
    props: {
      errorCode,
      ...post,
      blog,
      background_image: '/img/header-background-ellipse.png'
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { 
      blog_slug: post.blog__expand.slug,
      post_slug: post.slug },
  }))

  console.log('Building Blogs...');
  console.log(paths);
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default function Post(props) {

  const router = useRouter()

  const {
    errorCode,
    name = 'Missing title',
    body,
    blog, 
    summary,
    seo_title,
    image,
    background_image,
    // mdxSource,
  } = props

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  let seo_title_calc = seo_title ? seo_title : name;
  if (blog && blog.name){
    seo_title_calc += ' - ' + blog.name
    // if (blog.site__expand) 
    //   seo_title_calc += ' | ' + blog.site__expand.name
  }
  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  const imageUrl = image?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${image}` : null
  return (
    <>
      <NextSeo
        title={seo_title_calc}
        description={summary}
        openGraph={{
          title: seo_title_calc,
          description: summary,
          url,
          images: [
            {
              url: imageUrl,
              alt: name,
            },
          ],
        }}
        // twitter={{
        //   cardType: seo.cardType || 'summary_large_image',
        //   site: seo.site || 'eggheadio',
        //   handle: seo.handle,
        // }}
        // canonical={canonicalUrl}
      />
      <div className="w-full h-full bg-no-repeat absolute hidden lg:block" style={{backgroundImage: `url("${background_image}")`}}>
      </div>
      <div className="w-full max-w-8xl mx-auto lg:flex px-4 sm:px-6 lg:px-8 z-10">
        {blog.menu && blog.menu.items && (
        <nav id="sidebar" className="fixed z-40 inset-0 flex-none h-full lg:bg-gray-50 lg:bg-opacity-75 w-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden">
          <div id="navWrapper" className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0">
            <div className="text-xl font-bold tracking-tight text-gray-900 mt-16 px-8">
              {blog.menu.name}
            </div>
            <nav id="nav" className="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-md pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)">
              <ul>
                <li className="mb-8">
                  {/* <h5 className="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">Getting started</h5> */}
                  <ul>
                    {blog.menu.items &&  blog.menu.items.map((item) => (
                    <li>
                      <a className="px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500" href={item.url}>
                        <span className="rounded-md absolute inset-0 bg-cyan-50 opacity-0"></span><span className="relative">{item.name}</span>
                      </a>
                    </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <div className="text-md tracking-tight text-black mt-12 px-3">
                有问题？<br/>
                400-820-1612
              </div>
            </nav>
          </div>
        </nav>
        )}
        <div id="content-wrapper" className="lg:px-8 min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
          <article className="mx-auto max-w-screen-md lg:mt-14 md:mt-8 mt-6 mb-16">
            <header>
              <h1 className="text-black max-w-screen-md lg:text-6xl md:text-5xl sm:text-4xl text-3xl w-full font-bold mb-8 lg:mb-10 lg:leading-tight">
                {name}
              </h1>
              <div className="text-xl">
                <Markdown body={summary} className="prose sm:prose-lg lg:prose-xl"></Markdown>
              </div>
              {/* {author && <Author author={author} />} */}
              {imageUrl && (
                <div className="my-8">
                  <img className="rounded-lg" src={imageUrl} alt=""></img>
                </div>
              )}
              {/* {tags && (
                <ul>
                  Posted in
                  {tags.map((tags: any) => (
                    <li key={tags}>{tags}</li>
                  ))}
                </ul>
              )} */}
            </header>
            <main className="py-8">
              <Markdown body={body} className="prose sm:prose-lg lg:prose-xl"></Markdown>
            </main>
          </article>
        </div>
      </div>
    </>
  )
}
