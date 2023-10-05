"use client";

import { useMemo, useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import Image from "next/image";
// import myImage from "../../../assets/Adi.jpg";

function variants() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

const socialIcons = [
  {
    id: "facebook",
    icon: (
      <FaFacebookF
        color="rgba(13, 183, 96, 1)"
        className="w-[40px] h-[40px] "
      />
    ),
    url: "https://www.facebook.com/",
  },
  {
    id: "twitter",
    icon: (
      <FaTwitter color="rgba(13, 183, 96, 1)" className="w-[40px] h-[40px] " />
    ),
    url: "https://twitter.com/",
  },
  {
    id: "linkedin",
    icon: (
      <FaLinkedinIn
        color="rgba(13, 183, 96, 1)"
        className="w-[40px] h-[40px] "
      />
    ),
    url: "https://www.linkedin.com/in/aditya-mishra-a95628244/",
  },
  {
    id: "instagram",
    icon: (
      <FaInstagram
        color="rgba(13, 183, 96, 1)"
        className="w-[40px] h-[40px] "
      />
    ),
    url: "https://getinstahub.com/",
  },
];

export default function ClientHomeView({ data }) {
  console.log(data, "ClientHomeView");

  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);
  const imageStyles = {
    opacity: 1, // Adjust the opacity as needed (0.0 to 1.0)
  };

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="home">
      <AnimationWrapper>
        <motion.div
          className={
            "grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          }
          variants={setVariants}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="mb-4 text-3xl lg:text-4xl xl:text-6xl font-medium leading-normal">
              {data && data.length
                ? data[0]?.heading
                    .split(" ")
                    .map((item, index) => (
                      <span
                        key={index}
                        className={`${
                          index === 2 || index === 3
                            ? "text-green-main"
                            : "text-[#000]"
                        }`}
                      >
                        {item}{" "}
                      </span>
                    ))
                : null}
            </h1>
            <p className="text-[#000] mt-4 mb-8 font-bold">
              {data && data.length ? data[0]?.summary : null}
            </p>
            <motion.div className="flex gap-3 cursor-pointer">
              {socialIcons.map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 80,
                      duration: 4,
                    }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.8, rotate: -360, borderRadius: "100%" }}
                  >
                    {item.icon}
                  </motion.div>
                </a>
              ))}
            </motion.div>
          </div>
          <motion.div ref={containerRef} className="flex w-full justify-end">
            <motion.div
              drag
              dragConstraints={containerRef}
              className="w-[400px] h-[400px] relative bg-green-main"
            >
              <div className="w-[400px] h-[400px] top-[40px] left-[-30px] rounded-lg border-[6px] border-[#000000] absolute"></div>
              <Image
                src="/_next/static/media/Adi.05261ae8.jpg"
                alt="Profile Picture"
                layout="responsive"
                quality={100}
                height={300}
                width={200}
                style={imageStyles}
                className="absolute top-[0px]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}
