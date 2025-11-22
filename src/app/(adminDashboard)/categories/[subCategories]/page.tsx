import React from "react";
import SubCategoryContainer from "./_components/SubCategoryContainer";

export default function SubCategoryPage({ params }: any) {
  const id = params?.subCategories;
  return <SubCategoryContainer id={id} />;
}
