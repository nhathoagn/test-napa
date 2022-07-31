
import "./index.css"
import {Avatar, Col, Form, Image, Input, Row} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, {useEffect, useState} from 'react';
import imageUpload from "../../access/upload-solid.svg"
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import '../Post/post.css'
import format from "date-format";
import imageEdit from "../../access/pencil-alt-solid.svg";
import imageTrash from "../../access/trash-alt-regular.svg";
import {createPost, deletePost, findPostsByTitle, retrievePost} from "../../actions/post";
const AppButton = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const initialTutorialState = {
        title: "",
        description: "",
        image: ""
    };
    const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
    const [currentPost, setCurrentPost] = useState("");
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [posts, setPosts] = useState(initialTutorialState);
    const post = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrievePost());
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
        console.log("d",searchTitle)
    };

    const refreshData = () => {
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

    const removePost = () => {
        dispatch(deletePost(currentPost))
            .then(() => {
                console.log("da xoa")
            })
            .catch(e => {
                console.log(e);
            });
    };


    const findByTitle = () => {
        refreshData();
        dispatch(findPostsByTitle(searchTitle));
    };

    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function(onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    async function handleOnSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

        const formData = new FormData();

        for ( const file of fileInput.files ) {
            formData.append('file', file);
        }

        formData.append('upload_preset', 'uploads');

        const data = await fetch('https://api.cloudinary.com/v1_1/ddnv4r9pb/image/upload', {
            method: 'POST',
            body: formData,
            // mode: 'no-cors',
            // headers: {
            //   'Access-Control-Allow-Origin': '*',
            // }
        }).then(r => r.json());
        // console.log("1")
        setImageSrc(data.secure_url);
        setUploadData(data);
    }
    const handleInputChange = event => {
        const { name, value } = event.target;
        setPosts({ ...posts, [name]: value });
    };
    const saveTutorial = () => {
        const { title, description,image } = post;

        dispatch(createPost(title, description))
            .then(data => {
                setPosts({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    image: data.image
                });


                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };


  return(
     <>
         <div className="group-btn">
             <div className="btn-revert"><p>Revert</p></div>
             <div className="btn-add-new">
                 <Button className="btn-add" onClick={showModal}>
                     Add New
                 </Button>
                 <Modal className="post-modal" title="Add new card"  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                     <div className="post-modal-content">
                         <div className="post-modal-avatar">
                             <p>Avatar</p>
                             <span>*</span>
                             <Image  preview={false} width={20} height={20} style={{marginLeft: 46, marginRight: 11}} src={imageUpload}/>
                             <form  method="post" onChange={handleOnChange} onSubmit={handleOnSubmit} style={ {marginLeft: 66}}>
                                 <p>
                                     <input type="file" name="file" />
                                 </p>

                                 {/*<img src={imageSrc} />*/}
                                 {imageSrc && !uploadData && (
                                     <p>
                                         <button>Upload Files</button>
                                     </p>
                                 )}

                                 {/*{uploadData && (*/}
                                 {/*    <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>*/}
                                 {/*)}*/}
                             </form>

                         </div>
                         {/*<div className="post-modal-name">*/}
                         {/*    <p>Name</p>*/}
                         {/*    <span>*</span>*/}
                         {/*    <Input  className="post-modal-name-input"/>*/}
                         {/*</div>*/}
                         {/*<div className="post-modal-description">*/}
                         {/*      <p>Description</p>*/}
                         {/*    <span>*</span>*/}
                         {/*    <TextArea  className="post-modal-description-textarea" rows={4}/>*/}
                         {/*</div>*/}
                         <Form name="basic"
                               labelCol={{
                                   span: 4,
                               }}
                               wrapperCol={{
                                   span: 16,
                               }}
                               initialValues={{
                                   remember: true,
                               }}
                               onFinish={onFinish}
                               onFinishFailed={onFinishFailed}
                               autoComplete="off">
                             <Form.Item
                                 className="post-name"
                                 label="Name"
                                 name="name"
                                 rules={[
                                     {
                                         required: true,

                                     },
                                 ]}
                             >
                                 <Input />
                             </Form.Item>

                             <Form.Item
                                 className="post-description"
                                 label="Description"
                                 name="description"
                                 rules={[
                                     {
                                         required: true,
                                     },
                                 ]}
                             >
                                 <Input.TextArea />
                             </Form.Item>
                         </Form>
                         <div className="post-modal-avatar post-modal-image">
                             <p>Image</p>
                             <Image preview={false} width={40} height={20} style={{marginLeft: 46, marginRight: 11}} src={imageUpload}/>
                             {/*<p className="post-modal-upload">Upload Image</p>*/}
                             <form  method="post" onChange={handleOnChange} onSubmit={handleOnSubmit} style={ {marginLeft: 66}}>
                                 <p>
                                     <input type="file" name="file" />
                                 </p>
                                 {imageSrc && !uploadData && (
                                     <p>
                                         <button>Upload Files</button>
                                     </p>
                                 )}
                                 {/*<img src={imageSrc} />*/}
                                 {uploadData && (
                                     <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
                                 )}
                             </form>
                         </div>
                     </div>
                     <div className="post-modal-footer">
                         <div>
                             <Button className="post-modal-footer-save" onClick={saveTutorial}>Save</Button>
                             <Button className="post-modal-footer-cancel">Cancel</Button>
                         </div>
                     </div>
                 </Modal>
             </div>
             <div className="input"> <Input className="app-search" onChange={onChangeSearchTitle} size="large" placeholder="Search name..."  suffix={<SearchOutlined onClick={findByTitle}/>} /></div>
         </div>
         <>
             <Row gutter={[16, 16]}>

                 { post && post.map( (value, index) =>(
                     <Col span={7} >
                         <div className="post" onClick={() => setCurrentPost(value.id)}>
                             <div className="post-top">
                                 <div className="post-avatar"> <Avatar  src="https://joeschmoe.io/api/v1/random"/></div>
                                 <div className="post-info">
                                     <h3>{value.title}</h3>

                                     <p>{format.asString(new Date(value.createdAt))}</p>
                                 </div>
                                 <div className="post-option">
                                     <Image preview={false} className="icon-edit" width={18} height={18} src={imageEdit}/>
                                     <Image preview={false} onClick={() => removePost(currentPost)} className="icon-trash" width={18} height={18} src={imageTrash} />
                                 </div>
                             </div>
                             <div className="post-mid">
                                 <p>{value.description}</p>
                             </div>
                             <div className="post-bottom">
                                 <Image preview={false} width={310} height={180} style={{paddingBottom: 22}} src={value.image}/>
                             </div>
                         </div>
                     </Col>
                 ))}

             </Row>
         </>
     </>

  )
}
export default AppButton