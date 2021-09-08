import React, { useRef, useState, useEffect } from 'react'

import styles from './CustomAudio.module.scss';

interface CustomAudioProps {
	
}

function prependZero(num: number) {
	if (num.toString().length === 1) {
		return `0${num.toString()}`;
	} else return num.toString();
}

function numberToTime(num: number) {
	const minutesNumber = Math.round(num / 60);
	const secondsNumber = Math.round(num % 60);
	
	return `${minutesNumber}:${prependZero(secondsNumber)}`;
}

function CustomAudio({}: CustomAudioProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [bufferEnd, setBufferEnd] = useState(0);
	const [duration, setDuration] = useState('');

	const audioElem = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (audioElem) {
			if (audioElem.current) {
				console.log(audioElem.current.duration);
				
				setDuration(numberToTime(Math.round(audioElem.current.duration)))
			}
		}
		
	}, [audioElem])

	function playPauseHandler(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();
		
		if (audioElem) {
			if (audioElem.current) {
				if (isPlaying) {
					audioElem.current.pause();
					setIsPlaying(isPlaying => !isPlaying)
					
				} else {
					audioElem.current.play();
					setIsPlaying(isPlaying => !isPlaying)

				}
			}

		}
		
	}




	function handleTimeUpdate(e: React.SyntheticEvent<HTMLAudioElement>) {
		setCurrentTime(Math.round((e.target as HTMLAudioElement).currentTime));
		setBufferEnd(Math.round((e.target as HTMLAudioElement).buffered.end(0)));
	}



	return (
		<div className={styles.CustomAudio}>
			<div className={styles.controls}>
				<button onClick={(e) => {playPauseHandler(e)}}>{isPlaying? 'pause' : 'play'}</button>
				<div className={styles.slider}>
					<input type="range" min={0} max={duration}></input>
					<div className={styles.timings}>
						<label>{numberToTime(currentTime)}</label>
						<label>{duration}</label>
					</div>
				</div>
			</div>
			
			<audio onTimeUpdate={(e) => {handleTimeUpdate(e)}} ref={audioElem} src={'http://localhost:5454/api/stream/song/0'} controls></audio>
		</div>
	)
}

export default CustomAudio
