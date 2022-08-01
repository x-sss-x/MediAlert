import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Capsule = ({size,color,style}) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 35 27" style={{...style}}>
<Path d="M33.7423 16.1578L25.7761 4.86964C24.4211 2.95313 22.264 1.92857 20.0765 1.92857C18.7032 1.92857 17.3117 2.33237 16.0964 3.17612C14.8994 4.00781 14.0487 5.1529 13.5747 6.41853C13.3985 2.84464 10.4514 0 6.80558 0C3.04428 0 0 3.01942 0 6.75V20.25C0 23.9806 3.04428 27 6.80558 27C10.5669 27 13.6112 23.9806 13.6112 20.25V11.2641C13.8117 11.7824 14.0547 12.2946 14.3889 12.7708L22.3612 24.0589C23.7102 25.9754 25.8673 27 28.0609 27C29.4402 27 30.8256 26.5962 32.0409 25.7525C35.1824 23.5708 35.942 19.2737 33.7423 16.1578ZM9.72226 13.5H3.88891V6.75C3.88891 5.1529 5.19533 3.85714 6.80558 3.85714C8.41583 3.85714 9.72226 5.1529 9.72226 6.75V13.5ZM21.5591 16.206L17.573 10.5589C17.1051 9.89598 16.9228 9.08839 17.0686 8.29286C17.2084 7.49732 17.6581 6.79821 18.3265 6.33415C18.843 5.97255 19.4506 5.78571 20.0765 5.78571C21.0791 5.78571 22.0148 6.26786 22.586 7.08147L26.5722 12.7286L21.5591 16.206Z" fill={color}/>
</Svg>
  )
}

export default Capsule