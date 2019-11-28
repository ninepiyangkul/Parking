import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel,Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase'


import bg from './4.jpg'
import logo from './sign.png'
import img1 from './141852.png'
const styles = theme => ({
	main: {
		backgroundImage: `url(${bg})`,
		backgroundPosition:'center',
		backgroundRepeat: 'repeat',
		backgroundSize: 'auto',
		overflow: 'hidden',
		height: '100vh',
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
	},
	paper: {
		marginTop: theme.spacing.unit * 2,
		//marginTop:'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 1,
	},
	logo: {
		backgroundImage: `url(${logo})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '450px',
		overflow: 'hidden',
		height: '150px',
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
	},
	img1: {
		backgroundImage: `url(${img1})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '650px',
		overflow: 'hidden',
		height: '200px',
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginTop:'10px',
		marginLeft:'150px'
	},

});

function SignIn(props) {
	const { classes } = props

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	if(firebase.getCurrentUsername()) {
		//  logged in
		alert('You have already login')
		props.history.replace('/buy')
		return null
	}
	return (
		<main className={classes.main}>
		<Grid Container spacing={1}>
			<Grid item xs><logo className={classes.logo}></logo></Grid>
			<Grid item xs>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={login}
						className={classes.submit}>
						Sign in
          			</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/register"
						className={classes.submit}>
						Register
          			</Button>
				</form>
			</Paper>
			</Grid>
			<Grid item xs><img1 className={classes.img1}></img1></Grid>
			
		</Grid>
		</main>
	)

	async function login() {
		try {
			await firebase.login(email, password)
			props.history.replace('/buy')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(withStyles(styles)(SignIn))