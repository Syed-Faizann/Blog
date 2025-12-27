import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadMorePosts from "./components/LoadMorePosts";
import banner from "@/public/banner.jpg";

export default async function Home() {
  // 🔹 Fetch first 8 posts (server-side)
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    include: { author: true },
  });

  const details = [
    { title: "Written by", name: "Frankie Sullivan" },
    { title: "Published on", date: "10 April 2025" },
  ];

  const li = [
    { name: "Design" },
    { name: "Retail" },
    { name: "Interviews" },
    { name: "12 min read" },
  ];
 
  return (
    <>
      <Navbar />
      <main className="mt-10 md:mt-20 px-4 md:px-14">
        {/* Hero / Featured section */}
        <div className="btn text-xs flex items-center gap-3">
          <div className="flex gap-1 items-center">
            <span className="text-blue-600 flex items-center font-bold cursor-pointer">
              Resources
            </span>
            <span className="material-symbols-outlined text-xs text-blue-600 cursor-pointer">
              arrow_forward
            </span>
          </div>
          <span className="bg-blue-100 text-blue-600 p-1 px-2 rounded-4xl font-bold cursor-pointer">
            Design & Photography
          </span>
        </div>

        <div className="heading mt-8">
          <h1 className="text-4xl font-light pb-6 md:text-7xl md:font-light w-full md:pb-8">
            Untitled Design & Photography Journal
          </h1>
          <p className="text-lg md:text-xl md:w-[66%] font-light">
            The Untitled UI Journal features carefully selected good works from
            studios, designers, architects, photographers, and creators from all
            around the globe. Subscribe for new posts in your inbox.
          </p>
        </div>

        <div className="main-img relative mt-12 w-full h-[300px] md:h-[650px] overflow-hidden">
          <Image
            src={banner}
            alt="Main banner"
            fill
            className="object-fill relative"
            priority
          />
          <div className="img-txt absolute bottom-8 text-white">
            <h1 className="text-2xl md:pl-5 md:text-4xl md:w-[76%] font-bold w-50%">
              Sophia Mesabhi from Untitled Ventures on Sustainable and
              Profitable Growth
            </h1>

            <div className="hidden md:block flex justify-between px-5">
              <div className="flex pt-10 gap-8">
                {details.map((item, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <h5 className="text-sm">{item.title}</h5>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg">
                        {item.name ? item.name : item.date}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>

              <div className="more-detai flex flex-col pt-10 gap-3">
                <h5 className="text-sm font-bold">File Under</h5>
                <ul className="flex gap-8">
                  {li.map((li, index) => (
                    <li key={index} className="border py-1 px-2 rounded-2xl">
                      {li.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Blog Posts Section */}
        <div className="blogs mt-20">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Featured blog posts
            </h1>
            <Link
              href="/posts"
              className="text-blue-600 bg-blue-100 px-4 py-2 rounded-xl font-medium hover:bg-blue-200 transition"
            >
              View all posts
            </Link>
          </div>

          <LoadMorePosts initialPosts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
