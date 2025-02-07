import React from "react";

const SectionHeading = ({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) => {
  return (
    <div className="mx-auto lg:max-w-2xl lg:text-center">
      <p className="text-base font-semibold leading-7 text-indigo-600 animate-fadeInUp">
        {subtitle}
      </p>
      <h2 className="mt-2 text-[26px] font-bold tracking-tight text-gray-900 sm:text-4xl animate-fadeInUp animate-delay-100">
        {title}
      </h2>
      <p className="mt-4 md:mt-6 leading-relaxed text-base md:leading-8 text-gray-600 animate-fadeInUp animate-delay-200 md:text-lg">
        {description}
      </p>
    </div>
  );
};

export default SectionHeading;
