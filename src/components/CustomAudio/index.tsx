import React, { useRef, useState, useEffect } from 'react'

import styles from './CustomAudio.module.scss';

interface CustomAudioProps {
	songId: number
}

function prependZero(num: number) {
	if (num.toString().length === 1) {
		return `0${num.toString()}`;
	} else return num.toString();
}

function numberToTime(num: number) {
	const minutesNumber = Math.floor(num / 60);
	
	const secondsNumber = Math.floor(num % 60);
	console.log(secondsNumber);

	return `${minutesNumber}:${prependZero(secondsNumber)}`;
}

function CustomAudio({songId}: CustomAudioProps) {
	const [musicReady, setMusicReady] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMoving, setIsMoving] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [bufferEnd, setBufferEnd] = useState(0);
	const [duration, setDuration] = useState(0);

	const audioElem = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (audioElem && audioElem.current && audioElem.current.duration) {
			setDuration(Math.round(audioElem.current.duration))
		}
	}, [isPlaying])

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
		if (!isMoving) {
			setCurrentTime(Math.round((e.target as HTMLAudioElement).currentTime));
		}

		if (currentTime === duration - 1) {

			setCurrentTime(0);
			Math.round((e.target as HTMLAudioElement).currentTime = 0);
			(e.target as HTMLAudioElement).pause();
			setIsPlaying(false);
		}
		setBufferEnd(Math.round((e.target as HTMLAudioElement).buffered.end(0)));
	}



	return (
		<div className={styles.CustomAudio}>
				<div className={styles.controls}>
					<button onClick={(e) => {playPauseHandler(e)}}>{isPlaying? 'pause' : 'play'}</button>
						
					<div className={styles.slider}>
						<label>{numberToTime(currentTime)}</label>
						<input type="range" min={0} max={duration} onMouseDown={(e) => {setIsMoving(true)}} onMouseUp={(e) => {
							setIsMoving(false)
							if (audioElem && audioElem.current && audioElem.current.currentTime) {
								console.log(123);
								
								audioElem.current.currentTime = currentTime;
							}
						}} onInput={(e) => {setCurrentTime(Number((e.target as HTMLInputElement).value))}} value={currentTime} ></input>
						<label>{numberToTime(duration)}</label>
					</div>
					
				</div>


			<audio onTimeUpdate={(e) => {handleTimeUpdate(e)}} ref={audioElem} src={'http://localhost:5454/api/stream/song/0'} controls></audio>
		</div>

	)
}

export default CustomAudio
