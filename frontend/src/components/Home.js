import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { LuListMusic } from "react-icons/lu";
import Swal from 'sweetalert2';
import { styleTransfer } from '../service/MusicService';
import '../styles/Utilities.css';

export default function Home() {
    const [audio, setAudio] = useState(null);
    const [fileName, setFileName] = useState("No selected file");
    const [genre, setGenre] = useState(null);
    const [genAudio, setGenAudio] = useState(null);
    const [genImage, setGenImage] = useState(null);


    useEffect(() => {
        if (fileName === null) {
            window.location.reload();
            console.log(fileName);
            setGenAudio(null);
            setGenImage(null);
        }
    }, [fileName])

    // Function to handle file input change
    const handleFileInputChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            setFileName(file.name); // Update the file name state
            const audioURL = URL.createObjectURL(file); // Create object URL for the audio file
            setAudio(audioURL); // Update the audio URL state
        }
    };

    const handleGenre = (event) => {
        const genre = event.target.value;
        if (genre) {
            setGenre(genre);
        }
    }

    const validateForm = () => {
        if (!(audio !== null && fileName !== "No selected file" && genre !== null)) {
            return false;
        }
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            let formData = new FormData();
            formData.append('audio', audio);
            formData.append('filename', fileName);
            formData.append('genre', genre);

            styleTransfer(formData)
                .then((res) => {
                    console.log(res.data.styledAudio, res.data.styledImage);
                    setGenAudio(res.data.styledAudio);
                    setGenImage(res.data.styledImage);
                })
                .catch((err) => {
                    if (err.response === undefined) {
                        Swal.fire({
                            icon: 'error',
                            title: err.message,
                            confirmButtonText: 'Close',
                            confirmButtonColor: '#FF6347'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: `${err.response.status} ${err.response.data.description}`,
                            text: err.response.data.message,
                            confirmButtonText: 'Close',
                            confirmButtonColor: '#FF6347'
                        });
                    }
                })
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Please fill in all fields',
                confirmButtonText: 'Close',
                confirmButtonColor: '#FF6347'
            })
        }
    }

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
                <Row className='col-md-6' id='input'>
                    <div className='form-content' id='input'>
                        <h2>1. Upload a song (.wav file):</h2>
                        <form onClick={() => document.querySelector(".input-field").click()}>
                            <input
                                type="file"
                                accept="audio/*"
                                className='input-field'
                                hidden
                                onChange={handleFileInputChange} // Handle file input change
                            />
                            {audio ?
                                <audio controls><source src={audio} type="audio/mpeg"></source></audio>
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
                        <h2>2. Select a Genre:</h2>
                        <Button variant="primary" className={genre === 'jazz' ? 'active genre' : 'genre'} type='button' value='jazz' onClick={handleGenre}>Jazz</Button>
                        <Button variant="primary" className={genre === 'rock' ? 'active genre' : 'genre'} type='button' value='rock' onClick={handleGenre}>Rock</Button>
                        <Button variant="primary" className={genre === 'disco' ? 'active genre' : 'genre'} type='button' value='disco' onClick={handleGenre}>Disco</Button>
                        <Button variant="primary" className={genre === 'classical' ? 'active genre' : 'genre'} type='button' value='classical' onClick={handleGenre}>Classical</Button>
                        <Button variant="primary" className={genre === 'country' ? 'active genre' : 'genre'} type='button' value='country' onClick={handleGenre}>Country</Button>
                        <Button variant="primary" className={genre === 'hiphop' ? 'active genre' : 'genre'} type='button' value='hiphop' onClick={handleGenre}>Hiphop</Button>
                        <Button variant="primary" className={genre === 'metal' ? 'active genre' : 'genre'} type='button' value='metal' onClick={handleGenre}>Metal</Button>
                        <Button variant="primary" className={genre === 'pop' ? 'active genre' : 'genre'} type='button' value='pop' onClick={handleGenre}>Pop</Button>
                    </div>
                    <div id='convert'>
                        <Button variant="primary" type='submit' onClick={handleSubmit}>Convert Audio<span id='convert_icon'><FaRegArrowAltCircleRight /></span></Button>
                    </div>
                </Row>
                <Row className='col-md-6' id='generated'>
                    <div id='content_area'>
                        <h2>Output</h2>
                        {genImage && genAudio && (fileName !== 'No selected File') ?
                            <div>
                                <div id='genImg'><img src={require(`../images/${genImage}`)} alt='generated' width="500" height="500"></img></div>
                                <div id='genAudio'>
                                    <hr></hr>
                                    <h2>{fileName.replace(".wav", "")} in {genre}</h2>
                                    <audio controls><source src={require(`../videos/${genAudio}`)} type="audio/mpeg"></source></audio>
                                </div>
                            </div>
                            :
                            <div>
                                <LuListMusic id='orig_icon' />
                            </div>
                        }
                    </div>
                </Row>
            </Row>

        </section>
    );
};