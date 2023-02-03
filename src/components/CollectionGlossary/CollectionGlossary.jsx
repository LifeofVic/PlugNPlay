import * as React from 'react';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Glossary() {
	const userTags = [
		'2D',
		'2D Platformer',
		'3D',
		'4X',
		'8-Bit',
		'Action RPG',
		'Action RTS',
		'Action Roguelike',
		'Action-Adventure',
		'Agriculture',
		'Alternate History',
		'Anime',
		'Atmospheric',
		'Base Building',
		'Battle Royale',
		"Beat 'em up",
		'Blood',
		'Building',
		'Bullet Hell',
		'CRPG',
		'Card Game',
		'Cartoon',
		'Character Customization',
		'Choices Matter',
		'Choose Your Own Adventure',
		'Cinematic',
		'City Builder',
		'Clicker',
		'Co-op',
		'Co-op Campaign',
		'Colony Sim',
		'Colorful',
		'Comic Book',
		'Competitive',
		'Crafting',
		'Crime',
		'Cute',
		'Dark',
		'Dark Comedy',
		'Dating Sim',
		'Deck Building',
		'Demake',
		'Demons',
		'Difficult',
		'Drama',
		'Driving',
		'Dungeon Crawler',
		'Dungeons & Dragons',
		'Dystopian',
		'Economy',
		'Emotional',
		'Epic',
		'Erotic',
		'Exploration',
		'FPS',
		'Family Friendly',
		'Fantasy',
		'Farming',
		'Fast-Paced',
		'Feel Good',
		'Female Protagonist',
		'First-Person',
		'Fishing',
		'Flight',
		'Funny',
		'Futuristic',
		'Gambling',
		'Gardening',
		'God Game',
		'Gore',
		'Hand-drawn',
		'Historical',
		'Horror',
		'Hunting',
		'Immersive Sim',
		'Isometric',
		'JRPG',
		'Job Simulator',
		'LGBT',
		'LGBTQ+',
		'Linear',
		'Local Co-Op',
		'Local Multiplayer',
		'Local PvP',
		'Logic',
		'Loot',
		'Lore-Rich',
		'Lovecraftian',
		'Low-poly',
		'MMORPG',
		'MOBA',
		'Magic',
		'Management',
		'Manga',
		'Martial Arts',
		'Mature',
		'Meaningful Choices',
		'Metroidvania',
		'Military',
		'Modern',
		'Monsters',
		'Mountains',
		'Multiplayer',
		'Multiple Endings',
		'Music',
		'Mystery',
		'NSFW',
		'Narration',
		'Narrative',
		'Noir',
		'Non violent',
		'Nonlinear',
		'Nudity',
		'Old School',
		'Online Co-Op',
		'Online PvP',
		'Online multiplayer',
		'Open World',
		'Parody',
		'Partial Controller Support',
		'Party Game',
		'Party-Based RPG',
		'Perma Death',
		'Photorealistic',
		'Pixel Graphics',
		'Point & Click',
		'Political',
		'Politics',
		'Post-apocalyptic',
		'Precision Platformer',
		'Procedural Generation',
		'Psychological',
		'Puzzle Platformer',
		'PvE',
		'PvP',
		'Quick-Time Events',
		'RPG',
		'RTS',
		'Real Time Tactics',
		'Realistic',
		'Relaxing',
		'Resource Management',
		'Retro',
		'Rhythm',
		'Roguelike',
		'Roguelite',
		'Roguevania',
		'Role Playing Game',
		'Sandbox',
		'Satire',
		'Sci-fi',
		'Score Attack',
		'Sexual Content',
		'Shared/Split Screen Co-op',
		'Shared/Split Screen PvP',
		"Shoot 'Em Up",
		'Short',
		'Side Scroller',
		'Side-Scrolling',
		'Silent Protagonist',
		'Single-player',
		'Singleplayer',
		'Solo',
		'Solo RPG',
		'Souls-like',
		'Space',
		'Space Sim',
		'Spectacle fighter',
		'Split Screen',
		'Spooky',
		'Stealth',
		'Story',
		'Story Rich',
		'Stylized',
		'Superhero',
		'Supernatural',
		'Superpowers',
		'Survival',
		'Survival Horror',
		'Tactical',
		'Tactical RPG',
		'Third Person',
		'Third-Person Shooter',
		'Time Management',
		'Time Manipulation',
		'Time Travel',
		'Top-Down',
		'Tower Defense',
		'Turn-Based',
		'Twin Stick Shooter',
		'Two Players',
		'Two-player',
		'Unforgiving',
		'Vampire',
		'Violent',
		'Visual Novel',
		'Walking Simulator',
		'Zombies',
	];

	return (
		<Paper>
			<Box>
				<Autocomplete
					options={userTags}
					renderInput={params => <TextField {...params} label='Search Tags' />}
					sx={{
						MuiSvgIcon: {
							styleOverrides: {
								root: {
									color: '#C02222',
								},
							},
						},
					}}
				/>
			</Box>
		</Paper>
	);
}
