import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getVideos,  } from '@/lib/video';

export async function getStaticProps( {params,} ) {
  const videos = await getVideos();
  
  return {
    props: {
      videos
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

const SiteVideos: React.FC = (props: any) => {
  const { videos } = props;
  return (
    <div className="text-black mx-auto max-w-screen-lg lg:py-16 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="md:text-4xl text-2xl text-center font-bold pb-16">
        视频
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-8">
        {videos.map((video: any) => {
          return (
            <div key={`/videos/${video.slug}`} className="flex flex-col">
              {video.thumb_image ? (
                <div className="md:mb-4 mb-2">
                  <Link href={`/videos/${video.slug}`}>
                    <a>
                      <img
                        src={`${process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL}/api/files/images/${video.thumb_image}`}
                        alt={video.name}
                        width={1280}
                        height={720}
                        className="rounded-lg"
                      />
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="aspect-w-16 aspect-h-9 md:mb-4 mb-2">
                  <Link href={`/videos/${video.slug}`}>
                    <a>
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-600">
                        <IconPlaceholder />
                      </div>
                    </a>
                  </Link>
                </div>
              )}
              <Link href={`/videos/${video.slug}`}>
                <a>
                  <h2 className="md:text-2xl text-xl font-bold leading-tighter hover:text-blue-600 dark:hover:text-blue-300">
                    {video.name}
                  </h2>
                </a>
              </Link>
              {/* <h2 className="uppercase font-semibold text-xs mt-2 text-gray-700 dark:text-gray-300">
                {video.owner__expand.name}
              </h2> */}
              {video.summary && (
                <div className="prose dark:prose-dark mt-2 text-gray-700 dark:text-white">
                  {video.summary}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const IconPlaceholder = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        fill="currentColor"
      />
    </g>
  </svg>
)

export default SiteVideos;
