import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import '../styles/Utilities.css';

export default function Home() {
    const [audio, setAudio] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    return (
        <section className='container' id='home'>
            <div className='row' id='background'>
                <img src='background.jpg' alt='background' />
                <div id='header'>
                <h1>Welcome to <span id='title'>Music Genre </span>Transfer!</h1>
                <h1>How are you feeling today?</h1>
                <h2>Choose a genre and I'll make a new song out of it!</h2>
            </div>
            </div>

            <div className='row' id='form'>
                <h2>Here are some genres you can try:</h2>
                <Button variant="primary" className='genre' type='submit'>Jazz</Button>
                <Button variant="primary" className='genre' type='submit'>Rock</Button>
                <Button variant="primary" className='genre' type='submit'>Disco</Button>
                <Button variant="primary" className='genre' type='submit'>Classical</Button>
                <form onClick={() => document.querySelector(".input-field").click()}>
                    <input type="file" accept='audio/*' className='input-field' hidden
                        onChange={({ target: { files } }) => {
                            files[0] && setFileName(files[0].name)
                            if (files) {
                                setAudio(URL.createObjectURL(files[0]))
                            }
                        }}
                    />

                    {audio ?
                        <img src={audio} width={150} height={150} alt={fileName} />
                        :
                        <>
                            <MdCloudUpload color='#1475cf' size={60} />
                            <p>Browse Files to upload</p>
                        </>
                    }

                </form>
            </div>
        </section>
    );
};