import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="144" r="125" /> 
    <rect x="0" y="285" rx="10" ry="10" width="280" height="30" /> 
    <rect x="0" y="325" rx="9" ry="9" width="280" height="77" /> 
    <rect x="0" y="415" rx="10" ry="10" width="95" height="30" /> 
    <rect x="122" y="415" rx="25" ry="25" width="152" height="45" /> 
  </ContentLoader>
)

export default Skeleton