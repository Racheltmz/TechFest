import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import '../styles/Utilities.css';

export default function Home() {
    const [audio, setAudio] = useState(null)
    const [fileName, setFileName] = useState("No selected file")

    // Function to handle file input change
    const handleFileInputChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            setFileName(file.name); // Update the file name state
            const audioURL = URL.createObjectURL(file); // Create object URL for the audio file
            setAudio(audioURL); // Update the audio URL state
        }
    };

    return (
        <section className='container' id='home'>
            <Row id='background'>
                <img src='background.jpg' alt='background' />
                <div id='header'>
                    <h1>Welcome to <span id='title'>Music Genre </span>Transfer!</h1>
                    <h1>How are you feeling today?</h1>
                    <h2>Choose a genre and I'll make a new song out of it!</h2>
                </div>
            </Row>

            <Row id='form'>
                <div className='form-content' id='input'>
                    <h2>Upload a song (.wav file):</h2>
                    <form onClick={() => document.querySelector(".input-field").click()}>
                        <input
                            type="file"
                            accept="audio/*"
                            className='input-field'
                            hidden
                            onChange={handleFileInputChange} // Handle file input change
                        />
                        {audio ?
                            <audio controls autoplay><source src={audio} type="audio/mpeg"></source></audio>
                            :
                            <>
                                <MdCloudUpload color='#1475cf' size={60} />
                                <p>Browse Files to upload</p>
                            </>
                        }
                    </form>
                    <div className='uploaded-row'>
                        <AiFillFileImage color='#1475cf' />
                        <span className='upload-content'>
                            {fileName} -
                            <MdDelete
                                onClick={() => {
                                    setFileName("No selected File")
                                    setAudio(null)
                                }}
                            />
                        </span>
                    </div>
                </div>

                <div className='form-content' id='reference'>
                    <h2>Select a Genre:</h2>
                    <Button variant="primary" className='genre' type='submit'>Jazz</Button>
                    <Button variant="primary" className='genre' type='submit'>Rock</Button>
                    <Button variant="primary" className='genre' type='submit'>Disco</Button>
                    <Button variant="primary" className='genre' type='submit'>Classical</Button>
                    <Button variant="primary" className='genre' type='submit'>Country</Button>
                    <Button variant="primary" className='genre' type='submit'>Hiphop</Button>
                    <Button variant="primary" className='genre' type='submit'>Metal</Button>
                    <Button variant="primary" className='genre' type='submit'>Pop</Button>
                </div>
            </Row>
        </section>
    );
};