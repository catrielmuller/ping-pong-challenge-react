import React, {useEffect, useState, useRef} from 'react';
import useLocalStorage from 'react-use-localstorage';
import UIFx from "uifx";
import './App.css';

import loopAudio from './assets/audio/loop.mp3';
import ballIncomingAudio from './assets/audio/ball-incoming.mp3';
import ballOutgoingAudio from './assets/audio/ball-outgoing.mp3';
import gameOverAudio from './assets/audio/game-over.mp3';

/* Fx */
const fxLoop = new UIFx(loopAudio, { volume: 0.2, loop: true });
const fxBallIncoming = new UIFx(ballIncomingAudio, { volume: 0.8 });
const fxBallOutgoing = new UIFx(ballOutgoingAudio, { volume: 0.8 });
const fxGameOverAudio = new UIFx(gameOverAudio, { volume: 0.8 });

const Config = {
  debug: false,
  returnMin: 600, // ms
  returnDiff: 200, // ms
  swingLimit: 1000, // ms
  gameOverScreenTimeout: 3000, // ms
  accelerationRequired: 10, // m/s
}

const InitialState = {
  stage: 'start',
  score: 0,
  maxScore: 0,
};

function App() {
  const [maxScore, setMaxScore] = useLocalStorage('maxScore', InitialState.maxScore);

  const [fps, setFps] = useState(0);
  const [stageState, setStageState] = useState(InitialState.stage);
  const [scoreState, setScoreState] = useState(InitialState.score);
  const [activeTouch, setActiveTouch] = useState(false);

  const stage = useRef(InitialState.stage);
  const deviceMotionLocker = useRef(false);

  const animationRef = useRef();
  const lastTimeFrameRef = useRef();

  const score = useRef(InitialState.score);
  const initGameTime = useRef();
  const initRoundTime = useRef();
  const randomReturnTime = useRef();
  const randomSwingTime = useRef();
  const swingTime = useRef();
  const ballState = useRef();

  const initApp = () => {
    fxLoop.play();
  };

  const initGame = () => {
    lastTimeFrameRef.current = undefined;

    score.current = InitialState.score;
    setScoreState(score.current);

    initGameTime.current = undefined;
    initRoundTime.current = undefined;
    randomReturnTime.current = undefined;
    randomSwingTime.current = undefined;
    swingTime.current = undefined;
    ballState.current = 0;

    fxLoop.setPlaybackRate(1);
    fxBallOutgoing.setPlaybackRate(1);
    fxBallIncoming.setPlaybackRate(1);

    stage.current = 'game';
    setStageState(stage.current);
    animationRef.current = requestAnimationFrame(loop);
  };

  const endGame = () => {
    if (score.current >= maxScore) {
      setMaxScore(score.current);
    }
    fxLoop.setPlaybackRate(1);
    stage.current = 'over';
    setStageState(stage.current);
    setTimeout(() => {
      stage.current = 'start';
      setStageState(stage.current);
    }, Config.gameOverScreenTimeout);
  };

  const hackGame = () => {
    fxLoop.setPlaybackRate(1);
    stage.current = 'hack';
    setStageState(stage.current);
    setTimeout(() => {
      stage.current = 'start';
      setStageState(stage.current);
    }, Config.gameOverScreenTimeout);
  };

  const loop = time => {
    if (lastTimeFrameRef.current === undefined) {
      initGameTime.current = time;
    } else {
      const deltaTime = time - lastTimeFrameRef.current;
      const currentFps = Math.trunc(1000 / deltaTime);
      setFps(currentFps);
    }

    if ( initRoundTime.current === undefined ) {
      initRoundTime.current = time;
      const difficulty = Math.trunc(score.current / 10) / 10;
      const difficultySpeed = 1 - difficulty;
      const audioSpeed = 1 + difficulty;

      fxBallOutgoing.setPlaybackRate(audioSpeed);
      fxBallIncoming.setPlaybackRate(audioSpeed);
      fxLoop.setPlaybackRate(audioSpeed);

      randomReturnTime.current = time + (Math.floor(Math.random() * ((Config.returnMin + Config.returnDiff) - Config.returnMin + 1)) + Config.returnMin) * difficultySpeed;
      randomSwingTime.current = randomReturnTime.current + (Config.swingLimit * difficultySpeed);
      fxBallOutgoing.play();
    }

    if ( time >= randomReturnTime.current && ballState.current === 0) {
      fxBallIncoming.play();
      ballState.current = 1;
    }

    if (ballState.current === 1) {
      if(swingTime.current !== undefined && swingTime.current >= randomReturnTime.current && swingTime.current <= randomSwingTime.current) {
        score.current += 1;
        setScoreState(score.current);
        initRoundTime.current = undefined;
        ballState.current = 0;
        swingTime.current = undefined;
      }

      if (time >= randomSwingTime.current) {
        fxGameOverAudio.play();
        return endGame();
      }
    }

    if (score.current >= 100) {
      fxGameOverAudio.play();
      return hackGame();
    }

    lastTimeFrameRef.current = time;
    animationRef.current = requestAnimationFrame(loop);
  };

  const exitGame = () => {
    cancelAnimationFrame(animationRef.current);
  };

  const onInput = () => {
    if(stage.current === 'start') {
      initGame();
    } else {
      swingTime.current = lastTimeFrameRef.current;
    }
  };

  const onTouch = () => {
    if (activeTouch) {
      onInput();
    }
  }

  const onDeviceMotion = (event) => {
    if (deviceMotionLocker.current) return;
    const {x, y, z} = event.acceleration;
    let valid = 0;
    if (Math.abs(x) >= Config.accelerationRequired) {
      valid += 1;
    }
    if (Math.abs(y) >= Config.accelerationRequired) {
      valid += 1;
    }
    if (Math.abs(z) >= Config.accelerationRequired) {
      valid += 1;
    }
    if (valid >= 2) {
      deviceMotionLocker.current = true;
      setTimeout(() => {
        deviceMotionLocker.current = false;
      }, 300);
      onInput();
    }
  };

  useEffect(() => {
    initApp();
    return exitGame();
  }, []);

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', onDeviceMotion, true);
      setActiveTouch( false);
    } else {
      setActiveTouch(true);
    }
  });

  const actionType = activeTouch ? 'Touch' : 'Swing';

  return (
      <div className="app" onClick={onTouch}>
        {stageState === 'start' && (
            <div className="stage">
              {maxScore >= 1 && (<div className="max-score">MAX SCORE: {maxScore}</div>)}
              <div className="title"><div className="big-title">Ping Pong</div>Challenge!</div>
              <div className="blink">Turn up the volume and {actionType} your phone to start</div>
            </div>
        )}
        {stageState === 'game' && (
            <div className="game">
              <div className="title">
                <div className="big-title">Score</div>
                <div className="big-title">{scoreState}</div>
              </div>
            </div>
        )}
        {stageState === 'over' && (
            <div className="game">
              <div className="title">
                <div className="title"><div className="big-title">Game Over!</div></div>
                <div className="blink">Score: {scoreState}</div>
              </div>
            </div>
        )}
        {stageState === 'hack' && (
            <div className="game">
              <div className="title">
                <div className="title"><div className="big-title">Are you a GOD?</div></div>
              </div>
            </div>
        )}
        {Config.debug && (
            <div className="debug">
              <ul>
                <li>FPS: {fps}</li>
                <li>Stage: {stageState}</li>
                <li>Score: {scoreState}</li>
              </ul>
            </div>
        )}
      </div>
  );
}

export default App;
