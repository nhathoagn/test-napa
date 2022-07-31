// import React, {useEffect, useState} from "react"
// import {Avatar, Col, Descriptions, Image, Row} from "antd";
// import imageEdit from "../../access/pencil-alt-solid.svg"
// import imageTrash from "../../access/trash-alt-regular.svg"
// import { useDispatch, useSelector } from "react-redux";
// import './post.css'
//
//
// import {findPostsByTitle, retrievePost} from "../../actions/post";
// import format from "date-format";
//
// const AppPost = () => {
//     const post = useSelector(state => state.posts);
//
//   return(
//       <>
//           <Row gutter={[16, 16]}>
//
//               { post && post.map( (value, index) =>(
//                   <Col span={7} >
//                       <div className="post">
//                           <div className="post-top">
//                               <div className="post-avatar"> <Avatar  src="https://joeschmoe.io/api/v1/random"/></div>
//                               <div className="post-info">
//                                   <h3>{value.title}</h3>
//
//                                   <p>{format.asString(new Date(value.createdAt))}</p>
//                               </div>
//                               <div className="post-option">
//                                   <Image  className="icon-edit" width={18} height={18} src={imageEdit}/>
//                                   <Image className="icon-trash" width={18} height={18} src={imageTrash} />
//                               </div>
//                           </div>
//                           <div className="post-mid">
//                               <p>{value.description}</p>
//                           </div>
//                           <div className="post-bottom">
//                               <Image preview={false} width={310} height={180} style={{paddingBottom: 22}} src={value.image}/>
//                           </div>
//                       </div>
//                   </Col>
//               ))}
//
//           </Row>
//
//
//       </>
//   )
// }
// export default AppPost