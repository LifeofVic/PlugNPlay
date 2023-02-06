import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';

function AdminPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'GLOSSARY/FETCH' });
	}, []);

	const user = useSelector(store => store.user);
	const glossary = useSelector(store => store.glossary.glossary);
	const glossaryTerm = useSelector(store => store.glossary.glossaryItem);

	const [toggleAdd, setAddBoolean] = useState(false);
	const [toggleEdit, setEditBoolean] = useState(false);
	const [toggleView, setViewBoolean] = useState(false);
	const [toggleDelete, setDeleteBoolean] = useState(false);

	const handleChange = (event, value) => {
		console.log('Value is: ', value);
		dispatch({
			type: 'GLOSSARY/SET_ITEM',
			payload: value, //This is the term that is was clicked on from the drop down menu.
		});
	};

	const handleAdd = () => {
		console.log('Clicked on the Add Term Button');
		setAddBoolean(true);
		setEditBoolean(false);
		setViewBoolean(false);
		setDeleteBoolean(false);
	};

	const handleEdit = () => {
		console.log('Clicked on the Edit Button');
		setAddBoolean(false);
		setEditBoolean(true);
		setViewBoolean(false);
		setDeleteBoolean(false);
	};

	const handleView = () => {
		console.log('Clicked on the View Button');
		setAddBoolean(false);
		setEditBoolean(false);
		setViewBoolean(true);
		setDeleteBoolean(false);
	};

	const handleDelete = () => {
		console.log('Clicked on the Delete Button');
		setAddBoolean(false);
		setEditBoolean(false);
		setViewBoolean(false);
		setDeleteBoolean(true);
	};

	if (
		toggleAdd == true
		//&&
		// toggleEdit == false &&
		// toggleView == false &&
		// toggleDelete == false
	) {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mb: 3, border: 'solid' }}>
					<Typography> Please select a term to Modify</Typography>
					<Autocomplete
						options={glossary.map(({ term }) => term)}
						freeSolo //?This will allow suggestions based on input value.
						renderInput={params => (
							<TextField {...params} label='Search Term' />
						)}
						onInputChange={handleChange}
					/>
					<ButtonGroup sx={{ m: 2 }}>
						<Button variant='outlined' onClick={handleEdit}>
							Edit
						</Button>
						<Button variant='outlined' onClick={handleView}>
							View
						</Button>
						<Button variant='outlined' onClick={handleDelete}>
							Delete
						</Button>
					</ButtonGroup>
				</Card>

				<Grid>
					<Button variant='outlined' onClick={handleAdd}>
						Add Term
					</Button>
				</Grid>

				<Box>
					<FormControl>
						<TextField label='name'> Term Name: </TextField>
						<TextField label='Definition'> Term Name: </TextField>
						<TextField label='Image'> Term Name: </TextField>
					</FormControl>
				</Box>
			</Box>
		);
	} else {
		return (
			<Box
				sx={{
					m: 3,
					width: 'calc(100vw- 50px)',
				}}>
				<Card sx={{ mb: 3, border: 'solid' }}>
					<Typography> Please select a term to Modify</Typography>
					<Autocomplete
						options={glossary.map(({ term }) => term)}
						freeSolo //?This will allow suggestions based on input value.
						renderInput={params => (
							<TextField {...params} label='Search Term' />
						)}
						onInputChange={handleChange}
					/>
					<ButtonGroup sx={{ m: 2 }}>
						<Button variant='outlined' onClick={handleEdit}>
							Edit
						</Button>
						<Button variant='outlined' onClick={handleView}>
							View
						</Button>
						<Button variant='outlined' onClick={handleDelete}>
							Delete
						</Button>
					</ButtonGroup>
				</Card>

				<Grid>
					<Button variant='outlined' onClick={handleAdd}>
						Add Term
					</Button>
				</Grid>
			</Box>
		);
	}
}

export default AdminPage;
