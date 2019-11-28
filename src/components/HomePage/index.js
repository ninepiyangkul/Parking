import React from 'react'
import { Typography, Paper, Avatar, Button ,Grid,Toolbar,AppBar,createMuiTheme,ThemeProvider,Box} from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'


import logo from './sign.png'
import img1 from './1995.jpg'


const theme = createMuiTheme({
	typography: {
		overline: {
			fontSize: 18,
		  },
		},
  });

const styles = theme => ({
	main: {

		backgroundImage: `url(${img1})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		overflow: 'hidden',
		height: '100vh',
		width: 'auto',
		display: 'block', // Fix IE 11 issue.

		//marginLeft: theme.spacing.unit * 3,
		//marginRight: theme.spacing.unit * 3,
		//[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
		//	width: 400,
		//	marginLeft: 'auto',
		//	marginRight: 'auto',
		//},
	},
	paper: {
		//marginTop: theme.spacing.unit * 8,
		//marginTop: '200px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
		
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.primary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 2,
	},

	logo: {
		backgroundImage: `url(${logo})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		marginTop:'50px',
		backgroundSize: '500px',
		overflow: 'hidden',
		height: '200px',
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
	}

})

function HomePage(props) {
	const { classes } = props

	return (
		<main className={classes.main}>

		
		<Grid Container spacing={3}>
			<Grid item xs>
				<AppBar position="fixed" style={{ backgroundColor:'primary' ,height:'50px'}} >
  					<Toolbar>
						  <ThemeProvider theme = {theme}>
    						<Typography variant="overline" color='initial' className={classes.title}>
      							Car Parking
    						</Typography>
						  </ThemeProvider>
  					</Toolbar>
					<logo className={classes.logo}></logo>
				</AppBar>
			</Grid>
			<Grid item xs>
				<container>
					<logo className={classes.logo}></logo>
				</container>
			</Grid>
			<Grid item xs><Box pt={5} /></Grid>
		</Grid>


		<Grid container direction="row">
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<VerifiedUserOutlined />
					</Avatar>
					<Typography component="h1" variant="h5">
						Hello Guest!
					</Typography>
					<Typography variant="overline" color='initial' className={classes.title}>
      							Welcome to Car Parking Reservation System
    				</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="Primary"
						component={Link}
						to="/register"
						className={classes.submit}>
						Register
          			</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="Primary"
						component={Link}
						to="/login"
						className={classes.submit}>
						Login
          			</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="Primary"
						component={Link}
						to="/dashboard"
						className={classes.submit}>
						Dashboard
          			</Button>
					  <Button
						type="submit"
						fullWidth
						variant="contained"
						color="Primary"
						component={Link}
						to="/buy"
						className={classes.submit}>
						Buy
          			</Button>
				</Paper>
			</Grid>
		</Grid>
		</main>
	)
}

export default withStyles(styles)(HomePage)