import React, { Component } from 'react';

import Swipe from 'react-easy-swipe';

import { Close, OpenInBrowser, StarBorder } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { useState } from 'react';
import SnackbarAlert from '../SnackbarAlert/SnackbarAlert';
import { useGameByID } from "../../hooks/storeHooks";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function SwipeBox(props) {
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const game = useGameByID();
  const dispatch = useDispatch();
  const history = useHistory();
  const [gameQueue, setGameQueue] = useState(0);

  // for dialog box
  const handleOpen = () => {
    setSnackOpen(false)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    dispatch({ type: "GAME/CLEAR_CURRENT" });
  }

  const handleSnackOpen = (severity, message) => {
    setSnackOpen(false)
    setSeverity(severity)
    setMessage(message)
    setSnackOpen(true)
  }

  // X and Y position variables initialized to 0.
  // Note: useStates break the swipe functionality
  let xPos = 0;
  let yPos = 0;

  // String for console logging swipe direction. Not needed for app functionality
  let swipe = '';

  // SwipeContainer Class for creating the SwipeBox
  class SwipeContainer extends Component {
    // onSwipeStart function

    onSwipeStart(event) {
      console.log('Start swiping...', event);
    }

    // onSwipeMove logs the positional changes from the starting point and sets the X/Y position variables
    onSwipeMove(position, event) {
      // console.log(`Moved ${position.x} pixels horizontally`, event);
      // console.log(`Moved ${position.y} pixels vertically`, event);
      xPos = position.x;
      yPos = position.y;
    }

    // onSwipeEnd function calculates swipe direction and console logs the result
    // prop functions being passed into SwipeBox will be called at the appropriate points here
    onSwipeEnd(event) {
      console.log('End swiping...', event);
      if (xPos > 0 && yPos > 0) {
        if (xPos > yPos) {
          swipe = 'Right Swipe';
          dispatch({type:'USER/WISHLIST/ADD', payload: props.games[gameQueue].gameData.id});
          handleSnackOpen('success', `You swiped right on ${props.games[gameQueue].gameData.name}!`);
          props.games.shift();
          dispatch({ type: 'GAME/SWIPE_WISHLIST', payload: props.games });
         
        } else {
          swipe = 'Down Swipe';
        }
      } else if (xPos > 0 && yPos < 0) {
        if (xPos > yPos * -1) {
          swipe = 'Right Swipe';
          dispatch({type:'USER/WISHLIST/ADD', payload: props.games[gameQueue].gameData.id});
          handleSnackOpen('success', `You swiped right on ${props.games[gameQueue].gameData.name}!`);
          props.games.shift();
          dispatch({ type: 'GAME/SWIPE_WISHLIST', payload: props.games });
         
        } else {
          swipe = 'Up Swipe';
          dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });
          handleOpen()
        }
      } else if (xPos < 0 && yPos > 0) {
        if (xPos * -1 > yPos) {
          swipe = 'Left Swipe';
          handleSnackOpen('error', `You swiped left on ${props.games[gameQueue].gameData.name}!`);
          props.games.shift();
          dispatch({ type: 'GAME/SWIPE_SKIP', payload: props.games });
         
        } else {
          swipe = 'Down Swipe';
        }
      } else if (xPos < 0 && yPos < 0) {
        if (xPos > yPos) {
          swipe = 'Up Swipe';
          dispatch({ type: "RAWG/FETCH_CURRENT_GAME", payload: props.games[gameQueue].gameData.id });
          handleOpen()

        } else {
          swipe = 'Left Swipe';
          handleSnackOpen('error', `You swiped left on ${props.games[gameQueue].gameData.name}!`);
          props.games.shift();
          dispatch({ type: 'GAME/SWIPE_SKIP', payload: props.games });
          
        }
      } else {
        console.log("didn't make it into an if/else");
      }
      console.log('Swipe Direction:', swipe);
    }

    render() {
      // Styles the box to be rendered
      const boxStyle = {
        width: '80%',
        height: '300px',
        border: '1px solid black',
        background: '#ccc',
        padding: '20px',
        fontSize: '1em',
        margin: '20px',
        backgroundImage: `url(${props.games[gameQueue].gameData.background_image})`,
        objectFit: 'cover',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center center'
      }

      return (
        <div>
          <SnackbarAlert
            snackOpen={snackOpen}
            severity={severity}
            message={message}
            anchor={severity === 'error' ? 'left' : 'right'}
          />
          <Dialog
            open={open}
            /*TransitionComponent={Transition}*/
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            {game.name && <DialogTitle>{props.games[gameQueue]?.gameData.name}</DialogTitle>}
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {game.name && <div style={{ fontWeight: 'bold', color: `${props.games[gameQueue]?.gameScore >= 0.7 ? 'green' : (props.games[gameQueue]?.gameScore >= 0.4 ? 'darkorange' : 'red')}` }}>{Number((props.games[gameQueue]?.gameScore * 100).toFixed(1)) + '% Match'}</div>}
                {game.name ? (game.description_raw?.length > 200 ? game.description_raw?.substring(0, 199) + '...' : game.description_raw) : 'Loading...'}<br />
                {game.name && <button onClick={() => history.push(`/games/${props.games[gameQueue]?.gameData.id}`)} className='btn'>Details</button>}
                {/*
              Released on: {props.games[0]?.gameData.released}<br/>
              {game.publishers[0] && 'Published by: ' + game.publishers[0]?.name}<br />
      {game.description_raw}<br/>*/}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Swipe
            onSwipeStart={this.onSwipeStart}
            onSwipeMove={this.onSwipeMove}
            onSwipeEnd={this.onSwipeEnd}
          >
            <div draggable="true" style={boxStyle}><span style={{ backgroundColor: 'white' }}>{props.games[gameQueue].gameData.name}</span></div>
          </Swipe>

          <div className="flex-row">
            {/* left swipe to skip */}
            <IconButton
              color="primary">
              <Close />
            </IconButton>

            {/* up swipe to see more details */}
            <IconButton
              color="primary">
              <OpenInBrowser />
            </IconButton>

            {/* right swipe to wishlist */}
            <IconButton
              color="primary">
              <StarBorder />
            </IconButton>
          </div>
        </div>
      )
    }
  }

  // Return class for rendering
  return <SwipeContainer />
}
