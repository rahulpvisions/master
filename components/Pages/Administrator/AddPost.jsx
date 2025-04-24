import { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {

    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        

        const newFormData = new FormData();
        newFormData.append("title", title);
        newFormData.append("description", description);
        newFormData.append('featured_image', image);
        console.log("Form Submit", newFormData);
        try{
            const response = await axios.post("http://localhost/wordpress-new/wp-json/custom/v1/add-post", newFormData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }); 
            console.log("Response", response);
            if(response.status === 200){
                navigate('/dashboard/posts')
            }
        } catch(error){
            console.log(error)
        }
        
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center">Add Post</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group mt-4">
                            <label for="title">Title:</label>
                            <input type="text" className="form-control" value={title} onChange={(event) => setTitle(event.target.value)} id="title" placeholder="Enter title" name="title"/>
                        </div>
                        <div className="form-group mt-4">
                            <label for="description">Description:</label>
                            <CKEditor
                                editor={ ClassicEditor }
                                config={ {
                                    licenseKey: 'GPL',
                                    plugins: [ Essentials, Paragraph, Bold, Italic ],
                                    toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', ],
                                    initialData: description,
                                } }
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                }}
                            />
                        </div>
                        <div className="form-group mt-4">
                            <label for="description">Featured Image:</label>
                            <input type="file" className="form-control" id="featured_image" onChange={(e) => setImage(e.target.files[0])} name="featured_image"/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPost;