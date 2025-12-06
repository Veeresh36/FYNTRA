import React, { useState, useEffect } from 'react'
import style from '../components/dropZone.module.css'
import { useDropzone } from 'react-dropzone'
import { HiMiniXMark } from "react-icons/hi2";


function dropZone({ images, setImages }) {

    let [errMsg, setErrMsg] = useState(false)


    // adding the img upload concept
    let onDrop = (acceptedImg) => {
        if (images.length + acceptedImg.length > 5) {
            setErrMsg(true)
            return
        }
        let fileURL = acceptedImg.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }))
        setErrMsg("")
        setImages((existing) => [...existing, ...fileURL]);
        console.log(fileURL);

    }

    // remove img concept
    let removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // img type and some other constraints
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: "Image/*"
    })

    return (
        <>
            <div className={style.imgUp}>
                <h4>Upload Product Image</h4>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        <div className={style.dropBox}>
                            <span>Drop the files here ... <br /> Drag 'n' drop some files here, or click to select files</span>
                        </div>
                    }
                </div>
                <div className={style.Upimgs}>
                    {
                        images.map((img, index) => {
                            return <div className={style.thumbnail}>
                                <img src={img.preview} alt="uploaded imgs" ></img>
                                <HiMiniXMark onClick={() => removeImage(index)} className={style.cross} />
                            </div>
                        }
                        )
                    }
                </div>
                {
                    errMsg && <><h5>upload 5 images only</h5></>
                }
            </div>

        </>
    )
}

export default dropZone
