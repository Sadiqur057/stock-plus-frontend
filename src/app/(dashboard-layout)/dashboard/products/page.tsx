import BreadCrumb from '@/components/shared/dashboard/BreadCrumb';
import React from 'react';

const page = () => {
  const breadcrumbList = [
    {
      name: "Home",
      link: '/'
    },
    {
      name: "Products",
      link: '/dashboard/products'
    },
  ]
  return (
    <div>
      <BreadCrumb breadcrumbList={breadcrumbList}/>
      Products will be here
    </div>
  );
};

export default page;